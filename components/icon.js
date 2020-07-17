import PropTypes from 'prop-types';

import { ArrowRight } from './icons';

const Icon = ({ name, ...props }) => {
    const icons = {
        'arrow-right': <ArrowRight {...props} />,
    };
    return icons[name];
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
};

Icon.defaultProps = {
    className: undefined,
};

export default Icon;
