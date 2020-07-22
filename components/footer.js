import Link from 'next/link';
import cn from 'classnames';

import { socials, navLinks } from 'config';
import { Icon } from 'components';

// TODO: add logo, change name
const Footer = () => {
    const colors = [
        'text-blue-500',
        'text-purple-500',
        'text-teal-500',
        'text-orange-500',
        'text-pink-500',
    ];
    return (
        <footer className="p-16 w-screen bg-footer font-tertiary flex flex-col items-center justify-center text-sm text-grey-cool-300">
            <div className="flex pb-6">
                {navLinks.map(el => (
                    <Link href={el.url}>
                        <a className="w-6 h-6 mx-3 min-w-max-content text-base inline-link text-grey-cool-300">
                            {el.name}
                        </a>
                    </Link>
                ))}
            </div>
            <div className="flex pb-6">
                {socials.map((el, i) => {
                    const iconClassName = cn(`group-hover:${colors[i]}`);
                    return (
                        <a
                            className="w-6 h-6 mx-3 group"
                            rel="noreferrer noopener nofollow"
                            target="_blank"
                            href={el.url}>
                            <Icon className={iconClassName} name={el.name} />
                        </a>
                    );
                })}
            </div>
            <p className="pb-2">&copy; Digital Agency, Inc. All rights reserved.</p>
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
