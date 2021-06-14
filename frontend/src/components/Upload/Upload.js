import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '../utils/Button/Button';
const Upload = ({ handleClick }) => {
    return <Button handleClick={handleClick} name="Upload" color="#ffae42" />;
};

Upload.propTypes = {
    handleClick: PropTypes.func,
};

export default Upload;
