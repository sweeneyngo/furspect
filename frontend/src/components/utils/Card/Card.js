import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    cardZoom,
    cardZoomImage,
    cardOverlay,
    cardIcon,
    cardModal,
    cardClose,
    cardContent,
    cardCaption,
} from './card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons';
const Card = ({ file, url, name, width, height }) => {
    const [image, showImage] = useState(false);

    return (
        <div className={cardZoom}>
            <div className="overflow-hidden h-full w-full">
                {file && (
                    <img
                        className={cardZoomImage}
                        src={url}
                        alt="Add an image!"
                    />
                )}
                <div className={cardOverlay}>
                    <FontAwesomeIcon
                        className={cardIcon}
                        icon={faSearchPlus}
                        onClick={() => showImage(true)}
                    />
                </div>
                <div
                    id="myModal"
                    style={{
                        display: image ? 'block' : 'none',
                    }}
                    className={cardModal}
                >
                    <span
                        className={cardClose}
                        onClick={() => showImage(false)}
                    >
                        &times;
                    </span>
                    <img className={cardContent} src={url} alt="Modal image" />
                    <div className={cardCaption}>
                        {file && `${name} (${width}x${height})`}
                    </div>
                </div>
            </div>
        </div>
    );
};

Card.propTypes = {
    file: PropTypes.object,
    url: PropTypes.string,
    name: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
};

export default Card;
