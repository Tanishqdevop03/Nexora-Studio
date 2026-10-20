# Nexora Studio — Agency Website

```
Agency/
├── Frontend/   React + Vite + Tailwind v4 + Framer Motion
└── Backend/    Node + Express + Resend (contact form → your Gmail)
```

## 1. Backend setup

```bash
cd Backend
npm install
cp .env.example .env     # then fill in the values
npm run dev              # http://localhost:5000
```

`.env` values:

| Key | What to put |
| --- | --- |
| `RESEND_API_KEY` | From https://resend.com/api-keys |
| `CONTACT_TO_EMAIL` | Your Gmail, where enquiries arrive |
| `CONTACT_FROM_EMAIL` | Keep `Nexora Studio <onboarding@resend.dev>` until you verify a domain |
| `CLIENT_URL` | Frontend URL(s), comma separated (for CORS) |
| `SEND_AUTO_REPLY` | `true` only after verifying your domain on Resend |

> **Note:** with `onboarding@resend.dev`, Resend only delivers to the email you signed up with.
> So sign up to Resend with the same Gmail you set in `CONTACT_TO_EMAIL`.
> To send from `hello@yourdomain.com` (and enable auto-replies), verify your domain in Resend → Domains.

## 2. Frontend setup

```bash
cd Frontend
npm install
npm run dev              # http://localhost:5173
```

In development, `/api` requests are proxied to `localhost:5000`, so run both servers.

## 3. Adding your content

| What | File |
| --- | --- |
| Agency name, email, phone, WhatsApp, socials, stats | `Frontend/src/config/site.js` |
| Projects (case studies) | `Frontend/src/data/projects.js` |
| Client feedback | `Frontend/src/data/testimonials.js` |
| Services & process | `Frontend/src/data/services.js` |
| Founder quote | `Frontend/src/pages/About.jsx` |

Project images go in `Frontend/public/projects/` → use `image: "/projects/my-project.jpg"`.
Client photos go in `Frontend/public/avatars/` → use `avatar: "/avatars/name.jpg"`.

## 4. Deployment

- **Backend** → Render / Railway: set the same env vars, and set `CLIENT_URL` to your live frontend URL.
- **Frontend** → Vercel / Netlify: set `VITE_API_URL` to your backend URL.
  For SPA routing, add a rewrite of all routes to `/index.html`
  (Vercel: `vercel.json` with `{"rewrites":[{"source":"/(.*)","destination":"/"}]}`).
