import * as React from 'react';
import PropTypes from 'prop-types';

const Button = ({ name, color, handleClick }) => {
    return (
        <div
            onClick={handleClick}
            style={{ backgroundColor: color }}
            className="w-36 h-12 cursor-pointer hover:bg-blue-200 flex items-center justify-center text-white rounded-full"
        >
            {name}
        </div>
    );
};

Button.propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
    handleClick: PropTypes.func,
};

export default Button;
