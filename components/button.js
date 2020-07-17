import PropTypes from 'prop-types';
import Link from 'next/link';
import cn from 'classnames';

import { Icon } from 'components';

const Button = ({ children, className, href, icon, variant, ...props }) => {
    const btnClass = cn(
        'flex justify-center items-center clickable font-tertiary transition-ease',
        {
            [className]: !!className,
            'rounded-3xl border border-white text-xs opacity-70 px-6 h-10 group hover:opacity-100':
                variant === 'primary',
            classes: variant === 'secondary',
        },
    );
    const textClass = cn('text-white w-max-content', {
        'pr-2': !!icon,
    });
    const iconClass = cn('h-4 w-4 text-white', {
        'transform transition-ease group-hover:translate-x-1': variant === 'primary',
    });

    return (
        <Link href={href}>
            <a {...props} className={btnClass}>
                <span className={textClass}>{children}</span>
                <Icon className={iconClass} name={icon} />
            </a>
        </Link>
    );
};

Button.propTypes = {
    href: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary']),
    children: PropTypes.node,
    className: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

Button.defaultProps = {
    className: undefined,
    variant: 'primary',
    children: undefined,
    icon: undefined,
};

export default Button;
