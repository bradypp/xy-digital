import Link from 'next/link';

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = doc => {
    if (doc.type === 'project') {
        return `/projects/${doc.uid}`;
    }
    if (doc.type === 'blog_post') {
        return `/blog/${doc.uid}`;
    }
    return `/`;
};

// Additional helper function for Next/Link components
export const hrefResolver = doc => {
    if (doc.type === 'project') {
        return `/projects/[uid]`;
    }
    if (doc.type === 'blog_post') {
        return '/blog/[uid]';
    }
    return '/';
};

// Converts Prismic Rich Text links to Next/Link components for internal links
// Pass to the  Prismic RichText component as the serializeHyperlink prop
// Also pass in the linkResolver function as the linkResolver prop
export const customLink = (type, element, content, children, index) => {
    if (element.data.link_type === 'Document') {
        return (
            <Link key={index} href={hrefResolver(element.data)} as={linkResolver(element.data)}>
                <a>{content}</a>
            </Link>
        );
    }
    return (
        <a
            href={element.data.url || null}
            rel="nofollow noreferrer
            noopener"
            target="_blank">
            {content}
        </a>
    );
};
