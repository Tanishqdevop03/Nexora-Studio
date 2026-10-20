const API_URL = import.meta.env.VITE_API_URL || "";

export async function sendContact(payload) {
  let res;
  try {
    res = await fetch(`${API_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw { message: "Network error. Please check your connection and try again." };
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    throw { message: data.message || "Something went wrong. Please try again.", errors: data.errors };
  }
  return data;
}
