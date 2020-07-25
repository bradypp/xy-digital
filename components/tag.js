import PropTypes from 'prop-types';
import cn from 'classnames';

const Tag = ({ tag, variant }) => {
    const className = cn('tag', {
        'text-2xs': variant === 'small',
        'text-xs': variant === 'large',
    });
    return <li className={className}>{tag}</li>;
};

Tag.propTypes = {
    tag: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['small', 'large']),
};

Tag.defaultProps = {
    variant: 'small',
};

export default Tag;
