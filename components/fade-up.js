import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import { useFadeUp } from 'hooks';

const FadeUp = forwardRef(
    ({ children, triggerOnce, threshold, as, delay, duration, y, ...props }, ref) => {
        const [setRefs, fadeUpProps] = useFadeUp(ref, {
            triggerOnce,
            threshold,
            delay,
            duration,
            y,
        });
        const Component = motion[as];

        return (
            <Component ref={setRefs} {...fadeUpProps} {...props}>
                {children}
            </Component>
        );
    },
);

FadeUp.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    triggerOnce: PropTypes.bool,
    threshold: PropTypes.number,
    delay: PropTypes.number,
    duration: PropTypes.number,
    as: PropTypes.string,
    style: PropTypes.object,
    y: PropTypes.number,
};

FadeUp.defaultProps = {
    className: undefined,
    triggerOnce: undefined,
    threshold: undefined,
    duration: undefined,
    delay: undefined,
    as: 'div',
    style: undefined,
    y: undefined,
};

export default FadeUp;
