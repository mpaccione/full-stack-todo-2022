import { render } from '@testing-library/react';

import { ReduxProvider } from './utils'
import { seedJson } from '../../../server/src/utils'
import { Table } from '@mui/material';
import ToDoDragAndDrop from '../components/todo/ToDoDragAndDrop';

const props = {
    filteredTodos: JSON.parse(JSON.stringify(seedJson[0])).items,
    list: JSON.parse(JSON.stringify(seedJson[0]))
}

test('renders', () => {
  render(
    <ReduxProvider>
        <Table>
            <ToDoDragAndDrop {...props} />
        </Table>
    </ReduxProvider>
  );
});
