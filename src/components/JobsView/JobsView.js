import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';

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

    const {
      location,
      match,
    } = props;

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

    const parsed = qs.parse(location.search);

    // convert url params from underscore separated to camel case
    // forex: minor_segment to minorSegment
    const {
      minor_segment: minorSegment,
      major_segment: majorSegment,
    } = parsed;

    this.state = {
      initialMarket: market,
      loading: true,
      minorSegment,
      majorSegment,
      market,
      jobs: {},
      view,
    };
  }

  componentDidMount() {
    const {
      majorSegment,
      market,
      minorSegment,
    } = this.state;

    this.searchForJobsAsync(market, {
      majorSegment,
      minorSegment,
    });
  }

  handleJobsLoaded = (jobs) => {
    this.setState({
      jobs,
      loading: false,
    });
  }

  searchForJobsAsync = (market, options) => {
    if (market) {
      this.setState({
        market,
        ...options,
        loading: true,
      });
      fetchJobsForMarket(market.id, options).then(this.handleJobsLoaded);
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
        return (
          <JobList
            jobs={jobs}
            market={market}
            marketChanged={this.searchForJobsAsync}
          />
        );
    }
  }
}

JobsView.defaultProps = {
};

JobsView.propTypes = {
  match: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default JobsView;
