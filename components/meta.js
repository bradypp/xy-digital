import Head from 'next/head';
import PropTypes from 'prop-types';

import {
    siteTitle,
    siteDescription,
    siteUrl,
    siteLanguage,
    siteKeywords,
    twitterHandle,
} from 'config';

const Meta = ({ title, description, keywords, ogImage, relativeUrl }) => (
    <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={description} />
        <meta itemProp="image" content={`${siteUrl}${ogImage}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:site_name" content={siteTitle} />
        <meta property="og:image" content={`${siteUrl}${ogImage}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:locale" content={siteLanguage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteUrl} />
        <meta name="twitter:site" content={twitterHandle} />
        <meta name="twitter:creator" content={twitterHandle} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
        <meta name="twitter:image:alt" content={title} />
        <link rel="canonical" href={`${siteUrl}${relativeUrl}`} />

        {/* Allows Prismic.io preview using the /api/preview endpoint */}
        <script
            async
            defer
            src="https://static.cdn.prismic.io/prismic.js?repo=digital-agency&new=true"
        />
    </Head>
);

Meta.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.string,
    ogImage: PropTypes.string,
    relativeUrl: PropTypes.string,
};
Meta.defaultProps = {
    title: siteTitle,
    description: siteDescription,
    keywords: siteKeywords,
    ogImage: '/img/og-image.png',
    relativeUrl: '/',
};

export default Meta;
