# Realtors Portal

A standalone Next.js application for the Myxellia Realtors Portal. Built with the App Router, Chakra UI v2, TypeScript, and React Query.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SERVER_ENV` – `development` | `staging` | `production` (API base URL)
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` – For the listings map

### Run

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000). You’ll see the login page; after logging in you’re redirected to `/offerings`.

## Routes (App Router)

| Path | Description |
|------|-------------|
| `/` | Login (or magic-link verification when `?magic=...` is present) |
| `/offerings` | Listings (Our Offerings) |
| `/transactions` | Transactions |
| `/referrals` | Referrals (drawer opened from menu) |
| `/referrals/[id]` | Referral detail |
| `/request` | Requests (inspection / commission) |
| `/profile` | Profile |
| `/listing/[listing_id]` | Listing profile |
| `/unit/[unit_id]` | Unit profile |
| `/transaction-summary?id=...&user_id=...` | Referral transaction summary |

## Stack

- **Next.js 15** (App Router)
- **Chakra UI 2**
- **TypeScript**
- **React Query (TanStack Query)**
- **Framer Motion**
- **Axios**, **cookies-next**, **jose** (sessions)

## Project structure

- `src/app/` – App Router routes and root layout
- `src/components/` – Shared UI and feature components
- `src/layout/` – Navbar, footer, sidebar menu
- `src/pages/` – Page-level components (used by app routes)
- `src/api/` – API client and endpoints
- `src/providers/` – React context (e.g. StateContext)
- `src/utils/` – Formatting, theme, hooks
- `src/constants/` – Routes, config, static data

## Scripts

- `npm run dev` – Start dev server
- `npm run build` – Production build
- `npm run start` – Start production server
- `npm run lint` – Run Next.js lint

## API / Backend

The app talks to `https://${ENV}.matadortrust.com/v2` (and v1 where used). Auth uses cookie-based sessions (encrypted with jose). Set `NEXT_PUBLIC_SERVER_ENV` to match your environment.

## Previously (library mode)

This codebase was converted from a consumable library (`@veerge/realtors-portal`) to a standalone Next.js app. The previous README sections on yalc, peer dependencies, and host app setup no longer apply.
