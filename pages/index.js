import PropTypes from 'prop-types';
import { useViewportScroll } from 'framer-motion';
import { useRouter } from 'next/router';

import { getHomeData } from 'api/prismic/home';
import { Layout, Media } from 'components';
import { Hero, Slideshow, Projects, Team } from 'components/home';

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

    const router = useRouter();

    if (router.isFallback) return <h2>Loading...</h2>;

    return (
        <Layout>
            <Hero data={{ homeData, blogData }} scrollY={scrollY} />
            <Media minWidth="sm">
                <Slideshow data={slideshowData} scrollY={scrollY} />
            </Media>
            <Projects data={projectData} scrollY={scrollY} />
            <Team image={homeData.team_image} quote={homeData.team_quote} scrollY={scrollY} />
        </Layout>
    );
};

Home.propTypes = {
    homeData: PropTypes.object.isRequired,
    projectData: PropTypes.array.isRequired,
    blogData: PropTypes.array.isRequired,
};

export default Home;
