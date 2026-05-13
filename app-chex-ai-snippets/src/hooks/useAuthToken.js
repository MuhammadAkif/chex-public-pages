import { useEffect, useState } from 'react';

const BRIDGE_ORIGIN = 'https://chex.ai';
const BRIDGE_URL = `${BRIDGE_ORIGIN}/auth-bridge.html`;
const LOAD_TIMEOUT_MS = 5000;

const SHARED_KEYS = [
  'jwt',
  'token',
  'currentUser_email',
  'currentUser_id',
  'currentUser_name',
  'currentUser',
  'recommendScreen',
  'doAndDont',
  'vehicleData',
];

function persistSharedStorage(storage) {
  if (!storage || typeof storage !== 'object') return;
  for (const key of SHARED_KEYS) {
    const value = storage[key];
    try {
      if (typeof value === 'string') {
        window.localStorage.setItem(key, value);
      } else if (value === null) {
        window.localStorage.removeItem(key);
      }
    } catch (e) {
      // storage may be unavailable (private mode, quota, etc.) — skip this key
    }
  }
}

export function useAuthToken() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let settled = false;
    let timeoutId = null;

    const iframe = document.createElement('iframe');
    iframe.src = BRIDGE_URL;
    iframe.setAttribute('aria-hidden', 'true');
    iframe.setAttribute('title', 'auth-bridge');
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.opacity = '0';
    iframe.style.pointerEvents = 'none';

    const cleanup = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      window.removeEventListener('message', onMessage);
      if (iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
    };

    const settle = (next) => {
      if (settled) return;
      settled = true;
      next();
      cleanup();
    };

    const onMessage = (event) => {
      if (event.origin !== BRIDGE_ORIGIN) return;
      const data = event.data;
      if (!data || typeof data !== 'object') return;
      if (data.type !== 'TOKEN_RESPONSE') return;

      const received = typeof data.token === 'string' && data.token.length > 0
        ? data.token
        : null;

      settle(() => {
        persistSharedStorage(data.storage);
        setToken(received);
        setError(null);
        setLoading(false);
      });
    };

    const onLoad = () => {
      try {
        iframe.contentWindow?.postMessage({ type: 'GET_TOKEN' }, BRIDGE_ORIGIN);
      } catch (e) {
        settle(() => {
          setError(e instanceof Error ? e : new Error('Failed to message auth bridge'));
          setLoading(false);
        });
      }
    };

    window.addEventListener('message', onMessage);
    iframe.addEventListener('load', onLoad);
    document.body.appendChild(iframe);

    timeoutId = setTimeout(() => {
      settle(() => {
        setToken(null);
        setError(new Error('Auth bridge timed out'));
        setLoading(false);
      });
    }, LOAD_TIMEOUT_MS);

    return cleanup;
  }, []);

  return { token, loading, error };
}

export default useAuthToken;
