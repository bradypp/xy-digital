import Head from 'next/head';

import { getHeroData } from 'api/queries/home';
import { Layout, Hero } from 'components';

export async function getStaticProps({ preview = false, previewData }) {
    const heroData = await getHeroData(previewData);
    return {
        props: { preview, heroData },
    };
}

const Home = ({ heroData }) => {
    console.log(heroData[0].node);
    return (
        <Layout>
            <Head>
                <title>Digital Agency</title>
            </Head>
            <Hero />
        </Layout>
    );
};

export default Home;
