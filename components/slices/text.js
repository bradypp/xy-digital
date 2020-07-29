import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';

import { linkResolver, customLink } from 'utils/prismic';

const Text = ({ slice }) => (
    <div className="container-inner prose sm:prose-sm bg-white z-20 p-32 relative lg:p-24 md:p-16 sm:p-8 xs:px-4 whitespace-normal overflow-hidden">
        <RichText
            render={slice.primary.text}
            linkResolver={linkResolver}
            serializeHyperlink={customLink}
        />
    </div>
);

Text.propTypes = {
    slice: PropTypes.object.isRequired,
};

export default Text;
