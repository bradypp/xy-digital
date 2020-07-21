import { fetchPrismicAPI } from 'api/prismic';

// TODO: put all into one query
export const getHomeData = async previewData => {
    const data = await fetchPrismicAPI(
        `
        query {
            home(uid:"home",lang:"en-gb") {
              background_image
              featured_video
              video_url
              about
              team_image
            }
          allProjects(sortBy: meta_firstPublicationDate_DESC) {
            edges {
              node {
                is_featured
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

    return data;
};
