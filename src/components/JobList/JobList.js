import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

import { JobListing, MarketDropdown } from '..';

import * as UTIL from '../../util/util';
import './JobList.css';

class JobList extends Component {
  requestMarketChanged = (marketId) => {
    const { marketChanged } = this.props;
    const market = UTIL.getMarketFromId(marketId);
    if (market) {
      marketChanged(market);
    }
  };

  render() {
    const { jobs, market } = this.props;

    return (
      <article
        id="gym-microservice-find-work"
        className="job-list container-fluid"
      >
        <header>
          <h2>Find Work.</h2>
          <p>Find work that best fits your skills, in your area.</p>
        </header>
        <form method="get" id="find-work-search">
          <div className="field select row">
            <MarketDropdown
              initialMarketId={market.id}
              onMarketChanged={this.requestMarketChanged}
            />
          </div>
          <section className="job-board">
            <h3 className="viewing-jobs-in">
              Viewing jobs in
              {' '}
              <var className="job-location">
                {market && market.name}
                {'…'}
              </var>
            </h3>
            <ul>
              {map(jobs, (job, key) => (
                <JobListing job={job} key={key} market={market} />
              ))}
            </ul>
            <div className="row">
              <a
                href={`http://aquent.com/find-work/?l=${market.id}#content?utm_source=gymnasium&utm_medium=web&utm_campaign=homepagejobs&utm_content=viewall`}
                className="view-all-jobs"
                target="_blank"
                rel="noopener noreferrer"
              >
                View all jobs in
                {' '}
                <var className="job-location">{market.name}</var>
                →
              </a>
            </div>
          </section>
        </form>
      </article>
    );
  }
}

JobList.propTypes = {
  jobs: PropTypes.oneOfType([
    PropTypes.shape(),
    PropTypes.arrayOf(PropTypes.shape({})),
  ]).isRequired,
  market: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    name: PropTypes.string,
  }).isRequired,
  marketChanged: PropTypes.func.isRequired,
};

export default JobList;
