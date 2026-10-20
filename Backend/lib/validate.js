const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clean = (value, max) =>
  typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, max) : "";

export function validateContact(body = {}) {
  const data = {
    name: clean(body.name, 100),
    email: clean(body.email, 150).toLowerCase(),
    company: clean(body.company, 120),
    service: clean(body.service, 80),
    budget: clean(body.budget, 50),
    // keep line breaks in the message
    message: typeof body.message === "string" ? body.message.trim().slice(0, 5000) : "",
  };

  const errors = {};
  if (data.name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(data.email)) errors.email = "Please enter a valid email.";
  if (data.message.length < 10) errors.message = "Tell us a bit more (at least 10 characters).";

  return Object.keys(errors).length ? { data, errors } : { data, errors: null };
}
