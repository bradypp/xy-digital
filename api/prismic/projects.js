import { fetchPrismicAPI, API_LOCALE } from 'api/prismic';

export const getAllProjects = async previewData => {
    const data = await fetchPrismicAPI(
        `
        query {
          allProjects(sortBy: meta_firstPublicationDate_DESC) {
            edges {
              node {
                featured_image
                title
                subtitle
                tags {
                  tag
                }
                _meta {
                  uid
                  type
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

export const getProjectData = async (slug, previewData) => {
    const data = await fetchPrismicAPI(
        `
        query ProjectBySlug($slug: String!, $lang: String!) {
          project(uid: $slug, lang: $lang) {
            title
            featured_image
            subtitle
            tags {
              tag
            }
            body {
              ... on ProjectBodyText {
                primary {
                  text
                }
              }
              ... on ProjectBodyParallax_image {
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

          moreProjects: allProjects(sortBy: meta_firstPublicationDate_DESC, first: 4, where: {is_featured: true}) {
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

    data.moreProjects = data.moreProjects.edges
        .filter(({ node }) => node._meta.uid !== slug)
        .slice(0, 3);

    return data;
};

export async function getAllProjectsSlug() {
    const data = await fetchPrismicAPI(
        `
      {
        allProjects {
          edges {
            node {
              _meta {
                uid
              }
            }
          }
        }
      }
    `,
    );

    return data;
}
