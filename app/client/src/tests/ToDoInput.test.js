import { fireEvent, render } from '@testing-library/react';

import ToDoInput from '../components/todo/ToDoInput';

let inputVal = ''

const addTodo = jest.fn()

const setInputVal = (val) => {
    inputVal = val
}

test('displays correct inputVal state', () => {
    const { container, rerender } = render(
        <ToDoInput {...{ addTodo, inputVal, setInputVal }} />
    );
    const input = container.querySelector('input')

    expect(input.value).toEqual('')

    inputVal = 'test input'

    rerender(
        <ToDoInput {...{ addTodo, inputVal, setInputVal }} />
    )

    expect(input.value).toEqual('test input')
});


test('executes function on Enter key', () => {
    const { container } = render(
        <ToDoInput {...{ addTodo, inputVal, setInputVal }} />
    );
    const input = container.querySelector('input')

    fireEvent.keyPress(input, { charCode: 13, code: 13, key: 'Enter' })

    expect(addTodo).toHaveBeenCalled()
});
