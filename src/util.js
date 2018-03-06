const _ = require("lodash");

const { MARKETS } = require("./constants");
const { loadJobsForMarket } = require("./jobApi");

// return the cartesian distance between two lat/long points
const distanceBetweenPoints = (position1, position2) => {
  // set the lat and long coordinates on a 360 degree
  // scale, so that positions near 0 and 180 deg in
  // either direction wrap around correctly when
  // calculating distance.
  const lat1 = (position1.latitude + 180) % 360;
  const lat2 = (position2.latitude + 180) % 360;

  const long1 = (position1.longitude + 180) % 360;
  const long2 = (position2.longitude + 180) % 360;

  // cartesian distance formula in 2-dimensions
  const distance = Math.sqrt((lat2 - lat1) ** 2 + (long2 - long1) ** 2);

  return distance;
};

/**
 * Get locale nearest to the input position.
 * @param {*} postition - object containing lat and long for which we will retun the nearest locale
 * @returns object representing the market nearest to the lat/long pair
 */
const getMarketFromLatLong = postition => {
  let nearestDist = Infinity;
  let nearestMarket = null;

  _.forEach(MARKETS, market => {
    const dist = distanceBetweenPoints(postition, market.coords);
    if (dist < nearestDist) {
      nearestDist = dist;
      nearestMarket = market;
    }
  });

  return nearestMarket;
};

const fetchJobsForMarket = async (marketId, minorSegments = []) => {
  // make sure a marketId was supplied
  if (!marketId) return null;

  // make sure the input market is one that we know about
  if (!MARKETS[marketId]) return null;

  // go call the API for that market
  try {
    return await loadJobsForMarket(marketId, minorSegments);
  } catch (e) {
    console.error(e);
    return null;
  }
};

const generateUTMSlug = (
  utmCampaign = "job-module",
  utmSource = "thegymnasium.com",
  utmMedium = "web"
) => {
  const UTMSlug = `utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}`;
  return UTMSlug;
};

module.exports = {
  fetchJobsForMarket,
  generateUTMSlug,
  getMarketFromLatLong
};
