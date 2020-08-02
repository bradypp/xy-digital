import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const FieldContainer = ({
    className,
    children,
    label,
    tip,
    touched,
    error,
    name,
    htmlFor,
    tipLocation,
    ...props
}) => {
    const isError = touched && error;
    const newClassName = cn('w-full mb-6', className);
    return (
        <div
            className={newClassName}
            data-testid={name ? `form-field:${name}` : 'form-field'}
            {...props}>
            {label && (
                <label
                    className="block pb-2 text-sm font-tertiary w-max-content font-semibold"
                    htmlFor={htmlFor}>
                    {label}
                </label>
            )}
            {tip && tipLocation === 'above' && (
                <p
                    className="text-xs font-tertiary pb-2 text-grey-cool-600"
                    tipLocation={tipLocation}>
                    {tip}
                </p>
            )}
            {children}
            {!isError && tip && tipLocation === 'below' && (
                <p
                    className="text-xs font-tertiary pt-1 text-grey-cool-600"
                    tipLocation={tipLocation}>
                    {tip}
                </p>
            )}
            {isError && typeof error === 'string' && (
                <p className="text-red-600 text-xs font-tertiary pt-1">{error}</p>
            )}
        </div>
    );
};

FieldContainer.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    label: PropTypes.string,
    tip: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    htmlFor: PropTypes.string,
    tipLocation: PropTypes.string,
    touched: PropTypes.bool,
    error: PropTypes.string,
};

FieldContainer.defaultProps = {
    className: undefined,
    label: undefined,
    tip: undefined,
    name: undefined,
    type: 'text',
    htmlFor: undefined,
    tipLocation: undefined,
    touched: undefined,
    error: undefined,
};

export default FieldContainer;
