import Head from 'next/head';

// TODO: add more meta tags (twitter, og images etc.)
const Meta = () => (
    <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#000000" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <link
            href="https://fonts.googleapis.com/css2?family=Domine:wght@400;700&display=swap"
            rel="stylesheet"
        />
        <link
            href="https://fonts.googleapis.com/css2?family=Domine:wght@400;700&family=Oswald:wght@400;700&display=swap"
            rel="stylesheet"
        />
        <meta
            name="description"
            content="A statically generated digital agency website using Next.js, Tailwind CSS, GraphQL and Strapi.js."
        />
    </Head>
);

export default Meta;
