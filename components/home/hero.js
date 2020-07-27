import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RichText } from 'prismic-reactjs';
import ReactPlayer from 'react-player/vimeo';

import { linkResolver, customLink } from 'utils/prismic';
import { Button, Nav, Logo, HeroImage, BurgerMenu } from 'components';
import { Blog } from 'components/home';
import { useParallaxScroll, useMedia } from 'hooks';

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

const Hero = ({ data, scrollY }) => {
    const { about, background_image, featured_video } = data.homeData;

    const [videoWidth, setVideoWidth] = useState('auto');
    const {
        min2xl,
        minlgMaxxl,
        minsmMaxmd,
        maxmd,
        min2xsMaxxs,
        minmdMaxlg,
        minxlMax2xl,
        minxsMaxsm,
    } = useMedia();

    useEffect(() => {
        if (min2xl) setVideoWidth(560);
        if (minlgMaxxl) setVideoWidth(440);
        if (minsmMaxmd) setVideoWidth(500);
        if (min2xsMaxxs || minmdMaxlg || minxlMax2xl || minxsMaxsm) setVideoWidth('auto');
    }, [min2xl, min2xsMaxxs, minlgMaxxl, minmdMaxlg, minsmMaxmd, minxlMax2xl, minxsMaxsm]);

    const [leftRef, leftElY] = useParallaxScroll(scrollY, 0, 1200, '0%', '-16%');
    const [vidRef, vidElY] = useParallaxScroll(scrollY, 0, 1200, '-8px', '22%');
    const [rightRef, rightElY] = useParallaxScroll(scrollY, 0, 1200, '0%', '-28%');

    return (
        <section id="hero" className="relative -mb-32">
            {/* Background Image */}
            <HeroImage scrollY={scrollY} src={background_image.url} alt={background_image.alt} />

            {/* Logo */}
            <motion.div
                className="z-20 relative"
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
                <Logo className="absolute top-30px left-80px md:top-20px md:left-40px" />
            </motion.div>

            {/*  Content */}
            <div className="container-inner flex">
                <motion.div
                    className="flex flex-col w-2/3 z-10 md:w-full lg:w-4/7"
                    ref={leftRef}
                    initial={{ y: 0 }}
                    style={{ y: leftElY }}>
                    {/* Title Section */}
                    <motion.h1
                        className="title-main px-24 pt-220px relative mb-48 leading-none xl:px-12 lg:px-6 md:px-12"
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
                        className="xl:-mt-40"
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
                        <div className="hero-video px-24 xl:px-12 z-20 mb-4 relative md:pt-24">
                            <motion.div ref={vidRef} initial={{ y: -8 }} style={{ y: vidElY }}>
                                <ReactPlayer
                                    url={featured_video.embed_url}
                                    width={videoWidth}
                                    volume={0}
                                    muted
                                    playing
                                    loop
                                />
                            </motion.div>
                        </div>
                        <div className="bg-white px-24 xl:px-12 xs:px-6 pb-24 xl:pb-12 pt-64 -mt-56 relative xl:-mt-48 xl:pt-40 lg:pt-32 md:pt-48 xs:-mt-48 xs:pt-32">
                            <div id="about-us" className="absolute -mt-84" />
                            <div className="prose max-w-none sm:prose-sm mb-6">
                                <h2 className="title font-tertiary uppercase text-grey-cool-800">
                                    About Us
                                </h2>
                                <RichText
                                    render={about}
                                    linkResolver={linkResolver}
                                    serializeHyperlink={customLink}
                                />
                            </div>
                            <Button href="/contact-us" icon="arrow-right">
                                Get In Touch
                            </Button>
                        </div>
                    </motion.section>
                </motion.div>

                {maxmd && <BurgerMenu />}
                {/* Nav Section */}
                <motion.div
                    className="w-1/3 z-10 md:hidden lg:w-3/7"
                    ref={rightRef}
                    initial={{ y: 0 }}
                    style={{ y: rightElY }}>
                    <Nav isHome />

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
