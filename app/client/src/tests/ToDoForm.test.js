import { render } from '@testing-library/react';

import { ReduxProvider } from './utils'
import { ToDoForm } from '../components/todo';

test('renders', () => {
  render(
    <ReduxProvider>
      <ToDoForm />
    </ReduxProvider>
  );
});
