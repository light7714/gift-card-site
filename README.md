# Romantic Gift Website (Next.js 14)

A personal romantic gift web app built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## Features

- Login page at `/` with a glassmorphism card and name-based verification.
- Dark romantic red-blue/purple gradient atmosphere with global animated hearts.
- Beating heart hero icon on login page and centered romantic CTA buttons.
- Protected surprise page at `/surprise` with confetti and first-gift preview.
- Protected gifts page at `/gifts` that renders cards from `data/gifts.json`.
- Each gift card displays a gift amount (example: `₹3000`).
- `message1` is shown in a cute script romantic font (Google `Homemade Apple`), and `message2` is shown as a short usage note.
- Each gift has two image fields: `loadergiftimage` for `/surprise` and `image` for `/gifts`.
- Per-gift secure unlock flow via API route (`/api/unlock`) using server-side environment variables only.
- Session protection using middleware and an HTTP-only cookie.
- Additional server-side route guards on protected pages (`/surprise`, `/gifts`) to prevent direct bypass.
- Session auto-expires after 10 minutes (user is logged out automatically when cookie expires).

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- canvas-confetti

## Project Structure

```
app/
  api/
    login/route.ts
    unlock/route.ts
  gifts/page.tsx
  surprise/page.tsx
  globals.css
  layout.tsx
  page.tsx
components/
  AmbientHearts.tsx
  ConfettiBurst.tsx
  GiftCard.tsx
data/
  gifts.json
lib/
  auth.ts
public/
  gifts/*.svg
middleware.ts
```

## Environment Variables

Use `.env.local` (sample included with dummy values) and replace values before running.

Required variables:

- `SITE_PASSWORD`: full name accepted in login (checked case-insensitive on server).
- `GIFT_PASSWORD`: password required to unlock gift codes.
- `SESSION_TOKEN`: secure random token stored in HTTP-only cookie.
- `GIFT_<GIFT_ID>_CODE`: 16-digit style gift code for each gift id.
- `GIFT_<GIFT_ID>_PIN`: 6-digit pin for each gift id.

Gift id mapping is generated from `data/gifts.json` IDs by uppercasing and replacing non-alphanumeric chars with `_`.

Example:

- `rose_garden` -> `GIFT_ROSE_GARDEN_CODE` and `GIFT_ROSE_GARDEN_PIN`

## Add A New Gift Card

1. Add the image file to `public/gifts/` (for example: `public/gifts/beach-date.png`).
2. Add a new object in `data/gifts.json` with:
   - `id` (unique, lowercase with `_` preferred)
   - `title`
   - `loadergiftimage` (used on `/surprise`, for example: `/gifts/beach-date-surprise.png`)
   - `image` (used on `/gifts`, for example: `/gifts/beach-date-card.png`)
   - `message1` (romantic text, shown in cute script style)
   - `message2` (short usage/help text)
   - `amount` (for example: `₹3000`)
3. Create matching env vars for that `id`:
   - `GIFT_<ID_TRANSFORMED>_CODE`
   - `GIFT_<ID_TRANSFORMED>_PIN`
4. `ID_TRANSFORMED` rule:
   - uppercase the `id`
   - replace non-alphanumeric characters with `_`
5. Example:
   - `id: "beach_date"` -> `GIFT_BEACH_DATE_CODE` and `GIFT_BEACH_DATE_PIN`
6. Local: update `.env.local`, then restart `npm run dev`.
7. Vercel: add env vars in Project Settings and redeploy.

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Deploy To Vercel

1. Import this project into Vercel.
2. In Vercel Project Settings -> Environment Variables, add:
   - `SITE_PASSWORD`
   - `GIFT_PASSWORD`
   - `SESSION_TOKEN`
   - `GIFT_ROSE_GARDEN_CODE`, `GIFT_ROSE_GARDEN_PIN`
   - `GIFT_MOONLIGHT_DATE_CODE`, `GIFT_MOONLIGHT_DATE_PIN`
   - `GIFT_PARIS_PROMISE_CODE`, `GIFT_PARIS_PROMISE_PIN`
3. Redeploy after adding/changing env vars.
4. Keep `SESSION_TOKEN` long and random.
5. In production, cookies are set with `secure: true` automatically (`NODE_ENV=production`).
6. `vercel.json` includes security headers and a CSP for production hardening.

## Security Notes

- Secrets are only read in server-side code (`app/api/*`, `middleware.ts`, `lib/auth.ts`).
- The frontend never receives env values directly.
- Middleware enforces authentication for `/surprise` and `/gifts`.

## Update Guidance

If you change routes, data shape, environment keys, or auth logic, update this README to keep it in sync.
