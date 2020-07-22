import { fetchPrismicAPI } from 'api/prismic';

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
                  body {
                    ... on Blog_postBodyText {
                      primary {
                        rich_text
                      }
                    }
                    ... on Blog_postBodyBlockquote {
                      primary {
                        text
                      }
                    }
                    ... on Blog_postBodyParallax_image {
                      primary {
                        image
                      }
                    }
                    __typename
                  }
                  _meta {
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
