import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import cn from 'classnames';

import { useParallaxScroll } from 'hooks';
// TODO: delete/fix?
const ParallaxImage = ({ scrollY, src, alt, className, variant }) => {
    const [imgRef, imgY] = useParallaxScroll(scrollY);

    const newClassName = cn('overflow-hidden w-full absolute', className, {
        'h-800px': variant === 'large',
    });

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
    variant: PropTypes.oneOf(['large']),
};

ParallaxImage.defaultProps = {
    alt: '',
    className: undefined,
    variant: 'large',
};

export default ParallaxImage;
