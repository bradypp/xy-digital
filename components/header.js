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

    // const { scrollY } = useViewportScroll();
    // const headerY = useTransform(scrollY, scrollY => {
    //     if (scrollY > distanceFromTopRequired) return 0;
    //     return '-100%';
    // });

    return (
        <header className={className}>
            <Logo className="w-2/7 h-full bg-grey-900" />
            <Nav className="w-5/7 h-full justify-end" isHeader />
        </header>
    );
};

export default Header;
