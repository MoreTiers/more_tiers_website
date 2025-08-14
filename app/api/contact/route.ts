import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  parentName: z.string().min(2),
  email: z.string().email(),
  studentName: z.string().min(1),
  studentYear: z.string().min(1),
  details: z.string().min(10),
  hp: z.string().optional(), // honeypot
});

function jsonError(message: string, status = 400, extra?: any) {
  if (process.env.NODE_ENV !== "production") {
    console.error("[CONTACT_ERROR]", message, extra ?? "");
  }
  return NextResponse.json({ ok: false, message, extra }, { status });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    // Honeypot
    if (typeof body?.hp === "string" && body.hp.trim()) {
      return NextResponse.json({ ok: true });
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return jsonError("Validation failed", 422, parsed.error.flatten());
    }

    const { parentName, email, studentName, studentYear, details } = parsed.data;

    const API_KEY = process.env.RESEND_API_KEY;
    const TO = process.env.CONTACT_TO;
    let FROM = process.env.CONTACT_FROM;

    if (!API_KEY) return jsonError("Missing RESEND_API_KEY in env", 500);
    if (!TO) return jsonError("Missing CONTACT_TO in env", 500);

    // If FROM isn’t configured or verified yet, fall back to Resend’s test sender
    if (!FROM || FROM.includes("@example.com")) {
      FROM = "onboarding@resend.dev";
    }

    const resend = new Resend(API_KEY);
    const subject = `More Tiers — Inquiry from ${parentName}`;
    const html = `
      <h2>New Inquiry</h2>
      <p><strong>Parent:</strong> ${parentName} (${email})</p>
      <p><strong>Student:</strong> ${studentName}</p>
      <p><strong>Year:</strong> ${studentYear}</p>
      <p><strong>Details:</strong><br/>${details.replace(/\n/g, "<br/>")}</p>
    `;

    const { data, error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      subject,
      html,
    });

    if (error) return jsonError("Resend send failed", 502, error);
    if (process.env.NODE_ENV !== "production") {
      console.log("[CONTACT_SENT]", { id: data?.id, to: TO, from: FROM });
    }
    return NextResponse.json({ ok: true, id: data?.id });
  } catch (e: any) {
    return jsonError("Unexpected server error", 500, e?.message || e);
  }
}
