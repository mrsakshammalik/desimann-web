# Production Deployment Guide: Desimann.com

This guide will walk you through the process of taking the Desimann Next.js application live on the web using GitHub, Vercel, and Neon.

---

## Step 1: Push Code to GitHub

First, you need to store this codebase in a private GitHub repository.

1. Go to [GitHub.com](https://github.com/new) and log in.
2. Click **New Repository**.
3. Name it `desimann-web`. Make sure it is set to **Private**. Do NOT initialize with a README.
4. Click **Create repository**.
5. Open your terminal in the project directory (`C:\Users\Kanak Verma\Downloads\Desimann.com`) and run the following commands (replace `YOUR_USERNAME` with your GitHub username):

\`\`\`bash
git remote add origin https://github.com/YOUR_USERNAME/desimann-web.git
git branch -M main
git push -u origin main
\`\`\`

---

## Step 2: Set up Database (Neon)

We are using Neon Serverless Postgres.

1. Go to [Neon.tech](https://neon.tech) and create an account.
2. Create a new project called `desimann-db`.
3. Go to the **Dashboard** of your project and copy the **Connection String** (it starts with `postgresql://`).
4. Save this string, you will need it for Vercel!

---

## Step 3: Deploy to Vercel

Vercel is the creator of Next.js and provides the absolute best hosting for this framework.

1. Go to [Vercel.com](https://vercel.com/new) and log in with your GitHub account.
2. Click **Add New** -> **Project**.
3. You should see the `desimann-web` repository you just created. Click **Import**.
4. In the **Environment Variables** section, you MUST add the following variables:

| Name | Value |
|------|-------|
| `DATABASE_URL` | Your Neon Connection String |
| `DIRECT_URL` | Your Neon Connection String |

*Note: If you have Clerk Authentication set up, add the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` here as well.*

5. Click **Deploy**. Vercel will now build your application!

---

## Step 4: Configure the Database

Once Vercel has deployed the app, the database will still be empty. We need to "push" the Prisma schema to Neon.

1. In your local terminal, run this command (replace `YOUR_NEON_URL` with your actual Neon connection string):
\`\`\`bash
npx prisma db push --preview-feature --schema=prisma/schema.prisma
\`\`\`
*(Alternatively, you can add your Neon URL to your local `.env` file and simply run `npx prisma db push`)*.

---

## Step 5: Connect Custom Domain

1. In the Vercel Dashboard, click on your `desimann-web` project.
2. Go to **Settings** -> **Domains**.
3. Type `desimann.com` and click **Add**.
4. Vercel will tell you exactly what DNS records to add to your domain registrar (e.g., GoDaddy, Namecheap, Route53). Usually, it's an A Record pointing to `76.76.21.21`.
5. Once you add those records to your domain provider, Vercel will automatically provision a free SSL certificate.

🎉 **Congratulations! Your site is now live.**
