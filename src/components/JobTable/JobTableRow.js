import React from 'react';
import PropTypes from 'prop-types';

import { generateUTMSlug } from '../../util/util';

const JobTableRow = ({ job }) => {
  if (!job) return null;

  const jobURL = `https://aquent.com/find-work/${
    job.jobId
  }#content?${generateUTMSlug()}`;

  return (
    <li className="job-post">
      <h3 className="job-title">
        <a href={jobURL} target="_blank" rel="noopener noreferrer">
          {job.title}
        </a>
      </h3>
      <p className="job-market">{job.marketId}</p>
      <div className="job-link">
        <a href={jobURL} target="_blank" rel="noopener noreferrer">
          <b>Learn More</b>
        </a>
      </div>
    </li>
  );
};

JobTableRow.defaultProps = {
  job: {},
};

JobTableRow.propTypes = {
  job: PropTypes.shape({}),
};

export default JobTableRow;
