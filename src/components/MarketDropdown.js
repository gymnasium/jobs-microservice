import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map, sortBy } from 'lodash';

import { getMarketFromId } from '../util/util';
import { MARKETS } from '../util/constants';

class MarketDropdown extends Component {
  constructor(props) {
    super(props);

    const { initialMarketId } = props;

    const market = getMarketFromId(initialMarketId);

    this.state = {
      marketId: initialMarketId,
      market,
    };
  }

  handleMarketChanged = () => {
    const selectedIndex = this.marketDropdown.selectedIndex;
    const marketId = this.marketDropdown.options[selectedIndex].value;
    const market = getMarketFromId(marketId);

    this.setState({
      marketId,
      market,
    });
  }

  handleViewJobsClicked = (event) => {
    const { onViewJobsClicked } = this.props;
    const { market } = this.state;

    if (event && event.preventDefault) {
      event.preventDefault();
    }

    if (onViewJobsClicked && typeof onViewJobsClicked === 'function') {
      onViewJobsClicked(market);
    }
  }

  render() {
    const {
      marketId,
    } = this.state;

    return (
      <React.Fragment>
        <select
          onChange={this.handleMarketChanged}
          value={marketId}
          ref={(el) => { this.marketDropdown = el}}
        >
          {map(
            sortBy(MARKETS, ['name']
          ), (market) => {
            return (
              <option
                key={market.id}
                value={market.id}
              >
                {market.name}
              </option>
            );
          })}
        </select>
        <button
          className="gym-button"
          id="view-jobs-button"
          onClick={this.handleViewJobsClicked}
        >
          <b>View Jobs</b>
        </button>
      </React.Fragment>
    );
  }
};

MarketDropdown.propTypes = {
  initialMarketId: PropTypes.number,
  onViewJobsClicked: PropTypes.func,
};

MarketDropdown.defaultProps = {
  initialMarketId: 10,
};

export default MarketDropdown;