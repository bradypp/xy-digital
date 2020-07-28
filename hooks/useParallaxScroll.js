import { useRef, useState, useEffect } from 'react';
import { useTransform } from 'framer-motion';

const useParallaxScroll = (
    scrollY,
    scrollStartOffset = -1200,
    scrollEndOffset = 1200,
    initialPosition = '-20%',
    endPosition = '20%',
) => {
    const elementRef = useRef();
    const [elementTop, setElementTop] = useState(0);

    const elementY = useTransform(
        scrollY,
        [elementTop + scrollStartOffset, elementTop + scrollEndOffset],
        [initialPosition, endPosition],
    );

    useEffect(() => {
        if (elementRef.current) {
            setElementTop(elementRef.current.offsetTop);
        }
    }, [elementRef]);

    return [elementRef, elementY, elementTop];
};

export default useParallaxScroll;
