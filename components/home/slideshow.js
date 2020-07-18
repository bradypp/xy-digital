import { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {
    motion,
    AnimatePresence,
    useViewportScroll,
    useTransform,
    useAnimation,
} from 'framer-motion';

import { Button } from 'components';

const slideshowVariants = {
    enter: {
        opacity: 0,
        scale: 1.14,
    },
    center: {
        zIndex: 1,
        opacity: 1,
        scale: 1.12,
        transition: {
            delay: 0.6,
            opacity: {
                duration: 1,
            },
            scale: {
                duration: 0.8,
            },
        },
    },
    exit: {
        zIndex: 0,
        opacity: 0,
        z: 1,
        scale: 1.14,
        transition: {
            opacity: {
                duration: 1,
            },
            scale: {
                duration: 0.8,
            },
        },
    },
};

const timerVariants = {
    hidden: {
        y: '-100%',
        transition: {
            duration: 0,
        },
    },
    animated: {
        y: 0,
        transition: {
            duration: 7.8,
            ease: 'easeInOut',
        },
    },
};

const Slideshow = ({ data }) => {
    const [page, setPage] = useState(0);
    const timerControls = useAnimation();

    const { scrollY } = useViewportScroll();

    const slideshowRef = useRef();
    const [slideshowOffsetTop, setSlideshowOffsetTop] = useState(0);

    const imgY = useTransform(
        scrollY,
        [slideshowOffsetTop - 1000, slideshowOffsetTop + 1000],
        ['-15%', '15%'],
    );

    const timerSequence = useCallback(async () => {
        await timerControls.start('hidden');
        return timerControls.start('animated');
    }, [timerControls]);

    const paginate = useCallback(
        (nextPage = page + 1) => {
            setPage(nextPage % data.length);
            timerSequence();
        },
        [data.length, page, timerSequence],
    );

    useEffect(() => {
        timerSequence();
    }, [timerSequence]);
    useEffect(() => {
        const interval = setTimeout(() => {
            paginate();
        }, 8000);
        return () => clearTimeout(interval);
    }, [page, paginate, timerControls]);

    useEffect(() => {
        if (slideshowRef.current) setSlideshowOffsetTop(slideshowRef.current.offsetTop);
    }, []);

    const colors = ['blue-400', 'purple-400', 'yellow-400', 'pink-400', 'red-400', 'teal-400'];

    const timerClass = cn(`absolute top-0 left-0 w-2 h-full z-10 opacity-90 bg-${[colors[page]]}`);

    return (
        <section
            id="slideshow"
            className="flex relative overflow-hidden h-800px bg-black"
            ref={slideshowRef}>
            <motion.div className={timerClass} animate={timerControls} variants={timerVariants} />
            <div className="absolute top-0 left-20px z-10 flex flex-col justify-center items-center h-full">
                {data.map((el, i) => {
                    const paginationClass = cn(
                        'w-3 h-3 mb-1 border-2 border-white rounded-full opacity-80 clickable transition-ease',
                        {
                            [`opacity-100 bg-${[colors[page]]} border-${[colors[page]]}`]:
                                page === i,
                        },
                    );
                    return (
                        <>
                            <div className={paginationClass} onClick={() => paginate(i)} />
                        </>
                    );
                })}
            </div>
            <AnimatePresence>
                <motion.div
                    className="flex flex-col justify-center items-center engulf"
                    key={page}
                    variants={slideshowVariants}
                    initial="enter"
                    animate="center"
                    exit="exit">
                    <motion.img
                        className="engulf object-cover"
                        src={data[page].node.featured_image.url}
                        alt={data[page].node.featured_image.alt}
                        style={{ y: imgY }}
                    />
                    <motion.div className="engulf bg-grey-900 opacity-50 z-10" />
                    <h3 className="text-white text-5xl font-bold mb-8 z-20">
                        {data[page].node.title[0].text}
                    </h3>
                    <p className="text-white text-2xl font-secondary mb-8 z-20">
                        {data[page].node.subtitle}
                    </p>
                    <ul className="flex justify-center items-center mb-8 z-20">
                        {data[page].node.tags.map(el => (
                            <li className="tag">{el.tag}</li>
                        ))}
                    </ul>
                    <Button className="z-20" href={data[page].node._meta.uid} icon="arrow-right">
                        Learn more
                    </Button>
                </motion.div>
            </AnimatePresence>
        </section>
    );
};

Slideshow.propTypes = {
    data: PropTypes.array.isRequired,
};

export default Slideshow;
