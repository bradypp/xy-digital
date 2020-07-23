import PropTypes from 'prop-types';
import Link from 'next/link';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';

import { useParallaxScroll } from 'hooks';

const gridAreas = [
    'col-start-1 col-end-3',
    'col-start-3 col-end-4',
    'col-start-4 col-end-5',
    'col-start-1 col-end-2 row-start-2 row-end-4',
    'col-start-2 col-end-4',
    'col-start-4 col-end-5',
    'col-start-2 col-end-3',
    'col-start-3 col-end-4',
    'col-start-4 col-end-5',
    'col-start-1 col-end-2',
    'col-start-2 col-end-3',
    'col-start-3 col-end-5',
];

const Projects = ({ data, scrollY }) => {
    const [projectsRef, projectsY] = useParallaxScroll(scrollY, -1000, 0, 50, -150);

    return (
        <motion.section
            id="projects"
            ref={projectsRef}
            className="flex items-center flex-col container-inner bg-white z-10 relative -mb-24"
            style={{ y: projectsY }}>
            <h2 className="title-section text-4xl p-12">Our Work</h2>
            <div className="grid grid-cols-4 gap-1">
                {[...data, ...data, ...data, ...data, ...data, ...data].map((el, i) => {
                    const containerClassName = cn(
                        `relative min-h-84 overflow-hidden group flex flex-col justify-start p-8 bg-grey-cool-900 ${
                            gridAreas[i % 12]
                        }`,
                    );
                    return (
                        <Link key={uuidv4()} href={el.node._meta.uid}>
                            <a className={containerClassName}>
                                <img
                                    className="engulf object-cover transform  scale-105 group-hover:translate-x-3 opacity-70 transition-ease group-hover:opacity-50 origin-right"
                                    src={el.node.featured_image.url}
                                    alt={el.node.featured_image.alt}
                                />
                                <h3 className="title-heading text-4xl text-white z-10 group-hover:translate-y-4 mb-3">
                                    {el.node.title[0].text}
                                </h3>
                                <ul className="flex justify-start items-center z-10">
                                    {el.node.tags.map(el => (
                                        <li key={uuidv4()} className="tag">
                                            {el.tag}
                                        </li>
                                    ))}
                                </ul>
                                <p className="z-10 font-secondary text-sm text-white mt-auto transform opacity-0 -translate-x-10 group-hover:translate-x-0 group-hover:opacity-100 transition-ease">
                                    {el.node.subtitle}
                                </p>
                            </a>
                        </Link>
                    );
                })}
            </div>
        </motion.section>
    );
};

Projects.propTypes = {
    data: PropTypes.array.isRequired,
    scrollY: PropTypes.object.isRequired,
};

export default Projects;
