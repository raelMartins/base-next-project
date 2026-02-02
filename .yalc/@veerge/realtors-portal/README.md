# Realtors Portal Library (`@veerge/realtors-portal`)

A fully modular, specialized UI library for the Myxellia Realtors Portal. This package exports full-page components, authentication modules, and providers designed to be consumed by Next.js applications.

## 🚀 Getting Started

This library is designed to be installed into a Next.js host application. It relies on several **Peer Dependencies** (like Chakra UI and React Query) that must be present in your host app.

### 1. Installation

If you are installing from a private registry (once published):

```bash
npm install @veerge/realtors-portal
```

### 2. Install Peer Dependencies

Your host application **must** have these packages installed. If you are starting a fresh Next.js project, run this command to install the required stack:

```bash
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion axios @tanstack/react-query react-icons
```

> **Note:** Ensure you are using **Next.js 13+** (App Router recommended) and **React 18+**.

---

## 🛠 Local Development Workflow

We use **[yalc](https://github.com/wclr/yalc)** instead of `npm link` to avoid module resolution issues and conflicts with React Context (the "Two Reacts" problem) which are common in Windows environments.

### Prerequisites

1. Install `yalc` globally on your machine:
   ```bash
   npm install -g yalc
   ```

### Step-by-Step Guide

#### 1. In this Library Folder

Run the dev script. This watches for file changes, rebuilds, and automatically pushes updates to your local `yalc` store via the `onSuccess` hook in `tsup.config.ts`.

```bash
# Watches for changes and pushes to yalc automatically
npm run dev
```

#### 2. In Your Host Application (The Next.js App)

Link the package from the local `yalc` store.

```bash
# Add the local package
yalc add @veerge/realtors-portal

# Install dependencies (ensures everything is linked correctly)
npm install
```

#### 3. Update `next.config.mjs` (Critical)

You must tell Next.js to transpile this package, or you will see "Module not found" or "You may need an appropriate loader" errors.

**File:** `next.config.mjs`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force Next.js to compile the library code
  transpilePackages: ['@veerge/realtors-portal']
};

export default nextConfig;
```

#### 4. Font Configuration (Inter)

This library expects the host application to provide the **Inter** font via a CSS variable.

**File:** `app/layout.tsx`

```tsx
import { Inter } from 'next/font/google';

// Load the font and assign it to the variable '--font-brand'
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-brand'
});

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

_Note: this font configuration wasn't working for me, but my device and browser reads Inter innately. I'm unsure if this is the case for all browsers._

---

## 💻 Usage

You can login with the email `mistyladee00@gmail.com`

### The LibraryProvider

All components exported from this library **must** be wrapped in the `LibraryProvider`. This handles:

- Chakra UI Theme (Colors, Fonts)
- React Query Client (Isolated cache management)

### Example: Full Page Integration

Import a full page component and place it directly in your route file.

**File:** `app/transactions/page.tsx`

```tsx
'use client';

import { LibraryProvider, TransactionsPage } from '@veerge/realtors-portal';

export default function MyPage() {
  return (
    <LibraryProvider>
      <TransactionsPage
        apiKey={process.env.NEXT_PUBLIC_API_KEY}
        userName='Admin User'
      />
    </LibraryProvider>
  );
}
```

---

## 📦 Available Exports

### Pages

- `ListingsPage`
- `ReferralsPage`
- `RequestPage`
- `TransactionsPage`
- `ProfilePage`

### Authentication

- `BaseLogin`
- `AuthVerificationPage` (this should be used at the base of the realtor portl project ie `/agent`, `/realtors-portal`, or `/realtors`)

### Types

- `ListingsPageProps`
- `ReferralsPageProps`
- `TransactionPageProps`
- `ProfilePageProps`

---

## 🐛 Troubleshooting

| Error                       | Solution                                                                                        |
| :-------------------------- | :---------------------------------------------------------------------------------------------- |
| **Module not found**        | Ensure `transpilePackages` is set in `next.config.mjs`.                                         |
| **Hooks / Multiple Reacts** | Ensure you used `yalc` and not `npm link`. Clear `.next` folder and restart.                    |
| **Invalid Win32 App**       | This is a Next.js SWC error. Move the project out of **OneDrive** and reinstall `node_modules`. |
| **Font not appearing**      | Ensure the `className` for the font variable is applied to the `<html>` or `<body>` tag.        |

---

## 📜 Scripts

- `npm run dev`: Builds in watch mode and pushes changes to `yalc`.
- `npm run build`: Runs a clean production build (TS check + tsup bundle).

---

## 📜 Currently Available API Endpoints

### For Zema (Listings and Settings Page)

**Get Listings:**

```tsx
export const fetchListings = async (param: string) => {
  return await agent_auth_fetch.get(`${BaseURL}/store/agent_dashboard${param}`);
};
```

**Get Realtor Settings Info**

```tsx
export const fetchRealtorSettingsInfo = async () => {
  const storeName = store_name();

  return await agent_auth_fetch.get(
    `${BaseURL}/agents/settings/?store_name=${storeName}`
  );
};
```

**Update Realtor Settings (also used to update bank details):**

```tsx
export const updateRealtorSettings = async (body: any) => {
  //you can properly type this instead of using "any"

  const storeName = store_name();

  return await agent_auth_fetch.patch(
    `${BaseURL}/agents/settings/?store_name=${storeName}`,
    body
  );
};
```

**Get List Of Banks:**

```tsx
export const fetchBanks = async () => {
  const storeName = store_name();

  return await agent_auth_fetch.get(
    `${BaseURL}/agents/settings/?store_name=${storeName}&bank=true`
  );
};
```

### For Bruce (Single Listing Overview)

**Get Single Listing:**

```tsx
export const fetchSingleListing = async (param: string) => {
  const storeName = store_name();

  return await agent_auth_fetch.get(
    `${BaseURL}/investment/project/${param}?store_name=${storeName}`
  );
};
```

**Get Contact Persons:**

```tsx
export const getAllContactPersons = async (projectId: string) => {
  return await agent_auth_fetch.get(
    `${BaseURL}/developers/contact-persons?project=${projectId}`
  );
};
```

**Get Property Documents:**

```tsx
export const fetchPropertytDocument = async (
  id: string,
  purpose: 'brochure' | 'paymentplan' | 'outright'
) => {
  return await agent_auth_fetch.get(
    `${BaseURL}/developers/project-documents?project_id=${id}&purpose=${purpose}`
  );
};
```

**Get Listing Units/Bundles:**

```tsx
export const fetchPropertyUnits = async (projectId: string) => {
  return await agent_auth_fetch.get(
    `${BaseURL}/investment/project-bundles/?project_id=${parseInt(projectId)}`
  );
};
```

**Get Payment Plan For Unit/Bundle:**

```tsx
export const fetchPaymentPlansForUnit = async (bundleId: string) => {
  return await agent_auth_fetch.get(
    `${BaseURL}/investment/bundle-paymentplans/?bundle_id=${bundleId}`
  );
};
```

_Note: All the endpoints above have been added into the code base. They are just provided here again for clarity sake._
