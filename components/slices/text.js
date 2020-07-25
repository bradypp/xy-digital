import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';

import { linkResolver, customLink } from 'utils/prismic';

const Text = ({ slice }) => (
    <div className="container-inner prose bg-white z-20 p-32 relative">
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
