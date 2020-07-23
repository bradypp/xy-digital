import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { RichText } from 'prismic-reactjs';

import { Button, Blog, Nav } from 'components';
import { useParallaxScroll } from 'hooks';

const titleContainerVariants = {
    visible: {
        transition: {
            delayChildren: 0.7,
            staggerChildren: 0.12,
            duration: 1,
        },
    },
};
const titleChildrenVariants = {
    hidden: {
        opacity: 0,
        y: '100%',
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'tween',
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};

// TODO: change all images
// TODO: replace image placeholder with video
// TODO: add/edit scroll svg
// TODO: alt text
// TODO: nav functionality and animation
// TODO: tweak parallax so it's greater than + 500
// TODO: overlap slideshow slightly
// TODO: change video
// TODO: extract nav links from config file
const Hero = ({ data, scrollY }) => {
    const { about, background_image, featured_video } = data.homeData;

    const [bgRef, bgElY] = useParallaxScroll(scrollY, 0, 1200, '0%', '16%');
    const [leftRef, leftElY] = useParallaxScroll(scrollY, 0, 1200, '0%', '-16%');
    const [vidRef, vidElY] = useParallaxScroll(scrollY, 0, 1200, '-8px', '22%');
    const [rightRef, rightElY] = useParallaxScroll(scrollY, 0, 1200, '0%', '-28%');

    return (
        <section id="#hero" className="relative -mb-24">
            {/* Background Image */}
            <motion.div
                className="absolute overflow-hidden w-full h-900px"
                ref={bgRef}
                initial={{ y: 0 }}
                style={{ y: bgElY }}>
                <img
                    className="engulf object-cover"
                    src={background_image.url}
                    alt={background_image.alt}
                />
            </motion.div>

            {/*  Content */}
            <div className="container-inner flex">
                <motion.div
                    className="flex flex-col w-2/3 z-10"
                    ref={leftRef}
                    initial={{ y: 0 }}
                    style={{ y: leftElY }}>
                    {/* Title Section */}
                    <motion.h1
                        className="title-heading px-24 pt-220px relative mb-48 leading-none"
                        initial="hidden"
                        animate="visible"
                        variants={titleContainerVariants}>
                        <span className="inline-block overflow-hidden mb-4">
                            <motion.span
                                className="inline-block pr-6"
                                variants={titleChildrenVariants}>
                                Level
                            </motion.span>
                        </span>
                        <span className="inline-block overflow-hidden mb-4">
                            <motion.span className="inline-block" variants={titleChildrenVariants}>
                                Up
                            </motion.span>
                        </span>
                        <br />
                        <span className="inline-block overflow-hidden mb-4">
                            <motion.span
                                className="inline-block pr-6"
                                variants={titleChildrenVariants}>
                                Your
                            </motion.span>
                        </span>
                        <span className="inline-block overflow-hidden mb-4">
                            <motion.span className="inline-block" variants={titleChildrenVariants}>
                                Brand
                            </motion.span>
                        </span>
                    </motion.h1>

                    {/* About Section */}
                    <motion.section
                        initial={{
                            opacity: 0,
                            y: 50,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: {
                                type: 'tween',
                                delay: 1.6,
                                duration: 0.8,
                                ease: 'easeOut',
                            },
                        }}>
                        <div className="home__hero__video px-24 z-20 mb-4">
                            <motion.div
                                ref={vidRef}
                                initial={{ y: -8 }}
                                style={{ y: vidElY }}
                                // eslint-disable-next-line react/no-danger
                                dangerouslySetInnerHTML={{ __html: featured_video.html }}
                            />
                        </div>
                        <div className="home__hero__about bg-white px-24 pb-24 pt-64 -mt-56 ">
                            <div className="prose max-w-none sm:prose-sm mb-6">
                                <RichText render={about} />
                            </div>
                            <Button href="#contact-us" icon="arrow-right">
                                Get In Touch
                            </Button>
                        </div>
                    </motion.section>
                </motion.div>

                {/* Nav Section */}
                <motion.div
                    className="w-1/3 z-10"
                    ref={rightRef}
                    initial={{ y: 0 }}
                    style={{ y: rightElY }}>
                    <Nav />

                    {/* Blog section */}
                    <motion.section
                        className="bg-grey-cool-300 p-8"
                        initial={{
                            opacity: 0,
                            y: 50,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: {
                                type: 'tween',
                                delay: 1.9,
                                duration: 0.8,
                                ease: 'easeOut',
                            },
                        }}>
                        <Blog data={data.blogData} />
                    </motion.section>
                </motion.div>
            </div>
        </section>
    );
};

Hero.propTypes = {
    data: PropTypes.object.isRequired,
    scrollY: PropTypes.object.isRequired,
};

export default Hero;
