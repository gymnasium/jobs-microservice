import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

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
    const { onMarketChanged } = this.props;
    if (onMarketChanged && typeof onMarketChanged === 'function') {
      
      const selectedIndex = this.marketDropdown.selectedIndex;
      const marketId = this.marketDropdown.options[selectedIndex].value;
      
      const market = getMarketFromId(marketId);
      onMarketChanged(market);
    }
  }

  render() {
    const {
      marketId,
    } = this.state;

    return (
      <select
        value={marketId}
        onChange={this.handleMarketChanged}
        ref={(el) => { this.marketDropdown = el}}
      >
        {map(MARKETS, (market) => {
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
    );
  }
};

MarketDropdown.propTypes = {
  initialMarketId: PropTypes.number,
  onMarketChanged: PropTypes.func,
};

MarketDropdown.defaultProps = {
  initialMarketId: 10,
};

export default MarketDropdown;