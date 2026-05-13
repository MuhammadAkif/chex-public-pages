import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import * as types from "../utils/constants";

const BRIDGE_ORIGIN =
  process.env.REACT_APP_AUTH_BRIDGE_ORIGIN || "https://chex.ai";
const BRIDGE_URL = `${BRIDGE_ORIGIN}/auth-bridge.html`;
const LOAD_TIMEOUT_MS = 5000;
const SESSION_FLAG = "chex:authBridgeAttempted";

const SHARED_KEYS = [
  "jwt",
  "token",
  "currentUser_email",
  "currentUser_id",
  "currentUser_name",
  "currentUser",
  "recommendScreen",
  "doAndDont",
  "vehicleData",
];

function safeParse(raw) {
  if (raw == null) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function readTokenFromStorage() {
  try {
    return (
      window.localStorage.getItem("token") ||
      window.localStorage.getItem("jwt") ||
      null
    );
  } catch (e) {
    return null;
  }
}

function readFlag(key) {
  try {
    return window.sessionStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function writeFlag(key, value) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch (e) {
    // ignore
  }
}

function persistSharedStorage(storage) {
  if (!storage || typeof storage !== "object") return;
  for (const key of SHARED_KEYS) {
    const value = storage[key];
    try {
      if (typeof value === "string") {
        window.localStorage.setItem(key, value);
      } else if (value === null) {
        window.localStorage.removeItem(key);
      }
    } catch (e) {
      // storage may be unavailable (private mode, quota, etc.) — skip
    }
  }
}

export function useAuthToken() {
  const dispatch = useDispatch();

  const shouldSkipBridge = useRef(
    !!readTokenFromStorage() || readFlag(SESSION_FLAG) === "1"
  ).current;

  const [token, setToken] = useState(readTokenFromStorage);
  const [ready, setReady] = useState(shouldSkipBridge);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (shouldSkipBridge) return undefined;

    let settled = false;
    let timeoutId = null;

    const iframe = document.createElement("iframe");
    iframe.src = BRIDGE_URL;
    iframe.setAttribute("aria-hidden", "true");
    iframe.setAttribute("title", "auth-bridge");
    iframe.style.position = "absolute";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    iframe.style.opacity = "0";
    iframe.style.pointerEvents = "none";

    const cleanup = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      window.removeEventListener("message", onMessage);
      if (iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
    };

    const settle = (apply) => {
      if (settled) return;
      settled = true;
      writeFlag(SESSION_FLAG, "1");
      apply();
      cleanup();
    };

    const onMessage = (event) => {
      if (event.origin !== BRIDGE_ORIGIN) return;
      const data = event.data;
      if (!data || typeof data !== "object") return;
      if (data.type !== "TOKEN_RESPONSE") return;

      settle(() => {
        persistSharedStorage(data.storage);

        const newToken =
          typeof data.token === "string" && data.token.length > 0
            ? data.token
            : readTokenFromStorage();

        const currentUser = safeParse(localStorage.getItem("currentUser"));
        const vehicleData = safeParse(localStorage.getItem("vehicleData"));

        if (currentUser) {
          dispatch({ type: types.SET_CURRENT_USER, currentUser });
          dispatch({
            type: types.SET_ISAUTHENTICATED,
            isAuthenticated: true,
          });
        }
        if (vehicleData) {
          dispatch({ type: types.SET_VEHCILE_DATA, vehicleData });
        }

        setToken(newToken);
        setError(null);
        setReady(true);
      });
    };

    const onLoad = () => {
      try {
        iframe.contentWindow &&
          iframe.contentWindow.postMessage(
            { type: "GET_TOKEN" },
            BRIDGE_ORIGIN
          );
      } catch (e) {
        settle(() => {
          setError(
            e instanceof Error
              ? e
              : new Error("Failed to message auth bridge")
          );
          setReady(true);
        });
      }
    };

    window.addEventListener("message", onMessage);
    iframe.addEventListener("load", onLoad);
    document.body.appendChild(iframe);

    timeoutId = setTimeout(() => {
      settle(() => {
        setError(new Error("Auth bridge timed out"));
        setReady(true);
      });
    }, LOAD_TIMEOUT_MS);

    return cleanup;
  }, [shouldSkipBridge, dispatch]);

  return { token, ready, loading: !ready, error };
}

export default useAuthToken;
