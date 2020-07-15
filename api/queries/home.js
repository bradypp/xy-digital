import { fetchAPI } from 'api';

export const getHeroData = async previewData => {
    const data = await fetchAPI(
        `
        query {
            _allDocuments {
                edges {
                    node {
                        ... on Home {
                            background_image
                            featured_video
                            about
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
