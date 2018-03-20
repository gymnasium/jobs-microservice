/* eslint-disable react/no-danger */
const React = require("react");
const PropTypes = require("prop-types");

const { generateUTMSlug } = require("../util");

const generateURLForJob = props => {
  const { campaign, job } = props;
  return `https://aquent.com/find-work/${job.jobId}?${generateUTMSlug(
    campaign
  )}`;
};

const JobListing = props => {
  const { job } = props;

  if (!job) {
    return null;
  }

  return (
    <div>
      <h1>{job.title}</h1>
      <a href={generateURLForJob(props)} target="_blank">
        {job.jobId}
      </a>
      <p
        dangerouslySetInnerHTML={{
          __html: job.description
        }}
      />
    </div>
  );
};

JobListing.defaultProps = {
  campaign: "job-module",
  job: null
};

JobListing.propTypes = {
  campaign: PropTypes.string,
  job: PropTypes.shape({
    description: PropTypes.string,
    jobId: PropTypes.string,
    title: PropTypes.string
  })
};

module.exports = JobListing;
