import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { Meta, Footer, Header, MorePosts } from 'components';

const Layout = ({ children, morePosts, isHeaderDown }) => {
    const { asPath } = useRouter();
    const locationHashArr = asPath.match(/#.+/gi);

    useEffect(() => {
        if (locationHashArr) {
            const id = locationHashArr[0].substring(1);
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView();
                el.focus();
            }
        }
    }, [locationHashArr]);

    const className = cn('container-outer', {
        'py-28 md:py-20': isHeaderDown,
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
