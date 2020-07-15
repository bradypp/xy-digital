import { useRef, useState, useEffect } from 'react';
import { useViewportScroll, useTransform, motion } from 'framer-motion';

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

const Hero = () => {
    const { scrollY } = useViewportScroll();

    const bgElRef = useRef();
    const [bgElOffsetTop, setBgElOffsetTop] = useState(0);
    const bgElY = useTransform(scrollY, [bgElOffsetTop, bgElOffsetTop + 500], ['0%', '10%']);

    const leftElRef = useRef();
    const [leftElOffsetTop, setLeftElOffsetTop] = useState(0);
    const leftElY = useTransform(scrollY, [leftElOffsetTop, leftElOffsetTop + 500], ['0%', '-12%']);

    const rightElRef = useRef();
    const [rightElOffsetTop, setRightElOffsetTop] = useState(0);
    const rightElY = useTransform(
        scrollY,
        [rightElOffsetTop, rightElOffsetTop + 500],
        ['0%', '-16%'],
    );

    useEffect(() => {
        if (bgElRef.current) setBgElOffsetTop(bgElRef.current.offsetTop);
        if (leftElRef.current) setLeftElOffsetTop(leftElRef.current.offsetTop);
        if (rightElRef.current) setRightElOffsetTop(rightElRef.current.offsetTop);
    }, [leftElRef, rightElRef, bgElRef]);

    return (
        <header id="#header" className="relative">
            {/* Background Image */}
            <motion.div
                className="absolute overflow-hidden w-full h-900px"
                ref={bgElRef}
                initial={{ y: 0 }}
                style={{ y: bgElY }}>
                <div
                    className="absolute overflow-hidden w-full h-full bg-center bg-no-repeat bg-auto-100%"
                    style={{ backgroundImage: 'url(/img/hero.jpg)' }}
                />
            </motion.div>

            {/*  Content */}
            <div className="container-inner flex">
                <motion.div
                    className="flex flex-col w-2/3 z-10"
                    ref={leftElRef}
                    initial={{ y: 0 }}
                    style={{ y: leftElY }}>
                    {/* Title Section */}
                    <motion.h1
                        className="title px-20 pt-240px relative"
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
                                {/* Business, Reach */}
                            </motion.span>
                        </span>
                    </motion.h1>

                    {/* Scroll Section */}
                    <motion.div
                        className="px-20 pt-32 pb-4 text-white mb-4"
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
                    <div className="px-20 z-20 mb-4">
                        <motion.div initial="hidden" animate="visible" variants={aboutVariants}>
                            <img className="w-2/3 " src="/img/hero.jpg" alt="" />
                            <h2 className="pt-4 pl-4 uppercase leading-6">
                                <span className="text-xs font-bold text-grey-500">Overline</span>
                                <br />
                                <span className="text-2xl font-bold">Video Title</span>
                            </h2>
                        </motion.div>
                    </div>

                    {/* About Section */}
                    <motion.div initial="hidden" animate="visible" variants={aboutVariants}>
                        <div className="about bg-white p-20 pt-64 -mt-64">
                            <p className="pl-4">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
                                natus, magnam praesentium dolorem temporibus fuga illo soluta
                                laborum. Sit maiores fugit fugiat suscipit obcaecati! Dolor illum
                                eveniet ad! Assumenda, laboriosam?
                            </p>
                            <p className="pl-4">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
                                natus, magnam praesentium dolorem temporibus fuga illo soluta
                                laborum. Sit maiores fugit fugiat suscipit obcaecati! Dolor illum
                                eveniet ad! Assumenda, laboriosam?
                            </p>
                            <p className="pl-4">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
                                natus, magnam praesentium dolorem temporibus fuga illo soluta
                                laborum. Sit maiores fugit fugiat suscipit obcaecati! Dolor illum
                                eveniet ad! Assumenda, laboriosam?
                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Nav Section */}
                <motion.div
                    className="w-1/3 z-10"
                    ref={rightElRef}
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
                        className="p-20"
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
                        variants={rightImageVariants}>
                        &nbsp;
                    </motion.div>
                </motion.div>
            </div>
        </header>
    );
};

export default Hero;
