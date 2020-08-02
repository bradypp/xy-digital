import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Input = forwardRef(({ className, onChange, id, onBlur, value, type }, ref) => {
    const newClassName = cn('field-container h-8', className);
    return (
        <div className={newClassName}>
            <input
                id={id}
                onBlur={onBlur}
                value={value}
                type={type}
                className="field h-full px-1"
                onChange={event => onChange(event.target.value, event)}
                ref={ref}
            />
        </div>
    );
});

Input.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string,
    invalid: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
};

Input.defaultProps = {
    className: undefined,
    value: undefined,
    type: 'text',
    invalid: false,
    onChange: () => {},
    onBlur: undefined,
};

export default Input;
