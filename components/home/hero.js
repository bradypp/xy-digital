import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { RichText } from 'prismic-reactjs';
import ReactPlayer from 'react-player/vimeo';

import { Button, Blog, Nav, Logo } from 'components';
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
// TODO: change video
const Hero = ({ data, scrollY }) => {
    const { about, background_image, featured_video } = data.homeData;

    const [bgRef, bgElY] = useParallaxScroll(scrollY, 0, 1200, '0%', '16%');
    const [leftRef, leftElY] = useParallaxScroll(scrollY, 0, 1200, '0%', '-16%');
    const [vidRef, vidElY] = useParallaxScroll(scrollY, 0, 1200, '-8px', '22%');
    const [rightRef, rightElY] = useParallaxScroll(scrollY, 0, 1200, '0%', '-28%');

    // useEffect(() => {
    //     const video = new Vimeo.Player(vidRef.current.firstChild);
    // });

    return (
        <section id="#hero" className="relative -mb-32">
            {/* Background Image */}
            <motion.div
                className="absolute overflow-hidden w-full h-900px"
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
                <img
                    className="engulf object-cover"
                    src={background_image.url}
                    alt={background_image.alt}
                />
            </motion.div>

            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                    transition: {
                        type: 'tween',
                        delay: 2.2,
                        duration: 0.8,
                        ease: 'easeOut',
                    },
                }}>
                <Logo className="absolute top-20px left-20px" />
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
                        className="title-main px-24 pt-220px relative mb-48 leading-none"
                        initial="hidden"
                        animate="visible"
                        variants={titleContainerVariants}>
                        <span className="inline-block overflow-hidden pb-4">
                            <motion.span
                                className="inline-block pr-6"
                                variants={titleChildrenVariants}>
                                Level
                            </motion.span>
                        </span>
                        <span className="inline-block overflow-hidden pb-4">
                            <motion.span className="inline-block" variants={titleChildrenVariants}>
                                Up
                            </motion.span>
                        </span>
                        <br />
                        <span className="inline-block overflow-hidden pb-4">
                            <motion.span
                                className="inline-block pr-6"
                                variants={titleChildrenVariants}>
                                Your
                            </motion.span>
                        </span>
                        <span className="inline-block overflow-hidden pb-4">
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
                            <motion.div ref={vidRef} initial={{ y: -8 }} style={{ y: vidElY }}>
                                <ReactPlayer
                                    url={featured_video.embed_url}
                                    width={560}
                                    volume={0}
                                    muted
                                    playing
                                    loop
                                />
                            </motion.div>
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
                                delay: 1.8,
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
