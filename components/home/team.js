import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import { Icon } from 'components';
import { useParallaxScroll } from 'hooks';

// TODO: image and quote
const Team = ({ image, quote, scrollY }) => {
    const [imgRef, imgY] = useParallaxScroll(scrollY);

    return (
        <section ref={imgRef} className="mb-16 relative h-800px overflow-hidden w-full">
            <blockquote className="absolute z-10 top-50px left-30px flex w-3/7 text-grey-cool-200">
                <Icon className="w-6 h-6 min-h-6 min-w-6 fill-current" name="quote-left" />
                <p className="text-4xl">{quote}</p>
            </blockquote>
            <motion.img
                className="engulf object-cover"
                src={image.url}
                alt={image.alt}
                style={{ y: imgY, scale: 1.15 }}
            />
        </section>
    );
};

Team.propTypes = {
    image: PropTypes.object.isRequired,
    scrollY: PropTypes.object.isRequired,
    quote: PropTypes.string.isRequired,
};

export default Team;
