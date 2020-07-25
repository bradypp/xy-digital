import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

import { FadeUp } from 'components';
import { useParallaxScroll } from 'hooks';

const slideshowVariants = {
    enter: {
        opacity: 0,
        scale: 1.2,
    },
    center: {
        zIndex: 1,
        opacity: 1,
        scale: 1.18,
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
        scale: 1.2,
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
            duration: 0.6,
        },
    },
    animated: {
        y: 0,
        transition: {
            duration: 6.2,
            ease: 'easeOut',
        },
    },
};

const Slideshow = ({ data, scrollY }) => {
    const [page, setPage] = useState(0);
    const timerControls = useAnimation();
    const [slideshowRef, imgY] = useParallaxScroll(scrollY);

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
        }, 7000);
        return () => clearTimeout(interval);
    }, [page, paginate, timerControls]);

    const timerClass = cn(`absolute top-0 left-0 w-2 h-full z-10 bg-blue-500`);

    return (
        <FadeUp
            ref={slideshowRef}
            as="section"
            id="slideshow"
            className="flex relative overflow-hidden h-800px bg-black">
            <motion.div className={timerClass} animate={timerControls} variants={timerVariants} />
            <div className="absolute top-0 left-20px z-10 flex flex-col justify-center items-center h-full">
                {data.map((el, i) => {
                    const paginationClass = cn(
                        'w-14px h-14px mb-6px border-2 border-white rounded-full clickable transition-ease opacity-70 hover:opacity-100',
                        {
                            [`opacity-100 bg-blue-500 border-blue-500`]: page === i,
                        },
                    );
                    return (
                        <div
                            key={uuidv4()}
                            className={paginationClass}
                            onClick={() => paginate(i)}
                        />
                    );
                })}
            </div>
            <Link href={data[page].node._meta.uid}>
                <a>
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
                                style={{ y: imgY, scale: 1.15 }}
                            />
                            <div className="engulf bg-grey-cool-900 opacity-40 z-10" />
                            <h3 className="title-main text-5xl text-white mb-8 z-20">
                                {data[page].node.title[0].text}
                            </h3>
                            <p className="text-white text-2xl font-secondary mb-8 z-20">
                                {data[page].node.subtitle}
                            </p>
                            <ul className="flex justify-center items-center z-20">
                                {data[page].node.tags.map(el => (
                                    <li key={uuidv4()} className="tag">
                                        {el.tag}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </AnimatePresence>
                </a>
            </Link>
        </FadeUp>
    );
};

Slideshow.propTypes = {
    data: PropTypes.array.isRequired,
    scrollY: PropTypes.object.isRequired,
};

export default Slideshow;
