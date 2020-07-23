import { motion, useTransform } from 'framer-motion';

import { FadeUp, Icon } from 'components';

const SectionHeading = ({ children, scrollY, elementTop }) => {
    const elementY = useTransform(scrollY, [elementTop - 800, elementTop + 400], [-22, 22]);

    return (
        <FadeUp
            className="title font-tertiary uppercase text-grey-cool-500 text-4xl mt-12 mx-12 mb-8 flex flex-col justify-center items-center"
            y={0}
            duration={0.8}>
            <motion.h2 style={{ y: elementY }}>{children}</motion.h2>
            <Icon className="mt-2 w-6 h-6" name="arrow-down" />
        </FadeUp>
    );
};

export default SectionHeading;
