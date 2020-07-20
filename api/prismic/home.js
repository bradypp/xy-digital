import { fetchPrismicAPI } from 'api/prismic';

// TODO: put all into one query
export const getHomeData = async previewData => {
    const data = await fetchPrismicAPI(
        `
        query {
          _allDocuments {
            edges {
              node {
                ... on Home {
                  background_image
                  featured_video
                  video_url
                  about
                }
              }
            }
          }
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
                }
              }
            }
          }
          allTeam_members {
            edges {
              node {
                name
                image
                role
                projects {
                  project {
                    ... on Project {
                      title
                      _meta {
                        uid
                      }
                    }
                  }
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
