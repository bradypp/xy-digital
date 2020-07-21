import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import cn from 'classnames';

import { useParallaxScroll } from 'hooks';

const ParallaxImage = ({ scrollY, src, alt, className: propsClassName }) => {
    const [imgRef, imgY] = useParallaxScroll(scrollY);

    const className = cn('relative overflow-hidden w-full h-800px', propsClassName);

    return (
        <div ref={imgRef} className={className}>
            <motion.img className="engulf object-cover" src={src} alt={alt} style={{ y: imgY }} />
        </div>
    );
};

ParallaxImage.propTypes = {
    src: PropTypes.string.isRequired,
    scrollY: PropTypes.object.isRequired,
    alt: PropTypes.string,
    className: PropTypes.string,
};

ParallaxImage.defaultProps = {
    alt: '',
    className: undefined,
};

export default ParallaxImage;
