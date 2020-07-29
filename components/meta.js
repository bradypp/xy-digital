import Head from 'next/head';

import {
    siteTitle,
    siteDescription,
    siteUrl,
    siteLanguage,
    siteKeywords,
    twitterHandle,
} from 'config';

const Meta = () => (
    <Head>
        <html lang={siteLanguage} />
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content={siteKeywords} />
        <meta itemProp="name" content={siteTitle} />
        <meta itemProp="description" content={siteDescription} />
        <meta itemProp="image" content="public/img/og-image.png" />
        <link
            href="https://fonts.googleapis.com/css2?family=Domine:wght@400;700&family=Open+Sans:wght@400;600;700;800&family=Oswald:wght@400;700;800&display=swap"
            rel="stylesheet"
        />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:site_name" content={siteTitle} />
        <meta property="og:image" content="/img/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:locale" content={siteLanguage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteUrl} />
        <meta name="twitter:site" content={twitterHandle} />
        <meta name="twitter:creator" content={twitterHandle} />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content="/img/og-image.png" />
        <meta name="twitter:image:alt" content={siteTitle} />

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

        {/* Allows Prismic.io preview using the /api/preview endpoint */}
        <script
            async
            defer
            src="https://static.cdn.prismic.io/prismic.js?repo=digital-agency&new=true"
        />
    </Head>
);

export default Meta;
