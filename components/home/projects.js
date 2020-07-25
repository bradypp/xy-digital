import PropTypes from 'prop-types';
import Link from 'next/link';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';

import { FadeUp } from 'components';
import { SectionHeading } from 'components/home';
import { useParallaxScroll } from 'hooks';

import { linkResolver, hrefResolver } from 'utils/prismic';

const gridAreas = [
    'col-start-1 col-end-3',
    'col-start-3 col-end-4',
    'col-start-4 col-end-5',
    'col-start-1 col-end-2',
    'col-start-2 col-end-4',
    'col-start-4 col-end-5 ',
    'col-start-1 col-end-2',
    'col-start-2 col-end-3',
    'col-start-3 col-end-5',
];

const Projects = ({ data, scrollY }) => {
    const [projectsRef, projectsY, projectsTop] = useParallaxScroll(scrollY, -1000, 0, 50, -150);

    return (
        <motion.section
            id="projects"
            ref={projectsRef}
            className="container-inner bg-white z-20 -mb-24"
            style={{ y: projectsY }}>
            <FadeUp className="flex items-center flex-col relative">
                <SectionHeading scrollY={scrollY} elementTop={projectsTop}>
                    Our Work
                </SectionHeading>
                <motion.div className="grid grid-cols-4 gap-1">
                    {data.map((el, i) => {
                        const { _meta, featured_image, title, tags, subtitle } = el.node;
                        const containerClassName = cn(
                            `relative overflow-hidden min-h-84 h-84 group flex flex-col justify-start p-8 bg-grey-cool-900 clickable ${
                                gridAreas[i % 9]
                            }`,
                        );

                        return (
                            <Link
                                key={uuidv4()}
                                as={linkResolver(_meta)}
                                href={hrefResolver(_meta)}>
                                <FadeUp as="a" delay={(i % 3) * 0.3} className={containerClassName}>
                                    <img
                                        className="engulf object-cover transform  scale-105 group-hover:translate-x-3 opacity-70 transition-ease group-hover:opacity-50 origin-right"
                                        src={featured_image.url}
                                        alt={featured_image.alt}
                                    />
                                    <h3 className="title-main text-4xl text-white z-10 group-hover:translate-y-4 mb-3">
                                        {title[0].text}
                                    </h3>
                                    <ul className="flex justify-start items-center z-10">
                                        {tags.map(el => (
                                            <li key={uuidv4()} className="tag">
                                                {el.tag}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="z-10 font-secondary text-sm text-white mt-auto transform opacity-0 -translate-x-10 group-hover:translate-x-0 group-hover:opacity-100 transition-ease">
                                        {subtitle}
                                    </p>
                                </FadeUp>
                            </Link>
                        );
                    })}
                </motion.div>
            </FadeUp>
        </motion.section>
    );
};

Projects.propTypes = {
    data: PropTypes.array.isRequired,
    scrollY: PropTypes.object.isRequired,
};

export default Projects;
