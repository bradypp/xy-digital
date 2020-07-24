import { useEffect, useState } from 'react';
import cn from 'classnames';

import { Logo, Nav } from 'components';
import { js } from 'utils';

const Header = () => {
    const [isHeaderDown, setIsHeaderDown] = useState(false);
    const distanceFromTopRequired = 800;

    const className = cn(
        'w-screen h-16 fixed top-0 left-0 z-30 flex items-center transform transition-ease',
        {
            'translate-y-0': isHeaderDown,
            '-translate-y-full': !isHeaderDown,
        },
    );

    useEffect(() => {
        const handleScroll = () => {
            const distanceFromTop = window.scrollY;
            if (distanceFromTop >= distanceFromTopRequired && !isHeaderDown) {
                setIsHeaderDown(true);
            } else if (distanceFromTop < distanceFromTopRequired && isHeaderDown) {
                setIsHeaderDown(false);
            }
        };

        window.addEventListener('scroll', () => js.throttle(handleScroll(), 100));

        return () => {
            window.removeEventListener('scroll', () => js.throttle(handleScroll(), 100));
        };
    }, [isHeaderDown]);

    return (
        <header className={className}>
            <Logo className="w-1/6 h-full bg-navy flex pl-8" />
            <Nav className="w-5/6 h-full justify-end" isHeader />
        </header>
    );
};

export default Header;
