import Link from 'next/link';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';

import { socials, navLinks } from 'config';
import { Icon, Logo, ClientOnly } from 'components';

const Footer = () => {
    const colors = [
        'text-blue-500',
        'text-purple-500',
        'text-teal-500',
        'text-orange-500',
        'text-pink-500',
    ];
    return (
        <footer className="py-16 w-screen bg-navy font-tertiary flex flex-col items-center justify-center text-sm text-grey-cool-300">
            <Logo className="pb-10" />
            <ul className="flex pb-10 justify-center w-full">
                {navLinks.map(el => (
                    <li
                        key={uuidv4()}
                        className="w-6 h-6 mx-3 min-w-max-content text-base inline-link text-grey-cool-300">
                        <Link href={el.url}>
                            <a>{el.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>
            <ul className="flex pb-10 justify-center w-full">
                <ClientOnly>
                    {socials.map((el, i) => {
                        const iconClassName = cn(`transition-ease group-hover:${colors[i]}`);
                        return (
                            <li key={uuidv4()} className="w-6 h-6 mx-3 group">
                                <a rel="noreferrer noopener nofollow" target="_blank" href={el.url}>
                                    <Icon className={iconClassName} name={el.name} />
                                </a>
                            </li>
                        );
                    })}
                </ClientOnly>
            </ul>
            <p className="pb-2">&copy; XY Digital, Inc. All rights reserved.</p>
            <p>
                Designed and developed by{' '}
                <a
                    className="inline-link text-grey-cool-300"
                    rel="noreferrer noopener"
                    target="_blank"
                    href="https://paulbrady.dev">
                    Paul Brady
                </a>
            </p>
        </footer>
    );
};

export default Footer;
