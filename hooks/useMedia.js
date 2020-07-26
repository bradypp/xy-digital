import { useMediaQuery } from 'react-responsive';
import media from 'utils/media';

const useMedia = (minWidth = '2xl', maxWidth) => {
    const isInWidth = useMediaQuery({
        minWidth: media[minWidth],
        maxWidth: media[maxWidth],
    });

    return isInWidth;
};

export default useMedia;
