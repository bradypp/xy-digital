import PropTypes from 'prop-types';

import { Meta, Footer, Header } from 'components';

const DefaultLayout = ({ children }) => (
    <>
        <Meta />
        <Header />
        <main className="container-outer">{children}</main>
        <Footer />
    </>
);

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
