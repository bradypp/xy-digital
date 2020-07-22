import PropTypes from 'prop-types';

import { ArrowRight, QuoteLeft } from './icons';

const Icon = ({ name, ...props }) => {
    const icons = {
        'arrow-right': <ArrowRight {...props} />,
        'quote-left': <QuoteLeft {...props} />,
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
