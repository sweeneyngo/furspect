import React, { useState } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const Display = ({ route, name, style }) => {
    return (
        <div className="bg-gray-50 border-8 border-yellow-100 h-72 w-72 flex items-center justify-center">
            place an image!
        </div>
    );
};

Display.propTypes = {
    route: PropTypes.string,
    name: PropTypes.string,
    style: PropTypes.string,
};

export default Display;
