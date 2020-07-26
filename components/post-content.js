import PropTypes from 'prop-types';
import { motion, useViewportScroll } from 'framer-motion';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import { HeroImage, Nav, Tag, Logo } from 'components';
import { SliceZone } from 'components/slices';
import { useParallaxScroll } from 'hooks';

const PostContent = ({
    titleText,
    subtitle,
    author,
    firstPublicationDate,
    featured_image,
    tags,
    body,
}) => {
    const { scrollY } = useViewportScroll();
    const [navRef, navY] = useParallaxScroll(scrollY, 0, 1200, '0%', '-28%');
    const [leftRef, leftElY] = useParallaxScroll(scrollY, 0, 1200, '0%', '-16%');

    return (
        <article>
            <div id="hero" className="relative h-900px -mb-32">
                <HeroImage scrollY={scrollY} src={featured_image.url} alt={featured_image.alt} />
                <div className="container-inner flex">
                    <motion.div
                        className="flex flex-col relative w-2/3 z-10 pr-24"
                        initial={{
                            opacity: 0,
                            x: -50,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                type: 'tween',
                                delay: 0.4,
                                duration: 0.8,
                                ease: 'easeOut',
                            },
                        }}
                        ref={leftRef}
                        style={{ y: leftElY }}>
                        <motion.div
                            className="self-start pt-8 pb-16"
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    type: 'tween',
                                    delay: 1.2,
                                    duration: 0.6,
                                    ease: 'easeOut',
                                },
                            }}>
                            <Logo />
                        </motion.div>
                        <h1 className="title-main pb-4">{titleText}</h1>
                        <p className="text-white font-secondary text-2xl italic pb-2">{subtitle}</p>
                        {author && (
                            <p className="text-white font-secondary pb-2">
                                By {author} on{' '}
                                <date>{format(new Date(firstPublicationDate), 'dd/MM/yyyy')}</date>
                            </p>
                        )}
                        <ul className="flex justify-start items-center z-10">
                            {tags.map(el => (
                                <Tag key={uuidv4()} tag={el.tag} variant="large" />
                            ))}
                        </ul>
                    </motion.div>
                    <motion.div
                        className="relative w-1/3 z-10"
                        ref={navRef}
                        initial={{ y: 0 }}
                        style={{ y: navY }}>
                        <Nav />
                    </motion.div>
                </div>
            </div>
            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                    transition: {
                        type: 'tween',
                        delay: 1,
                        duration: 0.6,
                        ease: 'easeOut',
                    },
                }}>
                <SliceZone sliceZone={body} scrollY={scrollY} />
            </motion.div>
        </article>
    );
};

PostContent.propTypes = {
    titleText: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    firstPublicationDate: PropTypes.string.isRequired,
    featured_image: PropTypes.object.isRequired,
    tags: PropTypes.array.isRequired,
    body: PropTypes.array.isRequired,
    author: PropTypes.string,
};

PostContent.defaultProps = {
    author: undefined,
};

export default PostContent;
