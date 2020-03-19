import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

// our components
import { ErrorBoundary, MarketDropdown } from '..';
import JobTableRow from './JobTableRow';

import CONSTANTS from '../../util/constants';
import * as UTIL from '../../util/util';

// css for this component
import './JobTable.css';

const JobTable = (props) => {
  const { initialMarket, jobs, loading, refreshJobsList } = props;

  const [market, setMarket] = useState(initialMarket);

  return (
    <div className="content-wrapper">
      <section className="section">
        <div className="section-content">
          <form method="get" id="find-jobs">
            <div className="select-search">
              <ErrorBoundary>
                <MarketDropdown
                  initialMarketId={
                    initialMarket.id || CONSTANTS.DEFAULT_MARKET.id
                  }
                  market={market}
                  onMarketChanged={(marketId) => {
                    setMarket(UTIL.getMarketFromId(marketId));
                  }}
                />
              </ErrorBoundary>
              <button
                disabled={loading}
                type="button"
                className="gym-button"
                id="view-jobs-button"
                onClick={() => refreshJobsList(market)}
              >
                {!loading ? (
                  <b id="view-jobs-search">Find Jobs</b>
                ) : (
                  <b id="view-jobs-status">Loading…</b>
                )}
              </button>
            </div>
            <div id="view-jobs-results">
              <div className="col">
                <ul>
                  {map(jobs, (job, idx) => (
                    <JobTableRow job={job} key={`job-table-row-${idx}`} />
                  ))}
                </ul>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

JobTable.defaultProps = {
  jobs: {},
};

JobTable.propTypes = {
  initialMarket: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  jobs: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.arrayOf(PropTypes.shape({})),
  ]),
  loading: PropTypes.bool.isRequired,

  refreshJobsList: PropTypes.func.isRequired,
};

export default JobTable;
