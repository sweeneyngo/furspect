import React from 'react';
import PropTypes from 'prop-types';
import {
    circularChart,
    circleBg,
    circle,
    percentage,
} from '../../components/Layout/layout.module.css';
const Spinner = ({ acc }) => {
    return (
        <svg
            viewBox="0 0 36 36"
            style={{ stroke: 'rgba(156, 163, 175, 1)' }}
            className={circularChart}
        >
            <path
                className={circleBg}
                d="M18 2.0845
a 15.9155 15.9155 0 0 1 0 31.831
a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
                className={circle}
                strokeDasharray={`${acc}, 100`}
                d="M18 2.0845
a 15.9155 15.9155 0 0 1 0 31.831
a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text
                x={acc.toFixed(0) >= 10 ? '13.5' : '15'}
                y="20.35"
                className={percentage}
            >
                {acc.toFixed(2).slice(0, acc.toFixed(2).indexOf('.'))}
            </text>
            <text
                x={acc.toFixed(0) >= 10 ? '19' : '17'}
                y="20.35"
                style={{
                    stroke: 'none',
                    fontSize: '0.25rem',
                    fill: 'rgba(156, 163, 175, 1)',
                }}
            >
                {acc.toFixed(2).slice(acc.toFixed(2).indexOf('.'))}%
            </text>
        </svg>
    );
};

Spinner.propTypes = {
    acc: PropTypes.number,
};
export default Spinner;
