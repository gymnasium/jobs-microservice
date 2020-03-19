import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map, sortBy } from 'lodash';

import { MARKETS, REMOTE_MARKET } from '../../util/constants';

// CSS
import './MarketDropdown.css';

class MarketDropdown extends Component {
  constructor(props) {
    super(props);
    // this.handleMarketChanged = this.handleMarketChanged.bind(this);
    // this.handleViewJobsClicked = this.handleViewJobsClicked.bind(this);

    const { initialMarketId } = props;

    this.state = {
      marketId: initialMarketId,
    };
  }

  handleMarketChanged = () => {
    const { onMarketChanged } = this.props;
    const { selectedIndex } = this.marketDropdown;
    if (!selectedIndex) return;

    const marketId = this.marketDropdown.options[selectedIndex].value;

    this.setState({
      marketId,
    });

    if (onMarketChanged && typeof onMarketChanged === 'function') {
      onMarketChanged(marketId);
    }
  };

  render() {
    const { marketId } = this.state;

    return (
      <>
        {/* eslint-disable jsx-a11y/label-has-associated-control */}
        <label
          id="market-label"
          className="visuallyhidden"
          htmlFor="market"
          aria-label="Choose a Location"
        />
        {/* eslint-enable jsx-a11y/label-has-associated-control */}
        <select
          id="market"
          name="market"
          required
          className="form-control"
          onChange={this.handleMarketChanged}
          value={marketId}
          ref={(el) => {
            this.marketDropdown = el;
          }}
        >
          <option value="" disabled>
            Select a location:
          </option>
          <option value="" disabled>
            ——————
          </option>
          <option value={REMOTE_MARKET.id}>{REMOTE_MARKET.name}</option>
          <option value="" disabled>
            ——————
          </option>
          {map(sortBy(MARKETS, ['name']), (market) => {
            // we rendered "remote" above, so don't include it in this list
            if (market.id === REMOTE_MARKET.id) return null;
            return (
              <option key={market.id} value={market.id}>
                {market.name}
              </option>
            );
          })}
        </select>
      </>
    );
  }
}

MarketDropdown.propTypes = {
  initialMarketId: PropTypes.number,
  onMarketChanged: PropTypes.func,
};

MarketDropdown.defaultProps = {
  initialMarketId: REMOTE_MARKET.id,
  onMarketChanged: () => null,
};

export default MarketDropdown;
