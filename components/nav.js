import { useEffect } from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from 'tailwind.config.js';

import { navLinks } from 'config';
import { Logo, BurgerMenu } from 'components';
import { useMedia } from 'hooks';

const fullConfig = resolveConfig(tailwindConfig);

const colors = [
    [fullConfig.theme.colors.blue[400], fullConfig.theme.colors.blue[600]],
    [fullConfig.theme.colors.purple[300], fullConfig.theme.colors.purple[600]],
    [fullConfig.theme.colors.teal[300], fullConfig.theme.colors.teal[500]],
    [fullConfig.theme.colors.pink[300], fullConfig.theme.colors.pink[500]],
    [fullConfig.theme.colors.green[300], fullConfig.theme.colors.green[600]],
];

const Nav = ({ isHeader, className, isHome, isSideNav }) => {
    const controls = useAnimation();
    const { maxmd } = useMedia();

    const variants = {
        hidden: {
            opacity: 0,
            y: -50,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'tween',
                delay: isHome ? 2.2 : 0.8,
                duration: 0.8,
                ease: 'easeOut',
            },
        },
    };

    useEffect(() => {
        if (!isHeader && !isSideNav) {
            controls.start('visible');
        }
    }, [controls, isHeader, isSideNav]);

    const navClassName = cn('nav-container flex', className, {
        'justify-between items-center w-full h-full': isHeader,
        'flex flex-col items-center w-full h-full': isSideNav,
        'flex-col justify-end h-510px xl:h-400px relative mb-390px': !isHeader && !isSideNav,
    });

    const linksContainerClassName = cn('text-white font-bold uppercase ', {
        'text-lg leading-none flex justify-end items-center p-8 pr-12': isHeader,
        'text-lg leading-none flex flex-col justify-center items-center h-full': isSideNav,
        'text-3xl xl:text-2xl leading-snug': !isHeader && !isSideNav,
    });

    const navLinkComponents = navLinks.map((el, i) => {
        const navLinkClassName = cn(
            'opacity-90 transition-ease nav-list-item w-max-content flex flex-col text-white',
            {
                'ml-6': isHeader,
                'mb-4 text-2xl p-4': isSideNav,
            },
        );
        return (
            <motion.li
                key={uuidv4()}
                onHoverStart={() => {
                    controls.start({
                        '--nav-background-color-1': colors[i + 1][0],
                        '--nav-background-color-2': colors[i + 1][1],
                        transition: {
                            duration: 0.25,
                            ease: 'easeOut',
                        },
                    });
                }}
                onHoverEnd={() =>
                    controls.start({
                        '--nav-background-color-1': colors[0][0],
                        '--nav-background-color-2': colors[0][1],
                        transition: {
                            duration: 0.25,
                            ease: 'easeOut',
                        },
                    })
                }>
                <Link href={el.url}>
                    <a className={navLinkClassName}>{el.name}</a>
                </Link>
            </motion.li>
        );
    });

    if (isSideNav) {
        return (
            <motion.nav className={navClassName} animate={controls}>
                <ul className={linksContainerClassName}>{navLinkComponents}</ul>
            </motion.nav>
        );
    }

    if (isHeader) {
        return (
            <motion.nav className={navClassName} animate={controls}>
                <Logo className="ml-6" />
                {maxmd ? (
                    <BurgerMenu isHeader />
                ) : (
                    <ul className={linksContainerClassName}>{navLinkComponents}</ul>
                )}
            </motion.nav>
        );
    }

    return (
        <motion.div
            className={navClassName}
            initial="hidden"
            animate={controls}
            variants={variants}>
            <nav className="absolute bottom-100px left-80px xl:left-60px xl:bottom-80px lg:left-70px lg:bottom-80px">
                <ul className={linksContainerClassName}>{navLinkComponents}</ul>
            </nav>
        </motion.div>
    );
};

Nav.propsTypes = {
    isHeader: false,
    isHome: false,
    isSideNav: false,
};

export default Nav;
