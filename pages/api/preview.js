import { PrismicClient } from 'api/prismic';

import { linkResolver } from 'utils/prismic';

const preview = async (req, res) => {
    const ref = req.query.token;

    // Check the token parameter against the Prismic SDK
    const url = await PrismicClient.previewSession(ref, linkResolver, '/');

    if (!url) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    // Enable Preview Mode by setting the cookies
    res.setPreviewData({
        ref, // pass the ref to pages so that they can fetch the draft ref
    });

    // Redirect the user to the share endpoint from same origin. This is
    // necessary due to a Chrome bug:
    // https://bugs.chromium.org/p/chromium/issues/detail?id=696204
    res.write(
        `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url}" />
    <script>window.location.href = '${url}'</script>
    </head>`,
    );

    res.end();
};

export default preview;
