import Head from 'next/head';
import PropTypes from 'prop-types';

import { getHeroData, getProjectData } from 'api/prismic/home';
import { Layout, Hero, Slideshow } from 'components';

export async function getStaticProps({ preview = false, previewData }) {
    const heroData = await getHeroData(previewData);
    const projectData = await getProjectData(previewData);
    return {
        props: { preview, heroData, projectData },
    };
}

const Home = ({ heroData, projectData }) => {
    const slideshowData = projectData.slice(0, 8);

    return (
        <Layout>
            <Head>
                <title>Digital Agency</title>
            </Head>
            <Hero data={heroData} />
            <Slideshow data={slideshowData} />
        </Layout>
    );
};

Home.propTypes = {
    heroData: PropTypes.array.isRequired,
    projectData: PropTypes.array.isRequired,
};

export default Home;
