import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { motion, useTransform } from 'framer-motion';

const Projects = ({ data, scrollY }) => {
    const colors = [
        'blue-700',
        'pink-700',
        'red-700',
        'teal-700',
        'yellow-700',
        'purple-700',
        'indigo-700',
        'green-700',
    ];
    const gridAreas = [
        'col-start-1 col-end-3',
        'col-start-3 col-end-4',
        'col-start-4 col-end-5',
        'col-start-1 col-end-2 row-start-2 row-end-4',
        'col-start-2 col-end-4',
        'col-start-4 col-end-5',
        'col-start-2 col-end-3',
        'col-start-3 col-end-4',
        'col-start-4 col-end-5 row-start-3 row-end-5',
        'col-start-1 col-end-2',
        'col-start-2 col-end-4',
        'col-start-1 col-end-3',
        'col-start-3 col-end-5',
    ];

    const projectsRef = useRef();
    const [projectsOffsetTop, setProjectsOffsetTop] = useState(0);
    const projectsY = useTransform(
        scrollY,
        [projectsOffsetTop - 500, projectsOffsetTop],
        [0, -100],
    );

    useEffect(() => {
        setProjectsOffsetTop(projectsRef.current.offsetTop);
    }, []);

    return (
        <motion.section
            id="projects"
            ref={projectsRef}
            className="flex items-center flex-col container-inner bg-white z-10"
            style={{ y: projectsY }}>
            <h2 className="title-section p-12">Our Work</h2>
            <div className="grid grid-cols-4 gap-1">
                {data.map((el, i) => {
                    const backgroundClassName = cn(
                        `engulf opacity-30 z-10 group-hover:opacity-0 transition-ease bg-${
                            colors[i % colors.length]
                        }`,
                    );
                    const containerClassName = cn(
                        `relative min-h-84 overflow-hidden group flex flex-col justify-start p-8 bg-gray-900 ${
                            gridAreas[i % 13]
                        }`,
                    );
                    return (
                        <Link key={uuidv4()} href={el.node._meta.uid}>
                            <a className={containerClassName}>
                                <div className={backgroundClassName} />
                                <img
                                    className="engulf object-cover transform scale-110 group-hover:translate-x-3 group-hover:scale-105 transition-ease group-hover:opacity-50 origin-bottom-right"
                                    src={el.node.featured_image.url}
                                    alt={el.node.featured_image.alt}
                                />
                                <h3 className="title-primary text-4xl text-white z-10 group-hover:translate-y-4 mb-3">
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