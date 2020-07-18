import { PrismicClient } from 'api/prismic';

const linkResolver = doc => {
    // Pretty URLs for known types
    if (doc.type === 'project') {
        return `/projects/${doc.uid}`;
    }

    // Fallback for other types, in case new custom types get created
    return `/`;
};

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

    // TODO: Uncomment if preview doesn't work:
    // res.write(
    //     `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url}" />
    // <script>window.location.href = '${url}'</script>
    // </head>`,
    // );

    res.end();
};

export default preview;
