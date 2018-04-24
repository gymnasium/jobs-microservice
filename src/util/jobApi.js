import fetch from 'isomorphic-fetch';

export const loadJobsForMarket = (
  marketId,
  // minorSegments = [],
  limit = 20,
  page = 0
) =>
  new Promise((res, reject) => {
    const apiUrl = `https://aquent.com/api/content/render/false/type/json/query/+contentType:AquentJob%20+AquentJob.isPosted:true%20+languageId:1%20+deleted:false%20+working:true%20+AquentJob.locationId:${marketId}/orderby/AquentJob.postedDate%20desc/limit/${limit}/offset/${page}`;

    fetch(
      apiUrl,
      {
        contentType: "application/json",
        dataType: "jsonp"
      }
    ).then((response) => {
      if (response.status <= 200) {
        return response.text()
      } else {
        console.error('an error has occurred.');
      }
    }).then((body) => {
      const jobs = JSON.parse(body).contentlets;
      res(jobs);
    });
  });
