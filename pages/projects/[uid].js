import PropTypes from 'prop-types';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-reactjs';

import { getProjectData, getAllProjectsSlug } from 'api/prismic/projects';
import { PostContent, Layout } from 'components';

export async function getStaticProps({ params, preview = false, previewData }) {
    const data = await getProjectData(params.uid, previewData);

    return {
        props: {
            preview,
            project: data?.project ?? null,
            moreProjects: data?.moreProjects ?? null,
        },
    };
}

export async function getStaticPaths() {
    const data = await getAllProjectsSlug();
    return {
        paths: data?.allProjects?.edges?.map(({ node }) => `/projects/${node._meta.uid}`) || [],
        fallback: true,
    };
}

// TODO: add spinner if router.isFallback is true?
const Project = ({ project, moreProjects }) => {
    const router = useRouter();

    if (router.isFallback) return <h2>Loading...</h2>;
    if (!router.isFallback && !project?._meta?.uid) {
        return <ErrorPage statusCode={404} />;
    }

    const {
        title,
        body,
        _meta: { uid, firstPublicationDate },
        featured_image,
        subtitle,
        tags,
    } = project;

    const titleText = RichText.asText(title);

    return (
        <Layout morePosts={moreProjects}>
            <Head>
                <title>{titleText}</title>
                <link rel="canonical" href={`/projects/${uid}`} />
            </Head>
            <PostContent
                titleText={titleText}
                body={body}
                firstPublicationDate={firstPublicationDate}
                featured_image={featured_image}
                subtitle={subtitle}
                tags={tags}
            />
        </Layout>
    );
};

Project.propTypes = {
    project: PropTypes.object.isRequired,
    moreProjects: PropTypes.array,
};

Project.defaultProps = {
    moreProjects: undefined,
};

export default Project;
