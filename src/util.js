const _ = require("lodash");

const { MARKETS } = require("./constants");
const { loadJobsForMarket } = require("./jobApi");

// return the cartesian distance between two lat/long points
/**
 * Returns the cartesian distance between two geographic points.
 * @param {*} position1 a position object in the form { latitude, longitude }
 * @param {*} position2 a position object in the form { latitude, longitude }
 */
const distanceBetweenPoints = (position1, position2) => {
  if (!position1 || !position2) {
    throw new Error(
      "Two positions need to be provided to calculate a distance"
    );
  }

  if (
    !position1.latitude ||
    !position1.longitude ||
    !position2.latitude ||
    !position2.longitude
  ) {
    throw new Error(
      "both input coordinates must have a latitude and longitude specified."
    );
  }

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
  distanceBetweenPoints,
  fetchJobsForMarket,
  generateUTMSlug,
  getMarketFromLatLong
};
