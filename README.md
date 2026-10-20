# StayWise AI

StayWise AI is a hackathon-ready Next.js prototype for discovering hotels, hostels, PGs, rental rooms, and compatible roommates in unfamiliar cities.

Tagline: **New City. New Stay. Smarter Choices.**

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For a production check:

```bash
npm run build
npm run start
```

## What is implemented

- Responsive home, explore, hotel, PG/hostel, property detail, comparison, roommate, AI assistant, user dashboard, login, owner dashboard, and owner listing routes.
- Demo inventory with 20 fictional properties across Delhi, Jaipur, Mumbai, Bengaluru, and Pune.
- Search, city/type/budget/rating/amenity filters, sorting, saved stays, comparison up to three properties, inquiry flow, local review submission, and browser-persistent demo state.
- Explainable recommendation scoring based on city, stay type, budget, amenities, ratings, and study/lifestyle signals.
- Rule-based AI assistant fallback supporting English, Hindi, and Hinglish-style prompts without inventing listing facts.
- Guided judge demo for a Delhi student PG scenario and a Jaipur hotel scenario.
- Leaflet + OpenStreetMap discovery maps with listing pins and clearly labeled straight-line context.
- Adult-only roommate matching prototype with weighted compatibility, shared preferences, differences, mutual-consent request state, and privacy safeguards.
- Owner submission form with local persistence and dashboard visibility.
- Dark/light theme toggle and polished responsive UI using Tailwind and Lucide icons.

## Demo mode and integrations

This repo intentionally works without paid services or credentials. Demo listings, reviews, testimonials, and roommate profiles are fictional and labeled in the UI. No real booking is confirmed.

Production integration points:

- Supabase Auth for user/owner authentication.
- Supabase Postgres tables for properties, images, amenities, room types, availability, reviews, favorites, inquiries, roommate profiles, requests, and moderation records.
- Supabase Storage for validated property images.
- Server-side AI provider integration through environment variables only. Keep keys out of client components.
- A routing provider can replace straight-line distance labels when available.

Copy `.env.example` to `.env.local` when wiring those services.

## Key routes

`/` · `/explore` · `/hotels` · `/pg-hostels` · `/property/[id]` · `/compare` · `/roommates` · `/roommates/profile` · `/ai-assistant` · `/login` · `/dashboard` · `/owner/dashboard` · `/owner/add-property`

