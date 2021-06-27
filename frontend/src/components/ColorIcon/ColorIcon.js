import React from 'react';
import PropTypes from 'prop-types';
import {
    colorBox,
    colorIcon,
    colorBorder,
    colorAccent,
} from './colorIcon.module.css';
const ColorIcon = ({ color, select, handleClick }) => {
    return (
        <div className={colorBox} onClick={handleClick}>
            <div className={colorIcon}>
                <div
                    style={{
                        border: select === color ? '2px solid black' : '',
                    }}
                    className={colorBorder}
                ></div>
                <div
                    style={{ backgroundColor: color }}
                    className={colorAccent}
                ></div>
            </div>
        </div>
    );
};

ColorIcon.propTypes = {
    color: PropTypes.string,
    select: PropTypes.string,
    handleClick: PropTypes.func,
};
export default ColorIcon;
