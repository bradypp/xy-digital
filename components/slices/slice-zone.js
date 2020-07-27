import PropTypes from 'prop-types';

import { Text, ParallaxImage } from 'components/slices';

const SliceZone = ({ sliceZone, scrollY }) =>
    sliceZone.map((slice, i) => {
        switch (slice.__typename) {
            case 'Blog_postBodyText':
            case 'ProjectBodyText':
                return <Text key={`slice-${i}`} slice={slice} />;
            case 'ProjectBodyParallax_image':
            case 'Blog_postBodyParallax_image': {
                const { url, alt } = slice.primary.parallax_image;
                return (
                    <ParallaxImage
                        key={`slice-${i}`}
                        className="h-800px -my-16 xl:h-650px"
                        src={url}
                        alt={alt}
                        scrollY={scrollY}
                    />
                );
            }
            default:
                return null;
        }
    });

SliceZone.propTypes = {
    sliceZone: PropTypes.array.isRequired,
    scrollY: PropTypes.object.isRequired,
};

export default SliceZone;
