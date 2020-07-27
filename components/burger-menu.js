import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { useOnOutsideClick } from 'hooks';
import { Nav } from 'components';

const BurgerMenu = ({ isHeader = false }) => {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const navRef = useRef();

    const handleSideNavOpen = () => {
        setIsSideNavOpen(!isSideNavOpen);
        document.body.classList.toggle('overflow-y-hidden');
    };

    useOnOutsideClick(navRef, isSideNavOpen, handleSideNavOpen);

    const commonBurgerClassNames = 'block transition-ease bg-white h-2px transform';

    const firstSpanClassName = cn(commonBurgerClassNames, {
        'translate-y-9px rotate-45 ': isSideNavOpen,
    });

    const secondSpanClassName = cn(commonBurgerClassNames, {
        'opacity-100': !isSideNavOpen,
        'opacity-0': isSideNavOpen,
    });

    const thirdSpanClassName = cn(commonBurgerClassNames, {
        '-translate-y-9px -rotate-45 ': isSideNavOpen,
    });

    const navContainerClassName = cn(
        'fixed top-0 right-0 h-screen w-3/4 z-40 xs:w-5/6 transform duration-400 ease-linear',
        {
            'translate-x-0 opacity-1': isSideNavOpen,
            ' translate-x-full opacity-0': !isSideNavOpen,
        },
    );

    const containerClassName = cn({
        'absolute top-10px right-10px': !isHeader,
        'mb-1 mr-10px': isHeader,
    });

    return (
        <div ref={navRef} className={containerClassName}>
            <div
                className="w-50px h-40px inline-flex flex-col justify-between p-10px clickable z-50 relative"
                onClick={handleSideNavOpen}>
                <span className={firstSpanClassName} />
                <span className={secondSpanClassName} />
                <span className={thirdSpanClassName} />
            </div>
            <div className={navContainerClassName}>
                <Nav isSideNav />
            </div>
        </div>
    );
};

BurgerMenu.propTypes = {
    isHeader: PropTypes.bool,
};

BurgerMenu.defaultProps = {
    isHeader: false,
};

export default BurgerMenu;
