import PropTypes from 'prop-types';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaDribbble } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

import { ArrowRight, QuoteLeft } from './icons';

const Icon = ({ name, ...props }) => {
    const icons = {
        'arrow-right': <ArrowRight {...props} />,
        'quote-left': <QuoteLeft {...props} />,
        Facebook: <FaFacebook {...props} />,
        Twitter: <FaTwitter {...props} />,
        Instagram: <FaInstagram {...props} />,
        GitHub: <FaGithub {...props} />,
        Dribbble: <FaDribbble {...props} />,
        'arrow-down': <IoIosArrowDown {...props} />,
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
