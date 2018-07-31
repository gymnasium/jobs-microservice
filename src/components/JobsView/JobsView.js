import React, { Component } from 'react';

class JobsView extends Component {
  state = {
    jobs: [],
  };

  loadJobs() {
    this.setState({
      jobs: [],
    });
  }

  render() {
    const { jobs } = this.state;

    return (
      <div>
        {jobs}
      </div>
    );
  }
}

JobsView.defaultProps = {
};

JobsView.propTypes = {
};

export default JobsView;
