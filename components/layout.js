import PropTypes from 'prop-types';
import cn from 'classnames';

import { Meta, Footer, Header, MorePosts } from 'components';

const Layout = ({ children, morePosts, isHeaderDown }) => {
    const className = cn('container-outer', {
        'pt-24 pb-12': isHeaderDown,
    });
    return (
        <>
            <Meta />
            <Header isAlwaysDown={isHeaderDown} />
            <main className={className}>{children}</main>
            {morePosts?.length > 0 && <MorePosts morePosts={morePosts} />}
            <Footer />
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    morePosts: PropTypes.array,
    isHeaderDown: PropTypes.bool,
};

Layout.defaultProps = {
    morePosts: undefined,
    isHeaderDown: false,
};

export default Layout;
