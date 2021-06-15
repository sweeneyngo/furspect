import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StaticImage } from 'gatsby-plugin-image';
const Display = ({ file, url, width, height }) => {
    useEffect(() => {}, [file, width]);
    return (
        <div className="bg-gray-50 border-8 border-yellow-100 h-72 w-72 overflow-hidden flex items-center justify-center">
            {file && <img className="w-full" src={url} alt="Add an image!" />}
        </div>
    );
};

Display.propTypes = {
    file: PropTypes.object,
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
};

export default Display;
