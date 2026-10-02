import { NextRequest, NextResponse } from "next/server";

const SUBMISSIONS_EMAIL = "submissions@malouksgames.com";
const FROM_EMAIL =
  process.env.INSIDER_FROM_EMAIL || "Malouks Games <insider@malouksgames.com>";

function clean(value: unknown, max = 200) {
  return String(value ?? "").trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendMail(to: string, subject: string, html: string, replyTo?: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("Email service is not configured.");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [to],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!response.ok) {
    console.error("Resend delivery error", response.status, await response.text());
    throw new Error("Email delivery failed.");
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const email = clean(body.email, 254).toLowerCase();
    const name = clean(body.name, 120);
    const discord = clean(body.discord, 120);
    const roblox = clean(body.roblox, 120);
    const device = clean(body.device, 120);
    const confidentiality = body.confidentiality === true;
    const projects = Array.isArray(body.projects)
      ? body.projects.map((value: unknown) => clean(value, 120)).filter(Boolean).slice(0, 8)
      : [];

    if (!name || !email || !email.includes("@") || !device || !confidentiality) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeDiscord = escapeHtml(discord || "Not provided");
    const safeRoblox = escapeHtml(roblox || "Not provided");
    const safeDevice = escapeHtml(device);
    const safeProjects = projects.length
      ? projects.map(escapeHtml).join(", ")
      : "Not specified";

    await sendMail(
      SUBMISSIONS_EMAIL,
      `New Insider application — ${name}`,
      `
        <h2>New Malouks Games Insider application</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Discord:</strong> ${safeDiscord}</p>
        <p><strong>Roblox:</strong> ${safeRoblox}</p>
        <p><strong>Device:</strong> ${safeDevice}</p>
        <p><strong>Projects:</strong> ${safeProjects}</p>
        <p><strong>Confidentiality agreement:</strong> Accepted</p>
      `,
      email
    );

    await sendMail(
      email,
      "Welcome to the Insider Team",
      `
        <h1>Welcome to the Insider Team, ${safeName}.</h1>
        <p>Your Malouks Games Insider submission has been received successfully.</p>
        <p>You are now on the Insider list for private development updates, beta opportunities, and behind-the-scenes releases.</p>
        <p>Please remember that unreleased builds, models, screenshots, glitches, and other private material shared with Insiders must remain confidential.</p>
        <p>— Malouks Games</p>
      `
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Insider submission failed", error);
    return NextResponse.json(
      { error: "We couldn't submit your application right now. Please try again." },
      { status: 500 }
    );
  }
}
