import PropTypes from 'prop-types';

import { Meta, Footer, Header, MorePosts } from 'components';

const PostLayout = ({ children, morePosts }) => (
    <>
        <Meta />
        <Header />
        <main className="container-outer">{children}</main>
        {morePosts?.length > 0 && <MorePosts morePosts={morePosts} />}
        <Footer />
    </>
);

PostLayout.propTypes = {
    children: PropTypes.node.isRequired,
    morePosts: PropTypes.array,
};

PostLayout.defaultProps = {
    morePosts: undefined,
};

export default PostLayout;
