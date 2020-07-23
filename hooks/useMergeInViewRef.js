import { useCallback } from 'react';

const useMergeInViewRef = (ref, inViewRef) => {
    const setRefs = useCallback(
        node => {
            // eslint-disable-next-line no-param-reassign
            if (ref) ref.current = node;
            inViewRef(node);
        },
        [inViewRef, ref],
    );

    return setRefs;
};

export default useMergeInViewRef;
