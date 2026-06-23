"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { IMaskInput } from "react-imask";

export type CreateCompanyPlan = {
  name: string;
  priceLabel: string;
  includedLabel: string;
};

type CreateCompanyModalProps = {
  plan: CreateCompanyPlan;
  /** Plan identifier sent to the billing API, e.g. "starter". */
  planKey: string;
  onClose: () => void;
  onChange?: () => void;
  /**
   * Called after the company is created successfully. When Stripe checkout is
   * required, receives the checkout URL plus the signup token (needed later to
   * fetch the receipt). Called with no argument when no payment is required.
   */
  onCreated?: (result?: { checkoutUrl: string; token?: string }) => void;
};

const inputClass =
  "h-[52px] w-full rounded-[10px] border border-[#e2e8f0] bg-[#f8fafc] px-4 font-ui text-[14px] text-[#1b2f4b] placeholder:text-[#94a3b8] outline-none transition focus:border-[#ff7a01] focus:bg-white";

// DSP backend paths (appended to NEXT_PUBLIC_DSP_BACKEND_URL).
const SIGNUP_PATH = "/api/v1/billing/signup";
const CHECKOUT_PATH = "/api/v1/billing/checkout";
const FILE_UPLOAD_PATH = "/api/v1/file/upload";

// Fixed template sent with every signup (the template picker was removed).
const TEMPLATE_ID = 1;

type SignupResponse = {
  data?: { token?: string; company?: { id?: number } };
  billing?: {
    billingMode?: string;
    planKey?: string;
    requiresCheckout?: boolean;
  };
};

type CheckoutResponse = { data?: { checkoutUrl?: string } };

/** The auth token for DSP calls, read from localStorage when available. */
function dspToken(): string | null {
  return typeof window !== "undefined" ? localStorage.getItem("token") : null;
}

const GENERIC_ERROR = "Something went wrong. Please try again.";

// Pull a human-readable message out of a failed DSP response, which returns
// `{ message: string[] | string, errors: string[] }` (e.g. "Email already
// registered."). Falls back to a generic message when nothing usable is found.
async function readErrorMessage(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as {
      message?: string | string[];
      errors?: string | string[];
    };
    const raw = data.message ?? data.errors;
    const text = Array.isArray(raw) ? raw.filter(Boolean).join(" ") : raw;
    if (text) return text;
  } catch {
    // non-JSON body — fall through to the generic message
  }
  return GENERIC_ERROR;
}

function Field({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="block font-display text-[14px] font-bold text-[#1b2f4b]">
        {label}{" "}
        {optional ? null : <span className="text-[#ff7a01]">*</span>}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export function CreateCompanyModal({
  plan,
  planKey,
  onClose,
  onChange,
  onCreated,
}: CreateCompanyModalProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  // Storage key returned by the file-upload API; sent as `url` in the payload.
  const [uploadedKey, setUploadedKey] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [domain, setDomain] = useState("");
  const [country, setCountry] = useState("");

  const [submitting, setSubmitting] = useState(false);
  // Inline submit error (e.g. "Email already registered.").
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmitError(null);

    // The UI shows a fixed ".com" suffix and a "+1" dial code.
    const fullDomain = domain
      ? domain.endsWith(".com")
        ? domain
        : `${domain}.com`
      : "";
    const digits = phone.replace(/\D/g, "");

    const body = {
      companyName,
      email,
      name: firstName,
      lastName,
      username: email,
      phone: digits ? `+1${digits}` : "",
      address: country,
      domain: fullDomain,
      url: uploadedKey ?? "",
      templateId: TEMPLATE_ID,
      billingMode: "subscription",
      planKey,
    };

    try {
      const base = process.env.NEXT_PUBLIC_DSP_BACKEND_URL ?? "";
      const res = await fetch(`${base}${SIGNUP_PATH}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        setSubmitError(await readErrorMessage(res));
        setSubmitting(false);
        return;
      }

      const signup = (await res.json()) as SignupResponse;

      // No payment needed → straight to the Thank You modal.
      if (signup.billing?.requiresCheckout !== true) {
        onCreated?.();
        return;
      }

      // Payment required → create a Stripe checkout session (authenticated with
      // the token the signup just returned) and hand its URL up to redirect.
      // The token is passed along so the receipt can be fetched after return.
      const checkoutUrl = await createCheckout(base, signup);
      if (!checkoutUrl) throw new Error("missing checkout url");
      onCreated?.({ checkoutUrl, token: signup.data?.token });
    } catch {
      setSubmitError(GENERIC_ERROR);
      setSubmitting(false);
    }
  }

  // POST /billing/checkout with the signup token; returns the Stripe URL.
  async function createCheckout(
    base: string,
    signup: SignupResponse,
  ): Promise<string | undefined> {
    const token = signup.data?.token;
    const companyId = signup.data?.company?.id;
    if (!token || companyId == null) return undefined;

    const res = await fetch(`${base}${CHECKOUT_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        companyId: String(companyId),
        billingMode: signup.billing?.billingMode ?? "subscription",
        planKey: signup.billing?.planKey ?? planKey,
      }),
    });
    if (!res.ok) throw new Error(`checkout ${res.status}`);

    const json = (await res.json()) as CheckoutResponse;
    return json.data?.checkoutUrl;
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
    void uploadImage(file);
  }

  // Two-step upload: ask the API for a presigned URL, PUT the file to it, then
  // keep the returned storage key to send as `url` in the signup payload.
  async function uploadImage(file: File) {
    const base = process.env.NEXT_PUBLIC_DSP_BACKEND_URL;
    if (!base) return;

    setUploading(true);
    setUploadedKey(null);
    try {
      const token = dspToken();
      const presignRes = await fetch(`${base}${FILE_UPLOAD_PATH}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ type: file.type }),
      });
      if (!presignRes.ok) throw new Error(`presign ${presignRes.status}`);

      const { url, key } = (await presignRes.json()) as {
        url: string;
        key: string;
      };

      const putRes = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!putRes.ok) throw new Error(`put ${putRes.status}`);

      setUploadedKey(key);
    } catch {
      setUploadedKey(null);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[#0a1f4d]/55 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-company-title"
        className="relative my-auto w-full max-w-[800px] rounded-[20px] bg-white p-6 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.5)] sm:p-10"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="create-company-title"
              className="font-display text-[26px] font-bold text-[#ff7a01]"
            >
              Create Company
            </h2>
            <p className="mt-1.5 font-ui text-[14px] text-[#64748b]">
              Set up your fleet account · {plan.name} Plan · {plan.priceLabel}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex h-9 w-9 flex-none cursor-pointer items-center justify-center rounded-full bg-[#f1f5f9] text-[#64748b] transition-colors hover:bg-[#e2e8f0]"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="mt-5 h-px w-full bg-[#e9eef5]" />

        {/* Upload */}
        <div className="mt-6 flex items-center gap-5">
          <div className="relative flex-none">
            <div className="flex h-[104px] w-[104px] items-center justify-center overflow-hidden rounded-full bg-[#eef2f7]">
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview}
                  alt="Company logo preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <svg
                  className="h-12 w-12 text-[#c2cddd]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.4 0-8 2.7-8 6v2h16v-2c0-3.3-3.6-6-8-6Z" />
                </svg>
              )}
              {uploading ? (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[#0a1f4d]/45">
                  <svg
                    className="h-7 w-7 animate-spin text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="opacity-25"
                    />
                    <path
                      d="M21 12a9 9 0 0 0-9-9"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              ) : null}
            </div>
            <button
              type="button"
              aria-label="Upload company image"
              onClick={() => fileRef.current?.click()}
              className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-white ring-4 ring-white"
              style={{ backgroundColor: "#ff7a01" }}
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2v11Z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </button>
          </div>

          <div>
            <p className="font-display text-[18px] font-bold text-[#1b2f4b]">
              Upload Company Image
            </p>
            <p className="mt-1 font-ui text-[13px] text-[#64748b]">
              PNG, JPG up to 5MB · Recommended 500×500px
            </p>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-[8px] border border-[#ff7a01] px-4 py-2 font-ui text-[14px] font-semibold text-[#ff7a01] transition-colors hover:bg-[#fff4ea]"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 16V4m0 0L8 8m4-4 4 4" />
                <path d="M4 17v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2" />
              </svg>
              Choose File
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg"
              className="hidden"
              onChange={handleFile}
            />
          </div>
        </div>

        {/* Form */}
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="First Name">
              <input
                className={inputClass}
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Field>
            <Field label="Last Name">
              <input
                className={inputClass}
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Field>

            <Field label="Company Name">
              <input
                className={inputClass}
                placeholder="Enter Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </Field>
            <Field label="Company Email">
              <div className="relative">
                <input
                  type="email"
                  className={`${inputClass} pr-11`}
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <svg
                  className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a3b8]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </div>
            </Field>

            <Field label="Phone Number" optional>
              <div className="flex h-[52px] w-full items-center rounded-[10px] border border-[#e2e8f0] bg-[#f8fafc] transition focus-within:border-[#ff7a01]">
                <span className="flex h-full items-center gap-1 whitespace-nowrap rounded-l-[10px] border-r border-[#e2e8f0] bg-white px-3 font-ui text-[13px] font-bold text-[#1b2f4b]">
                  🇺🇸 +1
                </span>
                <IMaskInput
                  mask="(000) 000-0000"
                  type="tel"
                  inputMode="tel"
                  className="h-full min-w-0 flex-1 rounded-r-[10px] bg-transparent px-3 font-ui text-[14px] text-[#1b2f4b] placeholder:text-[#94a3b8] outline-none"
                  placeholder="(555) 000-0000"
                  value={phone}
                  onAccept={(value: string) => setPhone(value)}
                />
              </div>
            </Field>
            <Field label="Domain">
              <div className="relative">
                <input
                  className={`${inputClass} pr-14`}
                  placeholder="Enter your Domain"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  required
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-ui text-[14px] text-[#94a3b8]">
                  .com
                </span>
              </div>
            </Field>

            <Field label="Country">
              <div className="relative">
                <input
                  className={`${inputClass} pr-11`}
                  placeholder="Enter Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
                <svg
                  className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94a3b8]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.6 2.7 2.6 15.3 0 18M12 3c-2.6 2.7-2.6 15.3 0 18" />
                </svg>
              </div>
            </Field>
          </div>

          {/* Plan banner */}
          <div className="mt-6 flex items-center gap-3 rounded-[12px] border border-[#ffe2c4] bg-[#fff7ed] px-4 py-3.5">
            <span
              className="flex h-7 w-7 flex-none items-center justify-center rounded-full text-white"
              style={{ backgroundColor: "#ff7a01" }}
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m5 12.5 4.5 4.5L19 7" />
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-[14px] font-bold text-[#1b2f4b]">
                You&apos;re starting with the {plan.name} Plan
              </p>
              <p className="mt-0.5 font-ui text-[12px] text-[#64748b]">
                {plan.priceLabel} · {plan.includedLabel} · Cancel anytime
              </p>
            </div>
            <button
              type="button"
              onClick={onChange ?? onClose}
              className="flex-none cursor-pointer font-ui text-[13px] font-bold text-[#ff7a01] transition-opacity hover:opacity-80"
            >
              Change →
            </button>
          </div>

          {/* Submit */}
          <div className="mt-7 text-center">
            {submitError ? (
              <p className="mb-3 font-ui text-[13px] font-semibold text-[#e5564b]">
                {submitError}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-[10px] px-14 font-ui text-[15px] font-bold text-white transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
              style={{ backgroundColor: "#ff7a01" }}
            >
              {submitting ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="opacity-25"
                    />
                    <path
                      d="M21 12a9 9 0 0 0-9-9"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                  Creating…
                </>
              ) : (
                "Create Company"
              )}
            </button>
          </div>

          {/* Trust line */}
          <p className="mt-5 text-center font-ui text-[12px] text-[#64748b]">
            <svg
              className="mr-1.5 inline h-3.5 w-3.5 align-[-2px] text-[#64748b]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="4" y="11" width="16" height="9" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
            Your data is secure and encrypted · By creating an account you agree
            to our{" "}
            <span className="font-bold text-[#ff7a01]">
              Terms of Service &amp; Privacy Policy
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
