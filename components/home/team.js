import PropTypes from 'prop-types';

import { ParallaxImage } from 'components';

const Team = ({ image, scrollY }) => {
    return <ParallaxImage scrollY={scrollY} src={image.url} alt={image.alt} />;
};

Team.propTypes = {
    image: PropTypes.object.isRequired,
    scrollY: PropTypes.object.isRequired,
};

export default Team;
