import React from 'react';
import PropTypes from 'prop-types';
import { tooltipStyles, tooltipText } from './tooltip.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Tooltip = ({ file, name, icon, subcaption, caption }) => {
    return (
        <div className="flex items-center px-2 justify-between bg-gray-200 inset-x-0 bottom-0 h-10 rounded-b-lg">
            <div className="flex items-center w-40 justify-begin">
                <p className="text-gray-400 bold text-xs truncate">
                    {file && name}
                </p>
            </div>

            <span className="text-sm text-gray-500">{subcaption}</span>
            <div className={tooltipStyles}>
                <FontAwesomeIcon
                    className="text-gray-400 hover:text-gray-400 cursor-pointer"
                    icon={icon}
                />
                <span className={tooltipText}>{caption}</span>
            </div>
        </div>
    );
};

Tooltip.propTypes = {
    file: PropTypes.object,
    name: PropTypes.string,
    icon: PropTypes.object,
    subcaption: PropTypes.string,
    caption: PropTypes.string,
};
export default Tooltip;
