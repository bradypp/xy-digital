import { fetchPrismicAPI } from 'api/prismic';

export const getContactData = async previewData => {
    const data = await fetchPrismicAPI(
        `
        query {
          allContact_uss{
            edges{
              node{
                title
                text
                address
                location_coordinates
                phone
                email
                image
              }
            }
          }
        }
        `,
        { previewData },
    );

    return data;
};
