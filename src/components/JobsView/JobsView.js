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

    this.handleJobsLoaded = this.handleJobsLoaded.bind(this);
    this.handleMarketChanged = this.handleMarketChanged.bind(this);

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
      market,
      jobs: {},
      view,
    };

    if (market && market.id) {
      fetchJobsForMarket(market.id).then(this.handleJobsLoaded);
    }
  }

  handleJobsLoaded(jobs) {
    this.setState({
      jobs,
    });
  }

  handleMarketChanged(market) {
    if (market) {
      this.setState({
        market,
      });
      fetchJobsForMarket(market.id).then(this.handleJobsLoaded);
    }
  }

  render() {
    const {
      market,
      jobs,
      view,
    } = this.state;

    switch (view) {
      case 'table':
        return <JobTable jobs={jobs} market={market} marketChanged={this.handleMarketChanged} />;
      default:
        return <JobList jobs={jobs} market={market} marketChanged={this.handleMarketChanged} />;
    }
  }
}

JobsView.defaultProps = {
};

JobsView.propTypes = {
  match: PropTypes.shape({}).isRequired,
};

export default JobsView;
