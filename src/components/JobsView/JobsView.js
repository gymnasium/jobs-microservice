import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';

import {
  fetchJobs,
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
    this.searchForJobsAsync();
  }

  handleJobsLoaded = (jobs) => {
    this.setState({
      jobs,
      loading: false,
    });
  }

  handleMarketChanged = (market) => {
    this.setState({ market });
  }

  searchForJobsAsync = async (marketOverride) => {
    const { market, options } = this.state;
    try {
      let marketId = market.id;
      if (marketOverride && marketOverride.id) {
        marketId = marketOverride.id;
        this.setState({ market: marketOverride });
      }

      const jobs = await fetchJobs(marketId, options);
      this.handleJobsLoaded(jobs);
    } catch (e) {
      console.log('error', e.message || e);
    }
    this.setState({ loading: false });
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
