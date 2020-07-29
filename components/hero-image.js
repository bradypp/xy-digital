import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import { useParallaxScroll, useMedia } from 'hooks';

const HeroImage = ({ scrollY, src, alt }) => {
    const { maxmd } = useMedia();
    const [bgRef, bgElY] = useParallaxScroll(scrollY, 0, maxmd ? 600 : 1200, '0%', '16%');

    return (
        <motion.div
            className="absolute overflow-hidden w-full h-900px xl:h-700px xs:h-600px"
            ref={bgRef}
            initial={{ y: 0, opacity: 0 }}
            animate={{
                opacity: 1,
                transition: {
                    type: 'tween',
                    duration: 0.6,
                },
            }}
            style={{ y: bgElY }}>
            <div className="absolute bg-grey-900 opacity-40 w-full h-full z-10" />
            <img className="engulf object-cover" src={src} alt={alt} />
        </motion.div>
    );
};

HeroImage.propTypes = {
    scrollY: PropTypes.object.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
};

HeroImage.defaultProps = {
    alt: '',
};

export default HeroImage;
