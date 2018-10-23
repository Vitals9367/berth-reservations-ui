import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import RegisteredBoat from '../src/components/forms/RegisteredBoat';
import UnRegisteredBoat from '../src/components/forms/UnRegisteredBoat';

storiesOf('Forms', module)
  .add('RegisteredBoat', () => <RegisteredBoat onSubmit={action('Submit')} />)
  .add('UnRegisteredBoat', () => <UnRegisteredBoat onSubmit={action('Submit')} />);
