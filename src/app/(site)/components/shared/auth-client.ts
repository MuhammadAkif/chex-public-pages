"use client";

type LoginResponse = {
  data?: {
    data?: Record<string, unknown>;
    vehicleData?: unknown;
    token?: string;
    loginStatus?: boolean;
  };
};

type SignupPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const REGISTRATION_REDIRECT_URL = `${process.env.NEXT_PUBLIC_APP_SIDE_URL}/selectoption`;

function requiredApiBase() {
  if (!API_BASE) {
    throw new Error("Missing NEXT_PUBLIC_BACKEND_BASE_URL");
  }
  return API_BASE.replace(/\/+$/, "");
}

function getErrorMessage(errorBody: unknown) {
  if (
    errorBody &&
    typeof errorBody === "object" &&
    "message" in errorBody &&
    typeof (errorBody as { message?: unknown }).message === "string"
  ) {
    return (errorBody as { message: string }).message;
  }
  return "Something went wrong. Please try again.";
}

async function postJSON<T>(path: string, body: Record<string, unknown>) {
  const res = await fetch(`${requiredApiBase()}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const json = (await res.json().catch(() => ({}))) as T;
  if (!res.ok) {
    throw new Error(getErrorMessage(json));
  }
  return json;
}

export function persistAuthToken(token?: string) {
  if (typeof window === "undefined") return;

  if (token) {
    localStorage.setItem("token", token);
    document.cookie = `token=${encodeURIComponent(
      token,
    )}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
    return;
  }

  localStorage.removeItem("token");
  document.cookie = "token=; path=/; max-age=0; samesite=lax";
}

export async function loginAndPersist(email: string, password: string) {
  const resp = await postJSON<LoginResponse>("/auth/login", {
    email,
    password,
  });
  const payload = resp?.data;
  const user = payload?.data ?? {};

  const firstName = String(user.name ?? user.firstName ?? "").trim();
  const lastName = String(user.lastName ?? "").trim();
  const fullName = `${firstName} ${lastName}`.trim();

  localStorage.setItem(
    "currentUser_email",
    JSON.stringify(user.email ?? email),
  );
  localStorage.setItem("currentUser_id", JSON.stringify(user.id ?? null));
  localStorage.setItem("currentUser_name", JSON.stringify(fullName));
  localStorage.setItem("currentUser", JSON.stringify(user));
  localStorage.setItem(
    "recommendScreen",
    JSON.stringify(user.recommendation_seen ?? false),
  );
  localStorage.setItem("doAndDont", "false");
  if (payload?.vehicleData !== undefined) {
    localStorage.setItem("vehicleData", JSON.stringify(payload.vehicleData));
  }
  persistAuthToken(payload?.token);

  return payload;
}

export async function signupThenLogin(payload: SignupPayload) {
  await postJSON("/auth/signup", {
    name: payload.firstName,
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    phone: payload.phone,
    password: payload.password,
  });

  await loginAndPersist(payload.email, payload.password);
  window.location.assign(REGISTRATION_REDIRECT_URL);
}
