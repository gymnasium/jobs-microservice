const React = require("react");
const PropTypes = require("prop-types");

const JobListing = props => {
  console.log("here");
  const { job } = props;
  if (job) {
    console.dir(job);
  }

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.description}</p>
    </div>
  );
};

JobListing.defaultProps = {
  job: {}
};

JobListing.propTypes = {
  job: PropTypes.shape({})
};

module.exports = JobListing;
