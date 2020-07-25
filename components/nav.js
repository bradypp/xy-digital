import { useEffect } from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from 'tailwind.config.js';

import { navLinks } from 'config';
import { Logo } from 'components';

const fullConfig = resolveConfig(tailwindConfig);

const colors = [
    [fullConfig.theme.colors.blue[400], fullConfig.theme.colors.blue[600]],
    [fullConfig.theme.colors.purple[300], fullConfig.theme.colors.purple[600]],
    [fullConfig.theme.colors.teal[300], fullConfig.theme.colors.teal[500]],
    [fullConfig.theme.colors.pink[300], fullConfig.theme.colors.pink[500]],
    [fullConfig.theme.colors.green[300], fullConfig.theme.colors.green[600]],
];

const Nav = ({ isHeader, className, isHome }) => {
    const controls = useAnimation();

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
        controls.start('visible');
    }, [controls]);

    const navLinkComponents = navLinks.map((el, i) => {
        const navLinkClassName = cn(
            'opacity-90 transition-ease nav-list-item w-max-content flex flex-col text-white',
            { 'ml-6': isHeader },
        );
        return (
            <motion.li
                key={uuidv4()}
                className={navLinkClassName}
                onHoverStart={() =>
                    controls.start({
                        '--nav-background-color-1': colors[i + 1][0],
                        '--nav-background-color-2': colors[i + 1][1],
                        transition: {
                            duration: 0.25,
                            ease: 'easeOut',
                        },
                    })
                }
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
                    <a>{el.name}</a>
                </Link>
            </motion.li>
        );
    });

    const navClassName = cn('nav-container flex', className, {
        'justify-center items-center w-full h-full': isHeader,
        'flex-col justify-end h-510px relative mb-390px': !isHeader,
    });

    if (isHeader) {
        return (
            <motion.nav className={navClassName} animate={controls}>
                <Logo className="ml-6" />
                <ul className="text-lg text-white font-bold uppercase leading-none flex justify-end items-center w-full p-8 pr-12">
                    {navLinkComponents}
                </ul>
            </motion.nav>
        );
    }

    return (
        <motion.div
            className={navClassName}
            initial="hidden"
            animate={controls}
            variants={variants}>
            <nav className="absolute bottom-100px left-80px">
                <ul className="text-3xl text-white font-bold uppercase leading-snug">
                    {navLinkComponents}
                </ul>
            </nav>
        </motion.div>
    );
};

Nav.propsTypes = {
    isHeader: false,
    isHome: false,
};

export default Nav;
