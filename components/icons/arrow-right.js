import PropTypes from 'prop-types';

const ArrowRight = props => (
    <svg
        width={44}
        height={44}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}>
        <path d="M0 0h24v24H0z" stroke="none" />
        <path d="M5 12h14M15 16l4-4M15 8l4 4" />
    </svg>
);

ArrowRight.propTypes = {
    className: PropTypes.string,
};

ArrowRight.defaultProps = {
    className: undefined,
};

export default ArrowRight;
