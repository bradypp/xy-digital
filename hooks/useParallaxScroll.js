import { useRef, useState, useEffect } from 'react';
import { useTransform } from 'framer-motion';

const useParallaxScroll = (
    scrollY,
    scrollStartOffset = -1200,
    scrollEndOffset = 1200,
    initialPosition = '-15%',
    endPosition = '15%',
) => {
    const elementRef = useRef();
    const [elementTop, setElementTop] = useState(0);

    const elementY = useTransform(
        scrollY,
        [elementTop + scrollStartOffset, elementTop + scrollEndOffset],
        [initialPosition, endPosition],
    );

    useEffect(() => {
        setElementTop(elementRef.current.offsetTop);
    }, []);

    return [elementRef, elementY];
};

export default useParallaxScroll;
