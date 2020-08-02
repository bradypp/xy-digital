import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import TextAreaAutoSize from 'react-textarea-autosize';
import cn from 'classnames';

const TextArea = forwardRef(({ className, onChange, id, onBlur, value }, ref) => {
    const newClassName = cn('field-container inline-block', className);
    return (
        <div className={newClassName}>
            <TextAreaAutoSize
                className="field p-1 min-h-48 rounded"
                onBlur={onBlur}
                value={value}
                onChange={event => onChange(event.target.value, event)}
                ref={ref || undefined}
                id={id}
            />
        </div>
    );
});

TextArea.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    value: PropTypes.string,
    invalid: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
};

TextArea.defaultProps = {
    className: undefined,
    value: undefined,
    invalid: false,
    onChange: () => {},
    onBlur: undefined,
};

export default TextArea;
