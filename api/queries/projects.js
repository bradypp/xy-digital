import { fetchAPI } from 'api';

export const getAllProjects = async previewData => {
    const data = await fetchAPI(
        `
        query {
            allProjects {
                edges {
                    node {
                      featured_image
                      title
                      subtitle
                      tags {
                        tag
                      }
                      _meta{
                        uid
                      }
                      body {
                        ... on ProjectBodyText {
                          primary {
                            text
                          }
                        }
                        __typename
                      }
                      body {
                        ... on ProjectBodyImage {
                          label
                          primary {
                            image
                          }
                        }
                        __typename
                      }
                    }
                }
            }
        }
        `,
        { previewData },
    );

    return data?._allDocuments?.edges;
};
