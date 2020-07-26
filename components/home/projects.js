import PropTypes from 'prop-types';
import Link from 'next/link';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';
import { RichText } from 'prismic-reactjs';

import { FadeUp, ProjectItem } from 'components';
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
            ref={projectsRef}
            className="container-inner bg-white z-20 -mb-24 relative"
            style={{ y: projectsY }}>
            <div id="projects" className="absolute -mt-80" />
            <FadeUp className="flex items-center flex-col relative">
                <SectionHeading scrollY={scrollY} elementTop={projectsTop}>
                    Our Work
                </SectionHeading>
                <motion.div className="grid grid-cols-4 gap-1">
                    {data.map((el, i) => {
                        const { _meta, featured_image, title, tags, subtitle } = el.node;
                        const titleText = RichText.asText(title);
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
                                    <ProjectItem
                                        featured_image={featured_image}
                                        subtitle={subtitle}
                                        tags={tags}
                                        titleText={titleText}
                                    />
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
