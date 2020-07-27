import { useEffect, useRef } from 'react';
import useDeepCompareMemoize from './useDeepCompareMemoize';

// Hook that alerts clicks outside of the passed ref
const useOnOutsideClick = (
    ignoredElementRefs,
    isListening,
    onOutsideClick,
    listeningElementRef = {},
) => {
    const mouseDownTargetRef = useRef();
    const ignoredElementRefsMemoized = useDeepCompareMemoize([ignoredElementRefs].flat());

    useEffect(() => {
        // Get ref of element that was clicked
        const handleMouseDown = event => {
            mouseDownTargetRef.current = event.target;
        };

        // Call the onClick handler if the element clicked shouldn't be ignored
        const handleMouseUp = event => {
            if (ignoredElementRefsMemoized[0].current) {
                const isAnyIgnoredElementAncestorOfTarget = ignoredElementRefsMemoized.some(
                    $elementRef =>
                        $elementRef.current.contains(mouseDownTargetRef.current) ||
                        $elementRef.current.contains(event.target),
                );

                if (event.button === 0 && !isAnyIgnoredElementAncestorOfTarget) {
                    onOutsideClick();
                }
            }
        };

        // Set event listener on document or some specified element
        const listeningElement = listeningElementRef.current || document;

        // Bind the event listener
        if (isListening) {
            listeningElement.addEventListener('mousedown', handleMouseDown);
            listeningElement.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            // Unbind the event listener on clean up
            listeningElement.removeEventListener('mousedown', handleMouseDown);
            listeningElement.removeEventListener('mouseup', handleMouseUp);
        };
    }, [
        ignoredElementRefs,
        ignoredElementRefsMemoized,
        listeningElementRef,
        isListening,
        onOutsideClick,
    ]);
};

export default useOnOutsideClick;
