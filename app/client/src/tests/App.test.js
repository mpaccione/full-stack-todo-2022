import { render } from '@testing-library/react';

import { ReduxProvider } from './utils'
import App from '../App';

test('renders', () => {
  render(
    <ReduxProvider>
      <App />
    </ReduxProvider>
  );
});
