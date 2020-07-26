import PropTypes from 'prop-types';
import { Formik, Form as FormikForm } from 'formik';

import { Field, FormButtons } from 'components/form';

const Form = props => <Formik {...props} />;

Form.Element = props => <FormikForm className="w-full" noValidate {...props} />;
Form.Field = Field;
Form.Buttons = FormButtons;

Form.propTypes = {
    validateOnBlur: PropTypes.bool,
};

Form.defaultProps = {
    validateOnBlur: false,
};

export default Form;
