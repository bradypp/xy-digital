import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { Icon, FadeUp, SectionHeading } from 'components';
import { useParallaxScroll } from 'hooks';

const blockQuoteVariants = {
    hidden: {
        opacity: 0,
        x: -50,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.5,
            duration: 0.8,
        },
    },
};

const Team = ({ image, quote, scrollY }) => {
    const [imgRef, imgY] = useParallaxScroll(scrollY);
    const [blockQuoteRef, inView] = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    return (
        <FadeUp
            as="section"
            ref={imgRef}
            className="mb-16 bg-white flex flex-col justify-center items-center">
            <SectionHeading>Our Team</SectionHeading>
            <div className="relative h-800px overflow-hidden w-full">
                <div className="bg-grey-900 opacity-50 absolute w-full h-full z-10" />

                <motion.blockquote
                    ref={blockQuoteRef}
                    className="absolute z-10 top-50px left-30px flex w-3/7 text-white"
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    variants={blockQuoteVariants}>
                    <Icon
                        className="w-8 h-8 min-h-8 min-w-8 mt-2 mr-3 fill-current"
                        name="quote-left"
                    />
                    <p className="text-4xl">{quote}</p>
                </motion.blockquote>
                <motion.img
                    className="engulf object-cover"
                    src={image.url}
                    alt={image.alt}
                    style={{ y: imgY, scale: 1.15 }}
                />
            </div>
        </FadeUp>
    );
};

Team.propTypes = {
    image: PropTypes.object.isRequired,
    scrollY: PropTypes.object.isRequired,
    quote: PropTypes.string.isRequired,
};

export default Team;
