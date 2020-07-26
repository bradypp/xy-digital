import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import media from 'utils/media';

const Media = ({ children, maxWidth, minWidth }) => {
    if (!maxWidth && !minWidth) return children;
    return (
        <MediaQuery maxWidth={media[maxWidth]} minWidth={media[minWidth]}>
            {children}
        </MediaQuery>
    );
};

Media.propTypes = {
    children: PropTypes.node.isRequired,
    maxWidth: PropTypes.string,
    minWidth: PropTypes.string,
};

Media.defaultProps = {
    maxWidth: undefined,
    minWidth: undefined,
};

export default Media;
