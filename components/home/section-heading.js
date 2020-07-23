import { FadeUp } from 'components';

const SectionHeading = ({ children }) => {
    return (
        <FadeUp
            as="h2"
            className="title font-tertiary uppercase text-grey-cool-500 text-4xl p-12"
            y={0}
            duration={0.8}>
            {children}
        </FadeUp>
    );
};

export default SectionHeading;
