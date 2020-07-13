import { Meta } from 'components';
import PropTypes from 'prop-types';

const Layout = ({ children }) => (
    <div className="container">
        <Meta />
        <main>{children}</main>
    </div>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
