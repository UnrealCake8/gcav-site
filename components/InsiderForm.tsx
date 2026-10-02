"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export function InsiderForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!agreed || status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setMessage("");

    const payload = {
      email: String(data.get("email") || ""),
      name: String(data.get("name") || ""),
      discord: String(data.get("discord") || ""),
      roblox: String(data.get("roblox") || ""),
      device: String(data.get("device") || ""),
      projects: data.getAll("projects").map(String),
      confidentiality: data.get("confidentiality") === "on",
    };

    try {
      const response = await fetch("/api/insider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result?.error || "Unable to submit right now.");
      }

      setStatus("success");
      setMessage("Application received. Check your inbox for your Insider welcome email.");
      form.reset();
      setAgreed(false);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Unable to submit right now."
      );
    }
  }

  return (
    <div className="insider-panel">
      <form className="insider-form" onSubmit={submit}>
        <Field label="01 · Email">
          <input name="email" type="email" placeholder="you@example.com" required autoComplete="email" />
        </Field>

        <Field label="02 · Name">
          <input name="name" type="text" placeholder="Your name" required autoComplete="name" />
        </Field>

        <Field label="03 · Discord Username">
          <input name="discord" type="text" placeholder="username or username#0000" />
        </Field>

        <Field label="04 · Roblox Username">
          <input name="roblox" type="text" placeholder="Your Roblox username" />
        </Field>

        <Field label="05 · What device do you use?">
          <div className="insider-options">
            {["PC / Mac", "Mobile (iOS / Android)", "Console (Xbox / PlayStation)"].map((value) => (
              <label className="insider-choice" key={value}>
                <input type="radio" name="device" value={value} required />
                <span>{value}</span>
              </label>
            ))}
          </div>
        </Field>

        <Field label="06 · Which project are you most excited to test out?">
          <div className="insider-options">
            {["Grand Chamak Auto V", "Aero Horizon Flight Simulator 27"].map((value) => (
              <label className="insider-choice" key={value}>
                <input type="checkbox" name="projects" value={value} />
                <span>{value}</span>
              </label>
            ))}
          </div>
        </Field>

        <Field label="07 · Confidentiality Agreement" divided>
          <label className="insider-choice insider-confidentiality">
            <input
              type="checkbox"
              name="confidentiality"
              required
              checked={agreed}
              onChange={(event) => setAgreed(event.target.checked)}
            />
            <span>
              I agree to keep all unreleased models, glitches, and sneak peeks
              <strong> confidential</strong> within the Insider community.
            </span>
          </label>
        </Field>

        <button className="insider-submit" type="submit" disabled={!agreed || status === "sending"}>
          {status === "sending" ? "Submitting…" : "Join the Insider Team →"}
        </button>

        <p className="insider-hint">
          {agreed ? "READY FOR TRANSMISSION" : "AGREE TO CONFIDENTIALITY TO ENABLE SUBMIT"}
        </p>

        {message && (
          <p className={"insider-message " + (status === "success" ? "is-success" : "is-error")} role="status">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

function Field({
  label,
  children,
  divided = false,
}: {
  label: string;
  children: React.ReactNode;
  divided?: boolean;
}) {
  return (
    <div className={"insider-field " + (divided ? "is-divided" : "")}>
      <div className="insider-label">{label}</div>
      {children}
    </div>
  );
}
