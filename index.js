const express = require("express");
const ReactDOMServer = require("react-dom/server");
const _ = require("lodash");

const JobListing = require("./src/components/JobListing");

const { fetchJobsForMarket, getMarketFromLatLong } = require("./src/util");

/*
input config: {
  market: {
    ID: 10,         // market ID is used if provided, fallback is lat/long
    coords: {
      latitude: 1,  // used as fallback if market is not provided
      longitude: 1, // used as fallback if market is not provided
    }
  },
  minorSegment: [], // list of minor segments to search for,
  page: 0,          // [default is 0] results page to return
  pageSize: 10,     // [default is 10] number of results per page
} 
*/

const loadJobs = config => {
  // step 1: determine the location for which we are returning job listings
  // if no market is provided, and no lat/long is provided, we will return listings for all markets
  let targetMarket;
  if (config.market) {
    if (config.market.ID) {
      targetMarket = config.market.ID;
    } else if (config.market.coords) {
      const { coords } = config.market;
      if (coords.latitude && coords.longitude) {
        targetMarket = getMarketFromLatLong(coords);
      }
    }
  }

  // step 2: given a market, fire off API call for jobs of minorSegment supplied
  // use fetch() here
  const jobs = fetchJobsForMarket(targetMarket.id);

  // step 3: return JSON object with job listings
  return jobs;
};

const app = express();

app.get("/", async (req, res) => {
  const jobs = await loadJobs({
    market: {
      coords: {
        latitude: 35.227087,
        longitude: -80.843127
      }
    }
  });

  const jobListings = _.map(jobs, job => new JobListing({ job }));

  res.send(ReactDOMServer.renderToString(jobListings));
});

app.listen(3000);
