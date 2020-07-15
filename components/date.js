import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { Date as PrismicDate } from 'prismic-reactjs';

const Date = ({ dateString }) => {
    const date = PrismicDate(dateString);
    return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>;
};

Date.propTypes = {
    dateString: PropTypes.string.isRequired,
};

export default Date;
