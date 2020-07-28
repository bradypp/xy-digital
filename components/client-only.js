import PropTypes from 'prop-types';

import { useIsMounted } from 'hooks';

// Wrap any component that you only want to render client side when mounted
const ClientOnly = ({ children, delay, conditions }) => {
    const isMounted = useIsMounted(delay, conditions);
    return isMounted ? children : null;
};

ClientOnly.propTypes = {
    children: PropTypes.node.isRequired,
    delay: PropTypes.number,
    conditions: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.bool), PropTypes.bool]),
};

ClientOnly.defaultProps = {
    children: PropTypes.node.isRequired,
    delay: 0,
    conditions: [],
};

export default ClientOnly;
