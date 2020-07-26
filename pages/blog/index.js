import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { RichText } from 'prismic-reactjs';

import { Layout, FadeUp, ProjectItem } from 'components';
import { linkResolver, hrefResolver } from 'utils/prismic';
import { getAllPosts, getPostsNextPage } from 'api/prismic/posts';

export async function getStaticProps({ preview = false, previewData }) {
    const data = await getAllPosts(previewData);
    const initialPosts = data?.allBlog_posts?.edges;
    const { hasNextPage, endCursor } = data?.allBlog_posts?.pageInfo;

    // Pagination gets all posts past the 20 doc api limit
    const getMorePosts = async (isMorePosts = false, cursor = null) => {
        if (isMorePosts) {
            const data = await getPostsNextPage(cursor);
            const morePosts = data?.allBlog_posts?.edges;
            const { hasNextPage, endCursor } = data?.allBlog_posts?.pageInfo;
            return initialPosts.concat(morePosts, await getMorePosts(hasNextPage, endCursor));
        }
        return [];
    };

    const posts = hasNextPage ? await getMorePosts(hasNextPage, endCursor) : [...initialPosts];

    return {
        props: {
            preview,
            posts,
        },
    };
}

const Blog = ({ posts }) => {
    return (
        <Layout isHeaderDown>
            <div className="container-inner">
                <h1 className="title mb-8 font-tertiary uppercase text-4xl">Latest Blog Posts</h1>
                <section className="grid grid-cols-3 gap-3">
                    {posts.map((el, i) => {
                        const { title, featured_image, subtitle, tags, _meta } = el.node;
                        const titleText = RichText.asText(title);
                        return (
                            <Link
                                key={uuidv4()}
                                as={linkResolver(_meta)}
                                href={hrefResolver(_meta)}>
                                <FadeUp
                                    as="a"
                                    delay={i * 0.1}
                                    className="relative overflow-hidden min-h-84 h-84 group flex flex-col justify-start p-8 bg-grey-cool-900 clickable">
                                    <ProjectItem
                                        featured_image={featured_image}
                                        subtitle={subtitle}
                                        tags={tags}
                                        titleText={titleText}
                                    />
                                </FadeUp>
                            </Link>
                        );
                    })}
                </section>
            </div>
        </Layout>
    );
};

Blog.propTypes = {
    posts: PropTypes.array.isRequired,
};

export default Blog;
