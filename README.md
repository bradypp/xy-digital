<h1 align="center">
  XY Digital
</h1>
<p align="center">
  A modern website built using Next.js that would be perfect for any digital agency to showcase their work and experience.
</p>
<p align="center">
  Found at <a href="https://xy-digital.vercel.app" target="_blank">xy-digital.vercel.app</a>, built with <a href="https://nextjs.org/" target="_blank">Next.js</a>, <a href="https://graphql.org/" target="_blank">GraphQL</a>, <a href="https://prismic.io/" target="_blank">Prismic.io</a>, <a href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a>, <a href="https://www.framer.com/motion/" target="_blank">Framer Motion</a> and hosted with <a href="https://vercel.com/" target="_blank">Vercel</a>.
</p>
<a href="https://xy-digital.vercel.app" target="_blank">
  <img src="https://raw.githubusercontent.com/bradypp/xy-digital/master/public/img/demo.png" alt="repo demo">
</a>

## 🛠 Try For Yourself

### Step 1. Create an account and a repository on Prismic

First, [create an account on Prismic](https://prismic.io/).

After creating an account, create a **repository** from the [dashboard](https://prismic.io/dashboard/) and assign to it a name.

### Step 2. Create Prismic custom types

Create types in your Prismic repo with api ids that match the names in the types folder.

For example, create `blog_post` in Prismic for type [`types/blog_post.json`](types/blog_post.json).

Now copy the JSON from the corresponding JSON files to the JSON editor section of your Prismic custom type editor.

### Step 3. Populate content

Go to the **Content** page, it's in the menu at the top left, then click on **Create new**.

Create a **Home** type, a **Contact** type, at least 1 **Blog Post** and at least 1 **Project**.

Fill out each field in each created type.

**Important:** For each document, remember to click **Publish** after saving. If not, the document will be in the draft state.

### Step 4. Set up environment variables

Follow the instructions [here](https://intercom.help/prismicio/en/articles/1036153-generating-an-access-token) to generate a new Prismic access token.

Follow the instructions [here](https://developers.google.com/maps/documentation/javascript/get-api-key) to generate a new Google Maps API key.

Make a SendGrid account and generate an new API key [here](https://sendgrid.com/).

Next, copy the `.env.local.example` file in this directory to `.env.local`:

```bash
cp .env.local.example .env.local
```

Then set each variable on `.env.local`:

-   `PRISMIC_API_TOKEN` should be the **Permanent access token** you just created.
-   `PRISMIC_REPOSITORY_NAME` is the name of your repository (the one in the URL).
-   `PRISMIC_REPOSITORY_LOCALE` is the locale of your repository (e.g. en-gb).
-   `NEXT_PUBLIC_SENDGRID_KEY` you're newly generated SendGrid API key
-   `NEXT_PUBLIC_SENDGRID_EMAIL` the email you want to use with SendGrid
-   `NEXT_PUBLIC_GOOGLE_MAPS_KEY` you're Google Maps API key API key

Your `.env.local` file should look like this:

```bash
PRISMIC_API_TOKEN=...
PRISMIC_REPOSITORY_NAME=...
PRISMIC_REPOSITORY_LOCALE=...
NEXT_PUBLIC_SENDGRID_KEY=...
NEXT_PUBLIC_SENDGRID_EMAIL=...
NEXT_PUBLIC_GOOGLE_MAPS_KEY=...
```

Make sure the `PRISMIC_REPOSITORY_LOCALE` matches your settings in the Prismic dashboard.

### Step 6. Install dependencies and run Next.js in development mode

```bash
npm install (or yarn)
npm run dev (or yarn dev)
```
