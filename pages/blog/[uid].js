import PropTypes from 'prop-types';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-reactjs';
import { motion, useViewportScroll } from 'framer-motion';
import { format } from 'date-fns';

import { getPostData, getAllPostsSlug } from 'api/prismic/posts';
import { Layout, HeroImage, Nav, Tag, Logo } from 'components';
import { SliceZone } from 'components/slices';
import { useParallaxScroll } from 'hooks';

export async function getStaticProps({ params, preview = false, previewData }) {
    const data = await getPostData(params.uid, previewData);

    return {
        props: {
            preview,
            blog_post: data?.blog_post ?? null,
        },
    };
}

export async function getStaticPaths() {
    const data = await getAllPostsSlug();
    return {
        paths: data?.allBlog_posts?.edges?.map(({ node }) => `/blog/${node._meta.uid}`) || [],
        fallback: true,
    };
}

// TODO: add spinner if router.isFallback is true?
const BlogPost = ({ blog_post }) => {
    const router = useRouter();
    const { scrollY } = useViewportScroll();
    const {
        title,
        body,
        _meta: { uid, firstPublicationDate },
        featured_image,
        subtitle,
        tags,
        author,
    } = blog_post;

    const [navRef, navY] = useParallaxScroll(scrollY, 0, 1200, '0%', '-28%');
    const [leftRef, leftElY] = useParallaxScroll(scrollY, 0, 1200, '0%', '-16%');

    if (router.isFallback) return <h2>Loading</h2>;
    if (!router.isFallback && !blog_post?._meta?.uid) {
        return <ErrorPage statusCode={404} />;
    }

    const titleText = RichText.asText(title) || 'Untitled';

    return (
        <Layout>
            <Head>
                <title>{titleText}</title>
                <link rel="canonical" href={`/blog/${uid}`} />
            </Head>
            <div id="hero" className="relative h-900px -mb-32">
                <HeroImage scrollY={scrollY} src={featured_image.url} alt={featured_image.alt} />
                <div className="container-inner flex overflow-hidden">
                    <motion.div
                        className="flex flex-col relative w-2/3 z-10  pr-24"
                        initial={{
                            opacity: 0,
                            x: -50,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                type: 'tween',
                                delay: 0.4,
                                duration: 0.8,
                                ease: 'easeOut',
                            },
                        }}
                        ref={leftRef}
                        style={{ y: leftElY }}>
                        <motion.div
                            className="self-start pt-8 pb-16"
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    type: 'tween',
                                    delay: 1.2,
                                    duration: 0.6,
                                    ease: 'easeOut',
                                },
                            }}>
                            <Logo />
                        </motion.div>
                        <h1 className="title-main pb-4">{titleText}</h1>
                        <p className="text-white font-secondary text-2xl italic pb-2">{subtitle}</p>
                        <p className="text-white font-secondary pb-2">
                            By {author} on{' '}
                            <date>{format(new Date(firstPublicationDate), 'dd/MM/yyyy')}</date>
                        </p>
                        <ul className="flex justify-start items-center z-10">
                            {tags.map(el => (
                                <Tag tag={el.tag} variant="large" />
                            ))}
                        </ul>
                    </motion.div>
                    <motion.div
                        className="relative w-1/3 z-10"
                        ref={navRef}
                        initial={{ y: 0 }}
                        style={{ y: navY }}>
                        <Nav />
                    </motion.div>
                </div>
            </div>
            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                    transition: {
                        type: 'tween',
                        delay: 1,
                        duration: 0.6,
                        ease: 'easeOut',
                    },
                }}>
                <SliceZone sliceZone={body} scrollY={scrollY} />
            </motion.div>
        </Layout>
    );
};

BlogPost.propTypes = {
    blog_post: PropTypes.object.isRequired,
};

export default BlogPost;
