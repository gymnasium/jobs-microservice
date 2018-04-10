import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

import {
  fetchJobsForMarket,
  generateUTMSlug,
  getMarketFromId,
  getMarketFromLatLong,
} from '../util/util';

import {
  JobListing,
  MarketDropdown,
} from './';

class JobList extends Component {
  constructor(props) {
    super(props);

    let latitude = 35.227087;   // lat for Charlotte
    let longitude = -80.843127; // long for Charlotte

    // check to see if lat and long are coming in through URL
    const { match } = props;
    let market;

    if (match && match.params) {
      if (
        match.params.latitude &&
        match.params.longitude
      ) {
        latitude = match.params.latitude;
        longitude = match.params.longitude;

        market = getMarketFromLatLong({
          latitude,
          longitude,
        });
      } else if (match.params.marketId) {
        market = getMarketFromId(match.params.marketId)
      }
    }

    this.state = {
      market,
      jobs: {},
    };

    fetchJobsForMarket(market.id).then(this.handleJobsLoaded);
  }

  handleJobsLoaded = jobs => {
    this.setState({
      jobs,
    });
  };

  handleMarketChanged = (market) => {
    if (market) {
      this.setState({
        market,
      });
      fetchJobsForMarket(market.id).then(this.handleJobsLoaded);
    }
  };

  render() {
    const {
      jobs,
      market,
    } = this.state;

    return (
      <div className="job-list">
        <p>Showing jobs for <em>{market.name}</em></p>
        <MarketDropdown
          initialMarketId={market.id}
          onMarketChanged={this.handleMarketChanged}
        />
        {map(jobs, (job, key) => <JobListing job={job} key={key} />)}
      </div>
    );
  }
}

JobList.propTypes = {
  match: PropTypes.shape({}),
};

export default JobList;
