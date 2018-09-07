import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
  }

  componentDidCatch(error, info) {
    // an error occured, set state accoringly
    this.setState({
      hasError: true,
      error,
    });

    console.log('caught error');
    console.dir(error);
    console.table(info);
  }

  render() {
    const { children } = this.props;
    const {
      error,
      hasError,
    } = this.state;

    // detect whether an error has occured
    // if we are in an error state, return errorUI
    if (hasError) {
      return (
        <small>
          {`An error has occurred: ${error.message}`}
        </small>
      );
    }

    // no error, return children
    return children;
  }
}

ErrorBoundary.defaultProps = {
  children: null,
};

ErrorBoundary.propTypes = {
  children: PropTypes.node,
};

export default ErrorBoundary;
