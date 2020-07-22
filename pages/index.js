import Head from 'next/head';
import PropTypes from 'prop-types';
import { useViewportScroll } from 'framer-motion';

import { getHomeData } from 'api/prismic/home';
import { Layout, Hero, Slideshow, Projects, Team } from 'components';

export async function getStaticProps({ preview = false, previewData }) {
    const data = await getHomeData(previewData);

    return {
        props: {
            preview,
            homeData: data?.home,
            projectData: data?.allProjects?.edges,
        },
    };
}

const Home = ({ homeData, projectData }) => {
    const slideshowData = projectData.filter(el => el.node.is_featured).slice(0, 8);
    const { scrollY } = useViewportScroll();

    return (
        <Layout>
            <Head>
                <title>Digital Agency</title>
            </Head>
            <Hero data={homeData} scrollY={scrollY} />
            {slideshowData.length > 0 && <Slideshow data={slideshowData} scrollY={scrollY} />}
            {projectData.length > 0 && <Projects data={projectData} scrollY={scrollY} />}
            <Team image={homeData.team_image} quote={homeData.team_quote} scrollY={scrollY} />
        </Layout>
    );
};

Home.propTypes = {
    homeData: PropTypes.object.isRequired,
    projectData: PropTypes.array.isRequired,
};

export default Home;
