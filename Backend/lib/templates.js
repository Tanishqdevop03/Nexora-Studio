const escapeHtml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const row = (label, value) =>
  value
    ? `<tr>
        <td style="padding:10px 0;color:#8a8a99;font-size:13px;width:110px;vertical-align:top">${label}</td>
        <td style="padding:10px 0;color:#111;font-size:15px">${escapeHtml(value)}</td>
      </tr>`
    : "";

const shell = (content) => `
  <div style="background:#f4f4f6;padding:32px 16px;font-family:Inter,Segoe UI,Arial,sans-serif">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden">
      <div style="background:#07070a;padding:24px 28px">
        <span style="color:#fff;font-size:20px;font-weight:700;letter-spacing:-0.02em">nexora<span style="color:#c8ff3d">.</span></span>
      </div>
      <div style="padding:28px">${content}</div>
    </div>
  </div>`;

export function adminEmail(data) {
  const subject = `New enquiry from ${data.name}${data.company ? ` (${data.company})` : ""}`;

  const html = shell(`
    <h2 style="margin:0 0 4px;font-size:20px;color:#111">New project enquiry</h2>
    <p style="margin:0 0 20px;color:#8a8a99;font-size:14px">Hit reply to respond directly to ${escapeHtml(data.email)}</p>
    <table style="width:100%;border-collapse:collapse">
      ${row("Name", data.name)}
      ${row("Email", data.email)}
      ${row("Company", data.company)}
      ${row("Service", data.service)}
      ${row("Budget", data.budget)}
    </table>
    <div style="margin-top:20px;padding:16px;background:#f4f4f6;border-radius:12px;color:#111;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(data.message)}</div>
  `);

  const text = [
    "New project enquiry",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company && `Company: ${data.company}`,
    data.service && `Service: ${data.service}`,
    data.budget && `Budget: ${data.budget}`,
    "",
    data.message,
  ]
    .filter((line) => line !== undefined && line !== "")
    .join("\n");

  return { subject, html, text };
}

export function autoReplyEmail(data) {
  const subject = "We got your message — Nexora Studio";
  const html = shell(`
    <h2 style="margin:0 0 12px;font-size:20px;color:#111">Hi ${escapeHtml(data.name.split(" ")[0])},</h2>
    <p style="color:#333;font-size:15px;line-height:1.6">Thanks for reaching out. We've received your message and a member of our team will get back to you within 24 hours.</p>
    <p style="color:#333;font-size:15px;line-height:1.6">— Team Nexora</p>
  `);
  const text = `Hi ${data.name},\n\nThanks for reaching out. We've received your message and will get back to you within 24 hours.\n\n— Team Nexora`;
  return { subject, html, text };
}
