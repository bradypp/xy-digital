import PropTypes from 'prop-types';

import { Meta, Footer, Header } from 'components';

const Layout = ({ children }) => (
    <>
        <Meta />
        <Header />
        <main className="container-outer">{children}</main>
        <Footer />
    </>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
