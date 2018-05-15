import React from 'react';
import PropTypes from 'prop-types';

import './GymButton.css';

const GymButton = (props) => {
  const {
    children,
    className,
    ...rest
  } = props;

  return (
    <button
      className={`gym-microservice-gym-button ${className}`}
      {...rest}
    >
      <b>{children}</b>
    </button>
  );
};

GymButton.defaultProps = {
  children: null,
  className: null,
};

GymButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default GymButton;

