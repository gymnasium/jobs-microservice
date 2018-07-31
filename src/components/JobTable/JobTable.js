import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

// our components
import { MarketDropdown } from '..';
import JobTableRow from './JobTableRow';

// css for this component
import './JobTable.css';

const JobTable = (props) => {
  const { jobs } = props;

  if (!jobs) {
    return (
      <div />
    );
  }

  return (
    <div className="section-content">
      <header>
        <h2>
          UX Jobs
        </h2>
      </header>
      <form method="get" id="find-jobs">
        <div className="select-search">
          <MarketDropdown />
          <button
            type="button"
            className="gym-button"
            id="view-jobs-button"
          >
            <b id="view-jobs-search">
              Find UX Jobs
            </b>
            <b id="view-jobs-status">
              Loading…
            </b>
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
  );
};

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
  jobs: PropTypes.shape({}),
};

export default JobTable;
