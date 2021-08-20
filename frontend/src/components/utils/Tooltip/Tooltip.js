import React from 'react';
import PropTypes from 'prop-types';
import { tooltipStyles, tooltipText } from './tooltip.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Tooltip = ({
    file,
    name,
    icon,
    accuracy,
    subcaption,
    caption,
    handleClick,
}) => {
    return (
        <div className="grid grid-cols-4 items-center px-2 bg-gray-200 inset-x-0 bottom-0 h-10 rounded-b-lg">
            <div className="flex items-center justify-begin col-start-1 col-end-3">
                <p className="text-gray-400 bold text-xs truncate w-20">
                    {file && name}
                </p>
            </div>

            <div className="flex items-center text-xs text-gray-500 justify-end">
                {`${Number(accuracy).toFixed(2)}%`}
            </div>
            <div className="flex items-center justify-end">
                <div className="text-xs text-gray-500 px-1">{subcaption}</div>
                <div className={tooltipStyles}>
                    <FontAwesomeIcon
                        className="text-gray-400 hover:text-gray-400 cursor-pointer"
                        icon={icon}
                        onClick={handleClick}
                    />
                    <span className={tooltipText}>{caption}</span>
                </div>
            </div>
        </div>
    );
};

Tooltip.propTypes = {
    file: PropTypes.object,
    name: PropTypes.string,
    icon: PropTypes.object,
    accuracy: PropTypes.string,
    subcaption: PropTypes.string,
    caption: PropTypes.string,
    handleClick: PropTypes.func,
};
export default Tooltip;
