import { Text, BlockQuote, ParallaxImage } from 'components/slices';

const SliceZone = ({ sliceZone }) =>
    sliceZone.map((slice, index) => {
        switch (slice.slice_type) {
            case 'image':
                return <ParallaxImage slice={slice} key={`slice-${index}`} />;
            case 'blockquote':
                return <BlockQuote slice={slice} key={`slice-${index}`} />;
            case 'text':
                return <Text slice={slice} key={`slice-${index}`} />;
            default:
                return null;
        }
    });

export default SliceZone;
