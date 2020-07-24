import PropTypes from 'prop-types';
import cn from 'classnames';

const Logo = ({ className }) => {
    const newClassName = cn(
        'flex justify-center items-center uppercase text-2xl font-bold',
        className,
    );
    return (
        <div className={newClassName}>
            <span className="text-grey-cool-900 rounded-50% h-10 w-10  bg-white flex justify-center items-center mr-2">
                XY
            </span>
            <span className="text-3xl text-white"> Digital</span>
        </div>
    );
};

Logo.propTypes = {
    className: PropTypes.string,
};
Logo.defaultProps = {
    className: undefined,
};

export default Logo;
