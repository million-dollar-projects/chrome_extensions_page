"use client";

import { useMemo, useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

const reasonOptions = [
  {
    value: "not_using",
    label: "I do not use it often enough",
    followUpLabel: "What were you hoping to use it for?",
    placeholder: "For example: saving ChatGPT answers to Notion, exporting research notes...",
  },
  {
    value: "missing_feature",
    label: "It is missing a feature I need",
    followUpLabel: "What feature did you need?",
    placeholder: "Describe the feature that would have made you keep the extension.",
  },
  {
    value: "does_not_work",
    label: "Something did not work correctly",
    followUpLabel: "What did not work?",
    placeholder: "Tell us what failed, where it happened, and what you expected instead.",
  },
  {
    value: "hard_to_use",
    label: "It was hard to understand or use",
    followUpLabel: "Which part was confusing?",
    placeholder: "For example: setup, Notion authorization, export options, finding the button...",
  },
  {
    value: "performance_or_privacy",
    label: "I had performance or privacy concerns",
    followUpLabel: "What concern made you uninstall?",
    placeholder: "Tell us about the performance issue or privacy concern.",
  },
  {
    value: "found_alternative",
    label: "I found another tool",
    followUpLabel: "Which tool did you switch to, and why?",
    placeholder: "Name the tool if you remember it, and what it did better.",
  },
  {
    value: "other",
    label: "Other",
    followUpLabel: "What was the reason?",
    placeholder: "Tell us the main reason in your own words.",
  },
];

interface UninstallFeedbackFormProps {
  product?: string;
  extensionId?: string;
  version?: string;
  locale?: string;
}

export function UninstallFeedbackForm({
  product,
  extensionId,
  version,
  locale,
}: UninstallFeedbackFormProps) {
  const [reason, setReason] = useState("");
  const [reasonDetail, setReasonDetail] = useState("");
  const [details, setDetails] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");

  const productName = product?.trim() || "Chrome extension";
  const selectedReason = reasonOptions.find((option) => option.value === reason);

  const contextItems = useMemo(
    () =>
      [
        version ? `Version ${version}` : "",
        locale ? `Locale ${locale}` : "",
        extensionId ? `ID ${extensionId}` : "",
      ].filter(Boolean),
    [extensionId, locale, version],
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!reason) {
      setError("Please choose a reason before submitting.");
      return;
    }

    if (!reasonDetail.trim()) {
      setError("Please answer the follow-up question before submitting.");
      return;
    }

    setState("submitting");

    try {
      const response = await fetch("/api/uninstall-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: productName,
          extensionId,
          version,
          locale,
          reason,
          reasonDetail,
          details,
          email,
          userAgent: navigator.userAgent,
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.error || "Failed to submit feedback");
      }

      setState("success");
    } catch (error) {
      console.error("Failed to submit uninstall feedback:", error);
      setState("error");
      setError("Could not submit your feedback. Please try again later.");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-sm leading-6 text-emerald-950">
        Thank you. Your feedback was submitted.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
          Uninstall feedback
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
          Help us improve {productName}
        </h1>
        <p className="mt-3 text-base leading-7 text-zinc-600">
          Please share the main reason you removed the extension.
        </p>
        {contextItems.length > 0 && (
          <p className="mt-3 text-xs leading-5 text-zinc-500">{contextItems.join(" · ")}</p>
        )}
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-zinc-900">
          Main reason <span className="text-red-500">*</span>
        </legend>
        <div className="grid gap-2">
          {reasonOptions.map((option) => {
            const isSelected = reason === option.value;

            return (
              <div
                key={option.value}
                className={`rounded-lg border bg-white transition ${
                  isSelected
                    ? "border-zinc-950 shadow-sm"
                    : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                }`}
              >
                <label className="flex cursor-pointer items-center gap-3 px-4 py-3 text-sm text-zinc-800">
                  <input
                    type="radio"
                    name="reason"
                    value={option.value}
                    checked={isSelected}
                    onChange={(event) => {
                      setReason(event.target.value);
                      setReasonDetail("");
                      setError("");
                    }}
                    className="h-4 w-4 accent-zinc-950"
                  />
                  <span>{option.label}</span>
                </label>

                {isSelected && (
                  <label className="block border-t border-zinc-100 px-4 pb-4 pt-1">
                    <span className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">
                      {option.followUpLabel}
                    </span>
                    <textarea
                      value={reasonDetail}
                      onChange={(event) => setReasonDetail(event.target.value)}
                      maxLength={1200}
                      rows={3}
                      autoFocus
                      required
                      className="mt-2 w-full rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm leading-6 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 focus:bg-white"
                      placeholder={option.placeholder}
                    />
                  </label>
                )}
              </div>
            );
          })}
        </div>
      </fieldset>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-zinc-900">Anything else? Optional</span>
        <textarea
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          maxLength={3000}
          rows={5}
          className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm leading-6 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-500"
          placeholder={
            selectedReason
              ? "Add any extra context that would help us understand your answer."
              : "Choose a reason above first, then add any extra context here."
          }
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-zinc-900">Email, optional</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          maxLength={200}
          className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-500"
          placeholder="you@example.com"
        />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full rounded-lg bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "submitting" ? "Submitting..." : "Submit feedback"}
      </button>
    </form>
  );
}
