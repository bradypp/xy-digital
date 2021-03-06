import { fetchPrismicAPI } from 'api/prismic';

export const getHomeData = async previewData => {
    const data = await fetchPrismicAPI(
        `
        query {
            home(uid:"home",lang:"en-gb") {
              background_image
              featured_video
              about
              team_image
              team_quote
              _meta {
                type
              }
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
                  type
                }
              }
            }
          }
          allBlog_posts(sortBy: meta_firstPublicationDate_DESC, first:5) {
            edges {
              node {
                title
                featured_image
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
