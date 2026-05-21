"use client";

import { useState } from "react";
import { submitContactUs } from "@/app/(site)/components/shared/auth-client";

const inputClass =
  "w-full border-0 border-b border-[#d0d0d0] bg-transparent pb-2 pt-1 font-ui text-[15px] text-[#1b2f4b] outline-none transition-colors placeholder:text-transparent focus:border-[#1368b9]";

const labelClass = "block font-ui text-[14px] font-medium text-[#1b2f4b]";

const formValue = (value: FormDataEntryValue | null) =>
  typeof value === "string" ? value.trim() : "";

export function ContactUsForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await submitContactUs({
        firstName: formValue(data.get("firstName")),
        lastName: formValue(data.get("lastName")),
        email: formValue(data.get("email")),
        message: formValue(data.get("message")),
      });
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="mt-16 rounded-[16px] border border-[#d6edda] bg-[#f0faf2] px-8 py-12 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#28a745] text-sm font-bold text-white">
          OK
        </div>
        <h2 className="mt-5 font-display text-[24px] font-bold text-[#1b2f4b]">
          Message sent!
        </h2>
        <p className="mt-2 font-ui text-[16px] text-[#41546e]">
          Thank you for reaching out. We&apos;ll get back to you as soon as
          possible.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 font-ui text-[14px] font-semibold text-[#1368b9] underline underline-offset-2 hover:text-[#3d8fd9]"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(event);
      }}
      noValidate
      className="mt-12"
    >
      <p className="font-ui text-[14px] text-[#6b7c93]">
        Please fill out the information below and we will contact you as soon as
        possible
      </p>

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <div>
          <label className={labelClass}>
            First name: <span className="text-[#e53935]">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            required
            autoComplete="given-name"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            Last name: <span className="text-[#e53935]">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            required
            autoComplete="family-name"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-8">
        <label className={labelClass}>
          Work Email: <span className="text-[#e53935]">*</span>
        </label>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className={inputClass}
        />
      </div>

      <div className="mt-8">
        <label className={labelClass}>
          How can we help? <span className="text-[#e53935]">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-2 w-full resize-none rounded-[4px] border border-[#d0d0d0] bg-transparent px-3 py-3 font-ui text-[15px] text-[#1b2f4b] outline-none transition-colors focus:border-[#1368b9] focus:ring-1 focus:ring-[#1368b9]/30"
        />
      </div>

      {error && (
        <p className="mt-4 font-ui text-[14px] text-[#e53935]">{error}</p>
      )}

      <div className="mt-8">
        <button
          type="submit"
          disabled={loading}
          className="min-w-[140px] rounded-[4px] border-2 border-[#1b2f4b] bg-white px-8 py-3 font-ui text-[15px] font-semibold text-[#1b2f4b] transition-colors hover:bg-[#1b2f4b] hover:text-white disabled:opacity-60"
        >
          {loading ? "Sending..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
