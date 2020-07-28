import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Nav, ClientOnly } from 'components';
import { throttle } from 'utils/javascript';

const Header = ({ isAlwaysDown }) => {
    const [isHeaderDown, setIsHeaderDown] = useState(isAlwaysDown);
    const distanceFromTopRequired = 800;

    useEffect(() => {
        const handleScroll = () => {
            const distanceFromTop = window.scrollY;
            if (distanceFromTop >= distanceFromTopRequired && !isHeaderDown) {
                setIsHeaderDown(true);
            } else if (distanceFromTop < distanceFromTopRequired && isHeaderDown) {
                setIsHeaderDown(false);
            }
        };

        window.addEventListener('scroll', () => !isAlwaysDown && throttle(handleScroll(), 100));

        return () => {
            window.removeEventListener(
                'scroll',
                () => !isAlwaysDown && throttle(handleScroll(), 100),
            );
        };
    }, [isAlwaysDown, isHeaderDown]);

    const className = cn(
        'w-screen h-16 fixed top-0 left-0 z-40 flex items-center transform transition-ease',
        {
            'translate-y-0': isHeaderDown,
            '-translate-y-full': !isHeaderDown,
        },
    );

    return (
        <ClientOnly>
            <header className={className}>
                <Nav isHeader />
            </header>
        </ClientOnly>
    );
};

Header.propTypes = {
    isAlwaysDown: PropTypes.bool,
};

Header.defaultProps = {
    isAlwaysDown: false,
};

export default Header;
