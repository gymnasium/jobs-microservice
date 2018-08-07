import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

// our components
import { MarketDropdown } from '..';
import JobTableRow from './JobTableRow';

import CONSTANTS from '../../util/constants';
import * as UTIL from '../../util/util';

// css for this component
import './JobTable.css';

class JobTable extends Component {
  constructor(props) {
    super(props);

    const { initialMarket } = this.props;

    this.state = {
      market: initialMarket,
    };
  }

  handleFindJobsClicked = (event) => {
    const { refreshJobsList } = this.props;
    const { market } = this.state;

    refreshJobsList(market);
  }

  handleMarketChanged = (marketId) => {
    const market = UTIL.getMarketFromId(marketId);

    this.setState({
      market,
    });
  }

  render() {
    const {
      initialMarket,
      jobs,
      loading,
    } = this.props;

    const { market } = this.state;

    if (!jobs) {
      return (
        <div />
      );
    }

    return (
      <div className="content-wrapper">
        <section className="section">
          <div className="section-content">
            <header>
              <h2>
                UX Jobs
              </h2>
            </header>
            <form method="get" id="find-jobs">
              <div className="select-search">
                <MarketDropdown
                  initialMarketId={initialMarket.id || CONSTANTS.DEFAULT_MARKET.id}
                  market={market}
                  onMarketChanged={this.handleMarketChanged}
                />
                <button
                  disabled={loading}
                  type="button"
                  className="gym-button"
                  id="view-jobs-button"
                  onClick={this.handleFindJobsClicked}
                >
                  {!loading ? (
                    <b id="view-jobs-search">
                      Find UX Jobs
                    </b>
                  ) : (
                    <b id="view-jobs-status">
                      Loading…
                    </b>
                  )}
                </button>
              </div>
              <div id="view-jobs-results">
                <div className="col">
                  <ul>
                    {map(jobs, (job, idx) => <JobTableRow job={job} key={`job-table-row-${idx}`} />)}
                  </ul>
                </div>
                <div className="cta" role="presentation">
                  <a className="gym-button" href="https://aquent.com/find-work/?k=&amp;l=all&amp;ux=on#content" title="Find Work — Aquent" target="_blank" rel="noopener noreferrer">
                    <b>
                      View More Jobs
                    </b>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

JobTable.defaultProps = {
  jobs: {
    1: {
      name: 'hi',
    },
    2: {
      name: 'hello',
    },
  },
};

JobTable.propTypes = {
  initialMarket: PropTypes.shape({}).isRequired,
  jobs: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.arrayOf(PropTypes.shape({})),
  ]),
  loading: PropTypes.bool.isRequired,

  refreshJobsList: PropTypes.func.isRequired,
};

export default JobTable;
