import Head from 'next/head';
import PropTypes from 'prop-types';
import { useViewportScroll } from 'framer-motion';

import { getHomeData } from 'api/prismic/home';
import { DefaultLayout } from 'components/layouts';
import { Hero, Slideshow, Projects, Team } from 'components/home';
import { siteTitle } from 'config';

export async function getStaticProps({ preview = false, previewData }) {
    const data = await getHomeData(previewData);

    return {
        props: {
            preview,
            homeData: data?.home,
            projectData: data?.allProjects?.edges,
            blogData: data?.allBlog_posts?.edges,
        },
    };
}

const Home = ({ homeData, projectData, blogData }) => {
    const slideshowData = projectData.filter(el => el.node.is_featured).slice(0, 8);
    const { scrollY } = useViewportScroll();

    return (
        <DefaultLayout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <Hero data={{ homeData, blogData }} scrollY={scrollY} />
            <Slideshow data={slideshowData} scrollY={scrollY} />
            <Projects data={projectData} scrollY={scrollY} />
            <Team image={homeData.team_image} quote={homeData.team_quote} scrollY={scrollY} />
        </DefaultLayout>
    );
};

Home.propTypes = {
    homeData: PropTypes.object.isRequired,
    projectData: PropTypes.array.isRequired,
    blogData: PropTypes.array.isRequired,
};

export default Home;
