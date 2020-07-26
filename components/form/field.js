import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import { Field, getIn } from 'formik';

import Input from './input';
import TextArea from './text-area';
import FieldContainer from './field-container';

const generateField = FormComponent => {
    const FieldComponent = ({
        className,
        label,
        tip,
        name,
        type,
        fieldId: propsId,
        tipLocation,
        ...props
    }) => (
        <Field name={name} type={type}>
            {({ field, form }) => {
                const fieldId = propsId || uniqueId('form-field-');
                const error = getIn(form.errors, name);
                const touched = getIn(form.touched, name);
                return (
                    <FieldContainer
                        data-testid={name ? `form-field:${name}` : 'form-field'}
                        className={className}
                        name={name}
                        label={label}
                        tip={tip}
                        htmlFor={fieldId}
                        tipLocation={tipLocation}
                        touched={touched}
                        error={error}
                        type={type}>
                        <FormComponent
                            {...field}
                            {...props}
                            type={type}
                            id={fieldId}
                            invalid={error && touched}
                            onChange={value => {
                                form.setFieldValue(name, value);
                            }}
                        />
                    </FieldContainer>
                );
            }}
        </Field>
    );

    FieldComponent.propTypes = {
        className: PropTypes.string,
        label: PropTypes.string,
        tip: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        fieldId: PropTypes.string,
        tipLocation: PropTypes.oneOf(['above', 'below']),
    };

    FieldComponent.defaultProps = {
        className: undefined,
        label: undefined,
        tip: undefined,
        name: undefined,
        type: 'text',
        fieldId: undefined,
        tipLocation: 'below',
    };

    return FieldComponent;
};

export default {
    Input: generateField(Input),
    TextArea: generateField(TextArea),
};
