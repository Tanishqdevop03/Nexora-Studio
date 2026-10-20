import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import contactRouter from "./routes/contact.js";

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// Needed for correct client IPs (rate limiting) behind Render/Railway/Vercel proxies
app.set("trust proxy", 1);

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      // Allow server-to-server / curl requests (no origin) and whitelisted frontends
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json({ limit: "20kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "nexora-backend", time: new Date().toISOString() });
});

app.use("/api/contact", contactRouter);

app.use((_req, res) => {
  res.status(404).json({ ok: false, message: "Route not found" });
});

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err);
  const status = err.message === "Not allowed by CORS" ? 403 : 500;
  res.status(status).json({ ok: false, message: status === 403 ? err.message : "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`Nexora backend running on http://localhost:${PORT}`);
  if (!process.env.RESEND_API_KEY) {
    console.warn("⚠  RESEND_API_KEY is not set — contact form emails will fail.");
  }
});
