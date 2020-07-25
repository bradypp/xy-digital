import React from 'react';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-reactjs';

import { linkResolver } from 'utils/prismic';
import { getPostData, getAllPostsWithSlug } from 'api/prismic/posts';
import { Layout } from 'components';
import { SliceZone } from 'components/slices';

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
    const data = await getAllPostsWithSlug();
    return {
        paths: data?.allBlog_posts?.edges?.map(({ node }) => `/blog/${node._meta.uid}`) || [],
        fallback: true,
    };
}

// TODO: add spinner if router.isFallback is true?
const Post = ({ blog_post }) => {
    const router = useRouter();

    if (router.isFallback) return <h2>Loading</h2>;
    if (!router.isFallback && !blog_post?._meta?.uid) {
        return <ErrorPage statusCode={404} />;
    }

    const hasTitle = RichText.asText(blog_post.title).length !== 0;
    const title = hasTitle ? RichText.asText(blog_post.title) : 'Untitled';

    return (
        <Layout>
            <Head>
                <title>{title}</title>
                {/* TODO: check */}
                <link rel="canonical" href={`/blog/${blog_post._meta.uid}`} />
            </Head>
            <div className="main">
                <div className="">
                    <h1>{title}</h1>
                </div>
                <SliceZone sliceZone={blog_post.body} />
            </div>
        </Layout>
    );
};

export default Post;
