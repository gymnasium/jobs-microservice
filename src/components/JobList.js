import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

import {
  fetchJobsForMarket,
  getMarketFromId,
  getMarketFromLatLong,
} from '../util/util';

import { MARKETS } from '../util/constants';

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
    let market = MARKETS[10];

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
    
    if (market && market.id) {
      fetchJobsForMarket(market.id).then(this.handleJobsLoaded);
    }
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
      <article id="find-work" className="job-list">
        <header>
          <h2>Find Work</h2>
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
              {map(jobs, (job, key) => <JobListing job={job} key={key} />)}
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
        <div className="note" role="note">
          <p>
            <small>
              <b>Find Work</b> is powered by <a href="https://aquent.com/find-work/">Aquent</a>, a leading talent agency, and maker of awesomely free courses from <a href="https://thegymnasium.com">Gymnasium</a>.
            </small>
          </p>
        </div>
      </article>
    );
  }
}

JobList.propTypes = {
  match: PropTypes.shape({}),
};

export default JobList;
