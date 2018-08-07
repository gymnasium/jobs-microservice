import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  fetchJobsForMarket,
  getMarketFromURLParams,
} from '../../util/util';

import {
  JobList,
  JobTable,
} from '..';

class JobsView extends Component {
  constructor(props) {
    super(props);

    const { match } = props;

    const {
      latitude,
      longitude,
      marketId,
      view,
    } = match.params;

    const market = getMarketFromURLParams(
      marketId,
      latitude,
      longitude,
    );

    this.state = {
      initialMarket: market,
      loading: true,
      market,
      jobs: {},
      view,
    };

    this.searchForJobsAsync(market);
  }

  handleJobsLoaded = (jobs) => {
    this.setState({
      jobs,
      loading: false,
    });
  }

  searchForJobsAsync = (market) => {
    if (market) {
      this.setState({
        market,
        loading: true,
      });
      fetchJobsForMarket(market.id).then(this.handleJobsLoaded);
    }
  }

  render() {
    const {
      initialMarket,
      jobs,
      loading,
      market,
      view,
    } = this.state;

    switch (view) {
      case 'table':
        return (
          <JobTable
            initialMarket={initialMarket}
            jobs={jobs}
            market={market}
            refreshJobsList={this.searchForJobsAsync}
            loading={loading}
          />
        );
      default:
        return <JobList jobs={jobs} market={market} marketChanged={this.searchForJobsAsync} />;
    }
  }
}

JobsView.defaultProps = {
};

JobsView.propTypes = {
  match: PropTypes.shape({}).isRequired,
};

export default JobsView;
