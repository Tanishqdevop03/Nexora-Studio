import { Router } from "express";
import rateLimit from "express-rate-limit";
import { Resend } from "resend";
import { validateContact } from "../lib/validate.js";
import { adminEmail, autoReplyEmail } from "../lib/templates.js";

const router = Router();
// Created on first use so the server can still boot without a key
let resend;
const getResend = () => (resend ??= new Resend(process.env.RESEND_API_KEY));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { ok: false, message: "Too many requests. Please try again in a few minutes." },
});

router.post("/", limiter, async (req, res, next) => {
  try {
    // Honeypot: real users never fill this hidden field, bots usually do
    if (req.body?.website) {
      return res.json({ ok: true, message: "Thanks! We'll be in touch soon." });
    }

    const { data, errors } = validateContact(req.body);
    if (errors) {
      return res.status(400).json({ ok: false, message: "Please fix the highlighted fields.", errors });
    }

    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL || "Nexora Studio <onboarding@resend.dev>";
    if (!to || !process.env.RESEND_API_KEY) {
      throw new Error("Email is not configured: set RESEND_API_KEY and CONTACT_TO_EMAIL in .env");
    }

    const admin = adminEmail(data);
    const { error } = await getResend().emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject: admin.subject,
      html: admin.html,
      text: admin.text,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(502).json({ ok: false, message: "Could not send your message. Please try again." });
    }

    // Auto-reply needs a verified domain on Resend (onboarding@resend.dev can only mail your own address)
    if (process.env.SEND_AUTO_REPLY === "true") {
      const reply = autoReplyEmail(data);
      const { error: replyError } = await getResend().emails.send({
        from,
        to: [data.email],
        subject: reply.subject,
        html: reply.html,
        text: reply.text,
      });
      if (replyError) console.error("Auto-reply failed:", replyError);
    }

    return res.json({ ok: true, message: "Thanks! We'll get back to you within 24 hours." });
  } catch (err) {
    return next(err);
  }
});

export default router;
