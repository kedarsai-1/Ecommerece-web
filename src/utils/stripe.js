// Utility to load Stripe.js and redirect to Checkout

export function loadStripeScript() {
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[src="https://js.stripe.com/v3"]')) {
      return resolve(true);
    }
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error('Failed to load Stripe.js'));
    document.body.appendChild(script);
  });
}

export function getStripeInstance() {
  const publicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY || '';
  if (!publicKey) {
    throw new Error('Missing VITE_STRIPE_PUBLIC_KEY. Add it to your env.');
  }
  if (!window.Stripe) {
    throw new Error('Stripe.js not loaded. Call loadStripeScript() first.');
  }
  return window.Stripe(publicKey);
}

export async function redirectToCheckout(sessionId) {
  const stripe = getStripeInstance();
  const { error } = await stripe.redirectToCheckout({ sessionId });
  if (error) {
    throw error;
  }
}