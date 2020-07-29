import PropTypes from 'prop-types';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { RichText } from 'prismic-reactjs';
import cn from 'classnames';

import { FadeUp, ProjectItem } from 'components';
import { linkResolver, hrefResolver } from 'utils/prismic';
import { useMedia } from 'hooks';

const MorePosts = ({ morePosts }) => {
    const { minmdMaxlg, maxmd } = useMedia();
    const className = cn(
        `w-screen bg-navy px-16 pt-16 pb-4 grid grid-cols-${morePosts?.length} lg:grid-cols-1 gap-6 xl:px-10 md:px-6`,
    );
    return (
        <>
            {morePosts?.length > 0 && (
                <section className={className}>
                    {morePosts.map((el, i) => {
                        const { title, featured_image, subtitle, _meta, tags } = el.node;
                        const titleText = RichText.asText(title);
                        return (
                            <Link
                                key={uuidv4()}
                                as={linkResolver(_meta)}
                                href={hrefResolver(_meta)}>
                                <FadeUp
                                    as="a"
                                    delay={minmdMaxlg || maxmd ? 0 : i * 0.3}
                                    className="relative overflow-hidden min-h-84 h-84 group flex flex-col justify-start p-8 bg-grey-cool-900 clickable">
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
                </section>
            )}
        </>
    );
};

MorePosts.propTypes = {
    morePosts: PropTypes.array,
};

MorePosts.defaultProps = {
    morePosts: undefined,
};

export default MorePosts;
