import Head from 'next/head';
import PropTypes from 'prop-types';
import { useViewportScroll } from 'framer-motion';

import { getHeroData, getProjectData, getTeamData } from 'api/prismic/home';
import { Layout, Hero, Slideshow, Projects, Team } from 'components';

export async function getStaticProps({ preview = false, previewData }) {
    const heroData = await getHeroData(previewData);
    const projectData = await getProjectData(previewData);
    const teamData = await getTeamData(previewData);
    return {
        props: {
            preview,
            heroData,
            projectData,
            teamData,
        },
    };
}

const Home = ({ heroData, projectData, teamData }) => {
    const { scrollY } = useViewportScroll();
    const slideshowData = projectData.filter(el => el.node.featured_image).slice(0, 8);
    return (
        <Layout>
            <Head>
                <title>Digital Agency</title>
            </Head>
            <Hero data={heroData} scrollY={scrollY} />
            {slideshowData.length > 0 && <Slideshow data={slideshowData} scrollY={scrollY} />}
            <Projects data={projectData} scrollY={scrollY} />
            <Team data={teamData} scrollY={scrollY} />
        </Layout>
    );
};

Home.propTypes = {
    heroData: PropTypes.array.isRequired,
    projectData: PropTypes.array.isRequired,
    teamData: PropTypes.array.isRequired,
};

export default Home;
