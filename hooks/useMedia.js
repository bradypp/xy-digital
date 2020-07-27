import { useMediaQuery } from 'react-responsive';
import media from 'utils/media';

const useMedia = () => {
    const min2xl = useMediaQuery({
        minWidth: media['2xl'],
    });
    const minxlMax2xl = useMediaQuery({
        minWidth: media.xl,
        maxWidth: media['2xl'],
    });
    const minlgMaxxl = useMediaQuery({
        minWidth: media.lg,
        maxWidth: media.xl,
    });
    const minmdMaxlg = useMediaQuery({
        minWidth: media.md,
        maxWidth: media.lg,
    });
    const maxmd = useMediaQuery({
        maxWidth: media.md,
    });
    const minsmMaxmd = useMediaQuery({
        minWidth: media.sm,
        maxWidth: media.md,
    });
    const maxsm = useMediaQuery({
        maxWidth: media.sm,
    });
    const minxsMaxsm = useMediaQuery({
        minWidth: media.xs,
        maxWidth: media.sm,
    });
    const min2xsMaxxs = useMediaQuery({
        minWidth: media['2xs'],
        maxWidth: media.xs,
    });
    const max2xs = useMediaQuery({
        maxWidth: media['2xs'],
    });

    return {
        min2xl,
        minxlMax2xl,
        minlgMaxxl,
        minmdMaxlg,
        maxmd,
        minsmMaxmd,
        maxsm,
        minxsMaxsm,
        min2xsMaxxs,
        max2xs,
    };
};

export default useMedia;
