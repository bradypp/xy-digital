import { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence, useViewportScroll, useTransform } from 'framer-motion';

import { Button } from 'components';

const variants = {
    enter: {
        opacity: 0,
        scale: 1.1,
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
        opacity: 0.2,
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

const Slideshow = ({ data }) => {
    const [page, setPage] = useState(0);

    const { scrollY } = useViewportScroll();

    const slideshowRef = useRef();
    const [slideshowOffsetTop, setSlideshowOffsetTop] = useState(0);

    const imgY = useTransform(
        scrollY,
        [slideshowOffsetTop - 1000, slideshowOffsetTop + 1000],
        ['-15%', '15%'],
    );

    const paginate = useCallback(
        (nextPage = page + 1) => {
            setPage(nextPage % data.length);
        },
        [data.length, page],
    );

    useEffect(() => {
        const interval = setTimeout(() => {
            paginate();
        }, 8000);
        return () => clearTimeout(interval);
    }, [page, paginate]);

    // TODO: Make general parallax component
    useEffect(() => {
        if (slideshowRef.current) setSlideshowOffsetTop(slideshowRef.current.offsetTop);
    }, []);

    return (
        <section id="slideshow" className="h-800px mb-96" ref={slideshowRef}>
            <div className="flex h-full relative overflow-hidden bg-black">
                <AnimatePresence>
                    <motion.div
                        className="flex flex-col justify-center items-center engulf"
                        key={page}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit">
                        <motion.img
                            className="engulf object-cover"
                            src={data[page].node.featured_image.url}
                            alt={data[page].node.featured_image.alt}
                            style={{ y: imgY }}
                        />
                        <motion.div className="engulf bg-grey-900 opacity-50 z-10">
                            &nbsp;
                        </motion.div>
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
                        <Button
                            className="z-20"
                            href={data[page].node._meta.uid}
                            icon="arrow-right"
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit">
                            Explore more
                        </Button>
                    </motion.div>
                </AnimatePresence>
            </div>
            {/* <div>pagination</div>
            <div>progress bar</div> */}
        </section>
    );
};

Slideshow.propTypes = {
    data: PropTypes.array.isRequired,
};

export default Slideshow;
// import { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { v4 as uuidv4 } from 'uuid';
// import { motion, useAnimation, AnimatePresence } from 'framer-motion';

// import { Button } from 'components';

// const Slideshow = ({ data }) => {
//     const controls = useAnimation();

//     useEffect(() => {
//         controls.start(i => ({
//             opacity: 0,
//             x: 100,
//             transition: { delay: i * 0.3 },
//         }));
//     }, []);

//     return (
//         <section id="slideshow" className="h-800px">
//             <ul className="flex h-full relative overflow-hidden">
//                 {data.map(el => {
//                     const { _meta, featured_image, tags, title, subtitle } = el.node;
//                     return (
//                         <AnimatePresence initial={false}>
//                             <motion.li
//                                 className="flex flex-col justify-center items-center engulf"
//                                 key={uuidv4()}
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 transition={{ duration: 2 }}
//                                 exit={{ opacity: 0 }}>
//                                 <img
//                                     className="engulf object-cover"
//                                     src={featured_image.url}
//                                     alt=""
//                                 />
//                                 <div className="engulf bg-grey-900 opacity-20 z-10">&nbsp;</div>
//                                 <h3 className="text-white text-5xl font-bold mb-8 z-20">
//                                     {title[0].text}
//                                 </h3>
//                                 <p className="text-white text-2xl font-secondary mb-8 z-20">
//                                     {subtitle}
//                                 </p>
//                                 <ul className="flex justify-center items-center mb-8 z-20">
//                                     {tags.map(el => (
//                                         <li className="tag">{el.tag}</li>
//                                     ))}
//                                 </ul>
//                                 <Button className="z-20" href={_meta.uid} icon="arrow-right">
//                                     Explore more
//                                 </Button>
//                             </motion.li>
//                         </AnimatePresence>
//                     );
//                 })}
//             </ul>
//             {/* <div>pagination</div>
//             <div>progress bar</div> */}
//         </section>
//     );
// };

// Slideshow.propTypes = {
//     data: PropTypes.array.isRequired,
// };

// export default Slideshow;
