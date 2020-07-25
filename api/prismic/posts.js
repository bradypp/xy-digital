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

          morePosts: allBlog_posts(sortBy: meta_firstPublicationDate_DESC, first: 4) {
            edges {
              node {
                title
                featured_image
                subtitle
                tags {
                  tag
                }
                _meta {
                  type
                  uid
                }
              }
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

    data.morePosts = data.morePosts.edges.filter(({ node }) => node._meta.uid !== slug).slice(0, 3);

    return data;
};

export async function getAllPostsSlug() {
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
