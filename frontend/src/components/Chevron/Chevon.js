import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Chevron = () => {
    return (
        <div
            data-testid="chevron"
            className="text-gray-500 my-1 text-xs flex flex-col items-center justify-center"
        >
            scroll down
            <div className="pb-0 text-gray-400">
                <FontAwesomeIcon icon={faChevronDown} />
            </div>
        </div>
    );
};

export default Chevron;
