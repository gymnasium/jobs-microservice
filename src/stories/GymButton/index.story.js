import React from 'react';

/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
/* eslint-enable import/no-extraneous-dependencies */

import { GymButton } from '../../components';

storiesOf('GymButton', module)
  .add('button', () => (
    <GymButton
      className="testing-with-classes"
      onClick={action('clicked')}
    >
      Join
    </GymButton>
  ))
  .add('with some emoji', () => (
    <GymButton
      onClick={action('clicked')}
      className="testing-with-classes"
    >
      June!
      {' '}
      <span role="img" aria-label="join!">
        🚀
      </span>
    </GymButton>
  ));
