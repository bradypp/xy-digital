import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useViewportScroll, useTransform, motion } from 'framer-motion';
import { RichText } from 'prismic-reactjs';

const titleContainerVariants = {
    visible: {
        transition: {
            delayChildren: 0.6,
            staggerChildren: 0.1,
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
const aboutVariants = {
    hidden: {
        opacity: 0,
        y: 50,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'tween',
            delay: 1.5,
            duration: 0.8,
            ease: 'easeOut',
        },
    },
};
const rightImageVariants = {
    hidden: {
        opacity: 0,
        y: 50,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'tween',
            delay: 1.7,
            duration: 0.8,
            ease: 'easeOut',
        },
    },
};
const navVariants = {
    hidden: {
        opacity: 0,
        y: -50,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'tween',
            delay: 2,
            duration: 0.8,
            ease: 'easeOut',
        },
    },
};
const blogVariants = {
    hidden: {
        opacity: 0,
        y: -50,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'tween',
            delay: 2.1,
            duration: 0.8,
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
const Hero = ({ data }) => {
    const { about, background_image, featured_video } = data[0].node;
    const { scrollY } = useViewportScroll();

    const bgRef = useRef();
    const [bgElOffsetTop, setBgElOffsetTop] = useState(0);
    const bgElY = useTransform(scrollY, [bgElOffsetTop, bgElOffsetTop + 500], ['0%', '10%']);

    const leftRef = useRef();
    const [leftElOffsetTop, setLeftElOffsetTop] = useState(0);
    const leftElY = useTransform(scrollY, [leftElOffsetTop, leftElOffsetTop + 500], ['0%', '-12%']);

    const vidRef = useRef();
    const [vidElOffsetTop, setVidElOffsetTop] = useState(0);
    const vidElY = useTransform(scrollY, [vidElOffsetTop, vidElOffsetTop + 800], ['-8px', '10%']);

    const rightRef = useRef();
    const [rightElOffsetTop, setRightElOffsetTop] = useState(0);
    const rightElY = useTransform(
        scrollY,
        [rightElOffsetTop, rightElOffsetTop + 500],
        ['0%', '-16%'],
    );

    useEffect(() => {
        if (bgRef.current) setBgElOffsetTop(bgRef.current.offsetTop);
        if (leftRef.current) setLeftElOffsetTop(leftRef.current.offsetTop);
        if (vidRef.current) setVidElOffsetTop(vidRef.current.offsetTop);
        if (rightRef.current) setRightElOffsetTop(rightRef.current.offsetTop);
    }, [leftRef, rightRef, bgRef, vidRef]);

    return (
        <header id="#header" className="relative">
            {/* Background Image */}
            <motion.div
                className="absolute overflow-hidden w-full h-900px"
                ref={bgRef}
                initial={{ y: 0 }}
                style={{ y: bgElY }}>
                <div
                    className="absolute bg-image bg-auto-100%"
                    style={{ backgroundImage: `url(${background_image.url})` }}
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
                        className="title px-24 pt-220px relative"
                        initial="hidden"
                        animate="visible"
                        variants={titleContainerVariants}>
                        <span className="inline-block overflow-hidden">
                            <motion.span
                                className="inline-block pr-6"
                                variants={titleChildrenVariants}>
                                Level
                            </motion.span>
                        </span>
                        <span className="inline-block overflow-hidden">
                            <motion.span className="inline-block" variants={titleChildrenVariants}>
                                Up
                            </motion.span>
                        </span>
                        <br />
                        <span className="inline-block overflow-hidden">
                            <motion.span
                                className="inline-block pr-6"
                                variants={titleChildrenVariants}>
                                Your
                            </motion.span>
                        </span>
                        <span className="inline-block overflow-hidden">
                            <motion.span className="inline-block" variants={titleChildrenVariants}>
                                Brand
                                {/* Business, Reach, Earnings, Future */}
                            </motion.span>
                        </span>
                    </motion.h1>

                    {/* Scroll Section */}
                    <motion.div
                        className="px-24 pt-32 pb-4 text-white mb-4"
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        transition={{
                            type: 'spring',
                            delay: 1.6,
                            damping: 300,
                        }}>
                        scroll
                    </motion.div>

                    {/* Video Section */}
                    <motion.div
                        className="home__hero__video px-24 z-20 mb-4"
                        initial="hidden"
                        animate="visible"
                        variants={aboutVariants}>
                        <motion.div
                            ref={vidRef}
                            initial={{ y: -8 }}
                            style={{ y: vidElY }}
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{ __html: featured_video.html }}
                        />
                    </motion.div>
                    {/* About Section */}
                    <motion.div
                        className="home__hero__about bg-white px-24 pb-20 pt-64 -mt-56 prose max-w-none sm:prose-sm"
                        initial="hidden"
                        animate="visible"
                        variants={aboutVariants}>
                        <RichText render={about} />
                    </motion.div>
                </motion.div>

                {/* Nav Section */}
                <motion.div
                    className="w-1/3 z-10"
                    ref={rightRef}
                    initial={{ y: 0 }}
                    style={{ y: rightElY }}>
                    <motion.div
                        className="flex flex-col justify-end h-510px bg-pink-600 relative"
                        initial="hidden"
                        animate="visible"
                        variants={navVariants}>
                        <nav className="absolute bottom-100px left-80px">
                            <ul className="text-3xl text-white font-bold uppercase leading-snug">
                                <li>About Us</li>
                                <li>Our Work</li>
                                <li>Team</li>
                                <li>Blog</li>
                                <li>Find Us</li>
                            </ul>
                        </nav>
                    </motion.div>

                    {/* Latest Post */}
                    <motion.div
                        className="p-20 pb-32"
                        initial="hidden"
                        animate="visible"
                        variants={blogVariants}>
                        <h3 className="text-grey-200 text-md font-bold uppercase">Title</h3>
                        <p className="text-grey-300 text-sm font-secondary">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam
                            voluptatem nulla minus laudantium amet, dicta ratione! Animi, magni
                            impedit sed a tempora natus, maxime unde id laborum voluptatem neque
                            obcaecati.
                        </p>
                    </motion.div>

                    {/* Company image with thick border? Steps of animated words in/out with a new color for each - have final frame with all and gradient */}
                    <motion.div
                        className="h-510px bg-yellow-400"
                        initial="hidden"
                        animate="visible"
                        variants={rightImageVariants}
                    />
                </motion.div>
            </div>
        </header>
    );
};

Hero.propTypes = {
    data: PropTypes.array.isRequired,
};

export default Hero;
