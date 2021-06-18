import * as React from 'react';
import PropTypes from 'prop-types';

const Button = ({ name, color }) => {
    return (
        <div
            className={`w-36 h-12 text-xs shadow-md bg-gray-${color} hover:bg-gray-400 transition duration-300 ease-in-out cursor-pointer flex items-center justify-center text-white rounded-full`}
        >
            {name}
        </div>
    );
};

Button.propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
};

export default Button;
