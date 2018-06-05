import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

import {
  fetchJobsForMarket,
  getMarketFromId,
  getMarketFromLatLong,
} from '../../util/util';

import { MARKETS } from '../../util/constants';

import {
  JobListing,
  MarketDropdown,
} from '../';

import './JobList.css';

class JobList extends Component {
  constructor(props) {
    super(props);

    this.handleJobsLoaded = this.handleJobsLoaded.bind(this);
    this.handleMarketChanged = this.handleMarketChanged.bind(this);

    let latitude = 35.227087; // lat for Charlotte
    let longitude = -80.843127; // long for Charlotte

    // check to see if lat and long are coming in through URL
    const { match } = props;

    // choose boston as default market
    let market = MARKETS[10];

    if (match && match.params) {
      if (
        match.params.latitude &&
        match.params.longitude
      ) {
        /* eslint-disable prefer-destructuring */
        latitude = match.params.latitude;
        longitude = match.params.longitude;
        /* eslint-enable prefer-destructuring */

        market = getMarketFromLatLong({
          latitude,
          longitude,
        });
      } else if (match.params.marketId) {
        market = getMarketFromId(match.params.marketId);
      }
    }

    this.state = {
      market,
      jobs: {},
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
      jobs,
      market,
    } = this.state;

    return (
      <article id="gym-microservice-find-work" className="job-list">
        <header>
          <h2>Find Work.</h2>
          <p>Find work that best fits your skills, in your area.</p>
        </header>
        <form method="get" id="find-work-search">
          <div className="field select row">
            <MarketDropdown
              initialMarketId={market.id}
              onViewJobsClicked={this.handleMarketChanged}
            />
          </div>
          <section className="job-board">
            <h3 className="viewing-jobs-in">
              Viewing jobs in
              {' '}
              <var className="job-location">
                {market && market.name}{'…'}
              </var>
            </h3>
            <ul>
              {map(jobs, (job, key) => <JobListing job={job} key={key} market={market} />)}
            </ul>
            <div className="row">
              <a href={`http://aquent.com/find-work/?l=${market.id}&utm_source=gymnasium&utm_medium=web&utm_campaign=homepagejobs&utm_content=viewall`} className="view-all-jobs">
                View all jobs in
                {' '}
                <var className="job-location">
                  {market.name}
                </var>
                {' →'}
              </a>
            </div>
          </section>
        </form>
      </article>
    );
  }
}

JobList.propTypes = {
  match: PropTypes.shape({}).isRequired,
};

export default JobList;
