import { Meta } from 'components';
import PropTypes from 'prop-types';

const Layout = ({ children }) => (
    <>
        <Meta />
        <main className="container-outer">{children}</main>
    </>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
