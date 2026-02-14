# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Stripe Checkout Integration

To enable payments via Stripe in this app:

- Create `mainproject/.env` with your Stripe public key:
  - `VITE_STRIPE_PUBLIC_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXX`
- Restart the dev server after adding the env variable.
- Backend must expose an endpoint to create a Stripe Checkout Session.

Example Express endpoint (server-managed redirect):

```
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post('/stripe/create-checkout-session', async (req, res) => {
  const { items, customer, origin } = req.body;
  const line_items = items.map(i => ({
    price_data: {
      currency: 'inr',
      product_data: { name: i.name },
      unit_amount: Math.round(Number(i.price) * 100), // price in paise
    },
    quantity: i.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items,
    customer_email: customer?.email,
    success_url: `http://localhost:4545/stripe/success?session_id={CHECKOUT_SESSION_ID}&origin=${encodeURIComponent(origin || 'http://localhost:5173')}`,
    cancel_url: `http://localhost:4545/stripe/failure?origin=${encodeURIComponent(origin || 'http://localhost:5173')}`,
  });

  // Prefer returning full URL for direct redirect; Bag.jsx supports both
  res.json({ id: session.id, url: session.url });
});
```

- The “Proceed to Checkout” button in `src/components/Bag.jsx` calls `/stripe/create-checkout-session` and will redirect using the provided `url` or fallback to Stripe.js with `session.id`.

Backend success/failure handlers should verify the session and then redirect back to the app:
- `GET /stripe/success`: verify session (using `session_id`), persist order, then `303` redirect to `http://localhost:5173/success?session_id=...` (or `5174`).
- `GET /stripe/failure`: `303` redirect to `http://localhost:5173/failure` (or `5174`).
- Whitelist allowed origins to avoid open redirects.

Frontend routes:
- The app includes `/success` and `/failure` pages to present the outcome. On success, the bag is cleared locally.

## Cloudinary Image Upload

Frontend PNG uploads use a signed direct-upload to Cloudinary.

Frontend configuration:
- The `PngUploader` component requests a signature from `${BASE_URL}/api/cloudinary/signature?folder=ecommerce` and then POSTs to `https://api.cloudinary.com/v1_1/<cloudName>/image/upload`.
- On success, it receives `secure_url` and sets the profile `photoUrl`.

Backend setup:
- Add environment variables:
  - `CLOUDINARY_CLOUD_NAME=your_cloud_name`
  - `CLOUDINARY_API_KEY=your_api_key`
  - `CLOUDINARY_API_SECRET=your_api_secret`
- Implement signature endpoint (Express example):

```
import express from 'express';
import crypto from 'crypto';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}));

app.get('/api/cloudinary/signature', (req, res) => {
  const folder = req.query.folder || 'ecommerce';
  const timestamp = Math.floor(Date.now() / 1000);
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;
  const signature = crypto
    .createHash('sha1')
    .update(paramsToSign + apiSecret)
    .digest('hex');

  res.json({
    timestamp,
    signature,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    folder,
  });
});
```

Notes:
- Return only the minimal fields needed to upload; keep your API secret on the server.
- Ensure CORS allows your Vite origin(s) and `credentials: true` if cookies are involved.
