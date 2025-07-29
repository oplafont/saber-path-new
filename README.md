# Jedi Path Quiz

Embark on a five‑question journey to discover your unique place in the Star Wars universe.  This application was built with Next.js 15, TypeScript and Tailwind CSS, and includes a Stripe‑powered paywall to unlock your full destiny.

## Install & Run

```sh
unzip saber-path.zip
cd saber-path
cp .env.local.example .env.local   # fill keys
npm install
npm run dev
```

## Deployment

1. **Create a new project on Vercel.** Import this repository or upload the contents of the zip.
2. **Configure environment variables** in your Vercel dashboard:
   - `OPENAI_API_KEY` – your OpenAI API key for GPT‑4.
   - `STRIPE_SECRET_KEY` – your Stripe secret key used to create checkout sessions.
   - `STRIPE_WEBHOOK_SECRET` – the signing secret for the webhook you create in Stripe.
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` – your Stripe publishable key for client‑side Stripe.js.
   - `PRICE_CENTS` – optional override for the quiz price in cents (defaults to `497`).
   - `NEXT_PUBLIC_SITE_URL` – the full URL of your deployed site (e.g. `https://your-project.vercel.app`).
3. **Set up a webhook** in your Stripe Dashboard pointing to `https://<your-domain>/api/stripe/webhook` and use the `STRIPE_WEBHOOK_SECRET` above.  This webhook will mark the user as paid.
4. **Deploy** the project.  After deployment you can share the site with users.  They can take the quiz, view a teaser of their profile and purchase the full destiny.

## Additional Notes

- Without an `OPENAI_API_KEY`, the generate endpoint falls back to a handcrafted profile so the application remains functional.
- The checkout session is created server‑side to keep your secret key safe.  Prices are read from the `PRICE_CENTS` environment variable.
- The application respects the presence of a `jediPaid` cookie or a `?paid=true` query parameter to decide whether to show the full profile.
