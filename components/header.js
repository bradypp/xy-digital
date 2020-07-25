import { useEffect, useState } from 'react';
import cn from 'classnames';

import { Nav } from 'components';
import { throttle } from 'utils/javascript';

const Header = () => {
    const [isHeaderDown, setIsHeaderDown] = useState(false);
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

        window.addEventListener('scroll', () => throttle(handleScroll(), 100));

        return () => {
            window.removeEventListener('scroll', () => throttle(handleScroll(), 100));
        };
    }, [isHeaderDown]);

    const className = cn(
        'w-screen h-16 fixed top-0 left-0 z-30 flex items-center transform transition-ease',
        {
            'translate-y-0': isHeaderDown,
            '-translate-y-full': !isHeaderDown,
        },
    );

    return (
        <header className={className}>
            <Nav isHeader />
        </header>
    );
};

export default Header;
