const fetch = require("fetch");
const _ = require("lodash");

const apiCallback = response => {
  const jobs = response.contentlets;
  _.each(jobs, job => {
    console.log(job);
  });
};

const loadJobsForMarket = (
  marketId,
  // minorSegments = [],
  limit = 20,
  page = 0
) =>
  new Promise((res, reject) => {
    const apiUrl = `https://aquent.com/api/content/render/false/type/json/query/+contentType:AquentJob%20+AquentJob.isPosted:true%20+languageId:1%20+deleted:false%20+working:true%20+AquentJob.locationId:${marketId}/orderby/AquentJob.postedDate%20desc/limit/${limit}/offset/${page}`;

    fetch.fetchUrl(
      apiUrl,
      {
        contentType: "application/json",
        dataType: "jsonp"
      },
      (error, meta, body) => {
        if (error) {
          reject(error);
        }
        console.dir(meta);
        const bodyContents = body.toString("utf-8");
        const bodyJSON = JSON.parse(bodyContents);
        res(bodyJSON.contentlets);
      }
    );
  });

module.exports = {
  apiCallback,
  loadJobsForMarket
};
