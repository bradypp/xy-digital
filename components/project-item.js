import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { Tag } from 'components';

const ProjectItem = ({ featured_image, titleText, tags, subtitle }) => {
    return (
        <>
            <img
                className="engulf object-cover transform  scale-105 group-hover:translate-x-3 opacity-70 transition-ease group-hover:opacity-50 origin-right"
                src={featured_image.url}
                alt={featured_image.alt}
            />
            <h3 className="title-main text-4xl text-white z-10 group-hover:translate-y-4 mb-3">
                {titleText}
            </h3>
            <ul className="flex justify-start items-center z-10">
                {tags.map(el => (
                    <Tag key={uuidv4()} tag={el.tag} />
                ))}
            </ul>
            <p className="z-10 font-secondary text-sm text-white mt-auto transform opacity-0 -translate-x-10 group-hover:translate-x-0 group-hover:opacity-100 transition-ease">
                {subtitle}
            </p>
        </>
    );
};

ProjectItem.propTypes = {
    featured_image: PropTypes.object.isRequired,
    titleText: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    subtitle: PropTypes.string.isRequired,
};

export default ProjectItem;
