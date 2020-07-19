import { fetchPrismicAPI } from 'api/prismic';

export const getHeroData = async previewData => {
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
                        ... on Project {
                            title
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

export const getProjectData = async previewData => {
    const data = await fetchPrismicAPI(
        `
        query {
            allProjects(sortBy:meta_firstPublicationDate_DESC) {
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
        }
        `,
        { previewData },
    );

    return data?.allProjects?.edges;
};

export const getTeamData = async previewData => {
    const data = await fetchPrismicAPI(
        `
        query {
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
                          _meta{
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

    return data?.allTeam_members?.edges;
};
