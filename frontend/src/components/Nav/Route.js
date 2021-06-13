import React, { useState } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const Route = ({ route, name, style }) => {
    return (
        <Link to={route} className={style}>
            {name}
        </Link>
    );
};

Route.propTypes = {
    route: PropTypes.string,
    name: PropTypes.string,
    style: PropTypes.string,
};

export default Route;
