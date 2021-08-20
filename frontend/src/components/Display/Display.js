import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import Card from '../utils/Card/Card';
import Tooltip from '../utils/Tooltip/Tooltip';

const Display = ({ file, url, width, height, accuracy, handleClick }) => {
    return (
        <div className="w-full shadow-md rounded-b-lg">
            <Card
                file={file}
                url={url}
                name={file ? file.name : ''}
                width={width}
                height={height}
            />
            <Tooltip
                file={file}
                name={file ? file.name : ''}
                icon={faMinusCircle}
                accuracy={accuracy ? `${accuracy}` : ''}
                subcaption=""
                caption="delete!"
                handleClick={handleClick}
            />
        </div>
    );
};

Display.propTypes = {
    file: PropTypes.object,
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    accuracy: PropTypes.number,
    handleClick: PropTypes.func,
};

export default Display;
