import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import cn from 'classnames';

import { useParallaxScroll } from 'hooks';

const ParallaxImage = ({ scrollY, src, alt, className }) => {
    const [imgRef, imgY] = useParallaxScroll(scrollY);

    const newClassName = cn('overflow-hidden relative z-10', className);

    return (
        <div ref={imgRef} className={newClassName}>
            <motion.img
                className="engulf object-cover"
                src={src}
                alt={alt}
                style={{ y: imgY, scale: 1.15 }}
            />
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
