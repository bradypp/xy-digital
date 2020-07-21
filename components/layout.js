import PropTypes from 'prop-types';

import { Meta, Footer } from 'components';

const Layout = ({ children }) => (
    <>
        <Meta />
        <main className="container-outer">{children}</main>
        <Footer />
    </>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
