import Head from 'next/head';
import { Layout, Header } from 'components';

const Home = () => {
    return (
        <Layout>
            <Head>
                <title>Digital Agency</title>
            </Head>
            <Header />
        </Layout>
    );
};

export default Home;
