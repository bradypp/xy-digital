import PropTypes from 'prop-types';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

import { Icon } from 'components';

const Team = ({ data }) => (
    <section id="team" className="flex items-center flex-col container-inner bg-white">
        <h3 className="title-section p-12">Team</h3>
        <div className="grid grid-cols-5 gap-4 container-inner bg-white">
            {data.map(el => (
                <div key={uuidv4()} className="h-54 relative bg-gray-900 group">
                    <img
                        className="group-hover:blur transition-ease opacity-80 group-hover:opacity-50"
                        src={el.node.image.url}
                        alt={el.node.image.alt}
                    />
                    <div className="engulf group-hover:opacity-0 transform group-hover:translate-y-8 p-6 text-white z-20 transition-ease flex flex-col justify-end">
                        <h3 className="title-primary text-2xl pb-1">{el.node.name}</h3>
                        <p className="font-tertiary">{el.node.role}</p>
                    </div>
                    <div className="engulf opacity-0 group-hover:opacity-100 transform -translate-y-8 group-hover:translate-y-0 p-6 text-white z-20 transition-ease">
                        <h3 className="title-primary text-2xl pb-2">Projects</h3>
                        <ul>
                            {el.node.projects.map(el => (
                                <li key={uuidv4()} className="pb-1 flex items-center">
                                    <Icon className="w-5 h-5 mr-2" name="arrow-right" />
                                    <Link href={el.project._meta.uid}>
                                        <a className="inline-link font-tertiary text-sm text-blue-400">
                                            {el.project.title[0].text}
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

Team.propTypes = {
    data: PropTypes.array.isRequired,
};

export default Team;
