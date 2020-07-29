import PropTypes from 'prop-types';
import Link from 'next/link';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';
import { RichText } from 'prismic-reactjs';

import { FadeUp, ProjectItem } from 'components';
import { SectionHeading } from 'components/home';
import { useParallaxScroll, useMedia } from 'hooks';
import { linkResolver, hrefResolver } from 'utils/prismic';

const Projects = ({ data, scrollY }) => {
    const { min2xl, minxlMax2xl, minlgMaxxl, maxmd, minmdMaxlg, minsmMaxmd } = useMedia();

    const [projectsRef, projectsY] = useParallaxScroll(scrollY, -1000, 0, 50, maxmd ? 0 : -150);

    const gridAreas1 = [
        'col-start-1 col-end-3',
        'col-start-3 col-end-4',
        'col-start-4 col-end-5',
        'col-start-1 col-end-2',
        'col-start-2 col-end-4',
        'col-start-4 col-end-5',
        'col-start-1 col-end-2',
        'col-start-2 col-end-3',
        'col-start-3 col-end-5',
    ];
    const gridAreas2 = [
        'col-start-1 col-end-5',
        'col-start-5 col-end-7',
        'col-start-1 col-end-4',
        'col-start-4 col-end-7',
        'col-start-1 col-end-3',
        'col-start-3 col-end-7',
    ];
    const gridAreas3 = ['col-start-1 col-end-4', 'col-start-4 col-end-7'];

    return (
        <motion.section
            ref={projectsRef}
            className="container-inner bg-white z-20 -mb-24 md:mb-0 relative"
            style={{ y: projectsY }}>
            <div id="projects" className="absolute -mt-64" />
            <FadeUp className="flex items-center flex-col relative">
                <SectionHeading>Our Work</SectionHeading>
                <motion.div className="grid grid-cols-4 xl:grid-cols-6 gap-1 w-full">
                    {data.map((el, i) => {
                        const { _meta, featured_image, title, tags, subtitle } = el.node;
                        const titleText = RichText.asText(title);
                        const delay = () => {
                            if (min2xl || minxlMax2xl) return (i % 3) * 0.3;
                            if (minmdMaxlg || minsmMaxmd || minlgMaxxl) return (i % 2) * 0.3;
                        };
                        const containerClassName = cn(
                            `relative overflow-hidden min-h-84 h-84 lg:min-h-64 lg:h-64 group flex flex-col justify-start p-8 bg-grey-cool-900 clickable ${
                                min2xl || minxlMax2xl
                                    ? gridAreas1[i % 9]
                                    : minmdMaxlg || minlgMaxxl
                                    ? gridAreas2[i % 6]
                                    : minsmMaxmd
                                    ? gridAreas3[i % 2]
                                    : 'col-start-1 col-end-7'
                            }`,
                        );
                        return (
                            <Link
                                key={uuidv4()}
                                as={linkResolver(_meta)}
                                href={hrefResolver(_meta)}>
                                <FadeUp as="a" delay={delay()} className={containerClassName}>
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
