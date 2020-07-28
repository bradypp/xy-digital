import { FadeUp, Icon } from 'components';

const SectionHeading = ({ children }) => (
    <FadeUp
        className="title font-tertiary uppercase text-grey-cool-500 text-4xl mt-10 mx-12 mb-8 flex flex-col justify-center items-center"
        y={0}
        duration={0.8}>
        <h2>{children}</h2>
        <Icon className="mt-3 w-6 h-6" name="arrow-down" />
    </FadeUp>
);

export default SectionHeading;
