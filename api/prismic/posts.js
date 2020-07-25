import { fetchPrismicAPI, API_LOCALE } from 'api/prismic';

export const getAllPosts = async previewData => {
    const data = await fetchPrismicAPI(
        `
        query {
          allBlog_posts(sortBy: meta_firstPublicationDate_DESC) {
            edges {
              node {
                title
                author
                featured_image
                subtitle
                tags {
                  tag
                }
                _meta {
                  type
                  uid
                  firstPublicationDate
                }
              }
            }
          }
        }
        `,
        { previewData },
    );

    return data;
};

export const getPostData = async (slug, previewData) => {
    const data = await fetchPrismicAPI(
        `
        query PostBySlug($slug: String!, $lang: String!) {
          blog_post(uid: $slug, lang: $lang) {
            title
            author
            featured_image
            subtitle
            tags {
              tag
            }
            body {
              ... on Blog_postBodyText {
                primary {
                  text
                }
              }
              ... on Blog_postBodyBlockquote {
                primary {
                  blockquote
                }
              }
              ... on Blog_postBodyParallax_image {
                primary {
                  parallax_image
                }
              }
              __typename
            }
            _meta {
              type
              uid
              firstPublicationDate
            }
          }
        }
        `,
        {
            previewData,
            variables: {
                slug,
                lang: API_LOCALE,
            },
        },
    );

    return data;
};

export async function getAllPostsWithSlug() {
    const data = await fetchPrismicAPI(`
        {
          allBlog_posts {
            edges {
              node {
                _meta {
                  uid
                }
              }
            }
          }
        }
      `);

    return data;
}
