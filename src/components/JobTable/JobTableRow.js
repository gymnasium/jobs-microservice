import React from 'react';
import PropTypes from 'prop-types';

const JobTableRow = ({ job }) => {
  if (!job) return null;

  return (
    <li className="job-post">
      <h3 className="job-title"><a href="https://aquent.com/find-work/?k=&amp;l=all&amp;ux=on#content">Mid / Senior UX Designer</a></h3>
      <p className="job-market">Greater Boston Area</p>
      <div className="job-link">
        <a href="https://aquent.com/find-work/?k=&amp;l=all&amp;ux=on#content" target="_blank" rel="noopener noreferrer">
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
