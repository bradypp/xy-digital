import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Input = forwardRef(({ className, onChange, id }, ref) => {
    const newClassName = cn('field h-8', className);
    return (
        <div className={newClassName}>
            <input
                id={id}
                className="h-8 w-full font-tertiary px-2 text-sm rounded-lg"
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
};

Input.defaultProps = {
    className: undefined,
    value: undefined,
    type: 'text',
    invalid: false,
    onChange: () => {},
};

export default Input;
