import React from 'react';
import { animatedCircle } from './radial.module.css';

const Radial = () => {
    return (
        <>
            <div
                className={animatedCircle}
                style={{ animationDelay: '0s' }}
            ></div>
            <div
                className={animatedCircle}
                style={{ animationDelay: '1s' }}
            ></div>
            <div
                className={animatedCircle}
                style={{ animationDelay: '2s' }}
            ></div>
            <div
                className={animatedCircle}
                style={{ animationDelay: '3s' }}
            ></div>
        </>
    );
};

export default Radial;
