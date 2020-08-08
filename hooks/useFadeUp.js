import { useInView } from 'react-intersection-observer';

import { useMergeInViewRef } from 'hooks';

const useFadeUp = (ref = undefined, options = {}) => {
    const { threshold, triggerOnce, delay, duration, y, ...otherOptions } = options;

    const variants = {
        hidden: {
            y: y || 20,
            opacity: 0,
            transition: {
                duration: duration || 0.5,
                ease: [0.645, 0.045, 0.355, 1],
            },
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                delay: delay || 0,
                duration: duration || 0.5,
                ease: [0.645, 0.045, 0.355, 1],
            },
        },
    };

    const [inViewRef, inView] = useInView({
        threshold: threshold || 0.1,
        triggerOnce: triggerOnce || true,
        ...otherOptions,
    });

    const setRefs = useMergeInViewRef(ref, inViewRef);

    return [
        setRefs,
        {
            variants,
            initial: 'hidden',
            animate: inView ? 'visible' : 'hidden',
        },
        inView,
    ];
};

export default useFadeUp;
