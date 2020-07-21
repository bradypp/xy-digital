import PropTypes from 'prop-types';
import Link from 'next/link';
import cn from 'classnames';

import { Icon } from 'components';

const Button = ({ children, className, href, icon, variant, ...props }) => {
    const btnClass = cn(
        'flex justify-center items-center clickable font-tertiary transition-ease w-min-content',
        {
            [className]: !!className,
            'rounded-3xl border border-grey-cool-800 text-xs opacity-70 px-6 h-10 group hover:opacity-100':
                variant === 'primary',
        },
    );
    const textClass = cn('w-max-content', {
        'pr-2': !!icon,
    });
    const iconClass = cn('h-4 w-4', {
        'transform transition-ease group-hover:translate-x-1': variant === 'primary',
    });

    return (
        <Link href={href}>
            <a {...props} className={btnClass}>
                <span className={textClass}>{children}</span>
                {icon && <Icon className={iconClass} name={icon} />}
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
