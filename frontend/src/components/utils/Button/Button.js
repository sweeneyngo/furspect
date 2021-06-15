import * as React from 'react';
import PropTypes from 'prop-types';

const Button = ({ name, color }) => {
    return (
        <div
            style={{ backgroundColor: color }}
            className="w-36 h-12 text-xs shadow-md cursor-pointer hover:bg-blue-200 flex items-center justify-center text-white rounded-full"
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
