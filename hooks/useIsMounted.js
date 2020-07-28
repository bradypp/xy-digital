import { useState, useEffect } from 'react';

const useIsMounted = (delay = 0, conditions = []) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        const conditionsArr = [conditions].flat();

        if (conditionsArr.length > 0 && !conditionsArr.reduce((acc, el) => el, false)) return;
        const timeout = setTimeout(() => setIsMounted(true), delay);

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return isMounted;
};

export default useIsMounted;
