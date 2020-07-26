import PropTypes from 'prop-types';
import cn from 'classnames';

const FormButtons = ({ withSubmit, withReset, submitText, resetText, className }) => {
    const newClassName = cn('flex', className);

    return (
        <div className={newClassName}>
            {withSubmit && (
                <button
                    className="font-tertiary px-4 h-10 font-semibold bg-blue-600 text-white rounded mr-4 hover:bg-blue-700 transition-ease"
                    type="submit">
                    {submitText}
                </button>
            )}
            {withReset && (
                // eslint-disable-next-line react/button-has-type
                <button
                    className="font-tertiary px-4 h-10 font-semibold rounded hover:bg-grey-cool-400 transition-ease"
                    type="reset">
                    {resetText}
                </button>
            )}
        </div>
    );
};

FormButtons.propTypes = {
    className: PropTypes.string,
    withSubmit: PropTypes.bool,
    withReset: PropTypes.bool,
    submitText: PropTypes.string,
    resetText: PropTypes.string,
};

FormButtons.defaultProps = {
    className: undefined,
    withSubmit: true,
    withReset: false,
    submitText: 'Submit',
    resetText: 'Reset',
};

export default FormButtons;
