import { format } from 'date-fns';
import PropTypes from 'prop-types';

const Date = ({ dateString }) => {
    return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>;
};

Date.propTypes = {
    dateString: PropTypes.string.isRequired,
};

export default Date;
