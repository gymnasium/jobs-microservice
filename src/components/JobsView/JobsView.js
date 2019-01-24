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

    const {
      minorSegment,
      majorSegment,
    } = parsed;

    this.state = {
      initialMarket: market,
      loading: true,
      options: {
        minorSegment,
        majorSegment,
      },
      market,
      jobs: {},
      view,
    };
  }

  componentDidMount() {
    const {
      options,
      market,
    } = this.state;

    this.searchForJobsAsync(market, options);
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
        options,
        loading: true,
      }, () => {
        const {
          market: mkt,
          options: opts,
        } = this.state;

        fetchJobsForMarket(mkt.id, opts).then(this.handleJobsLoaded);
      });
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
