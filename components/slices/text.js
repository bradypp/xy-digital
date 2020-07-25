import { RichText } from 'prismic-reactjs';

import { linkResolver, customLink } from 'utils/prismic';

// TODO: styling
const Text = ({ slice }) => (
    <div className="">
        <RichText
            render={slice.primary.text}
            linkResolver={linkResolver}
            serializeHyperlink={customLink}
        />
    </div>
);

export default Text;
