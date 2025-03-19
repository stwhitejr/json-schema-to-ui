import {screen, render, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import meta, {Demo} from '../stories/Basic.stories';
import {composeStory} from '@storybook/react';

const Story = composeStory(Demo, meta);

jest.spyOn(global.console, 'log');

describe('JsonToUi Unit Tests', () => {
  beforeEach(() => {
    render(<Story />);
  });
  it('should render the json to the page using the supplied components', () => {
    // Number components
    expect(screen.getAllByText('Id')).toHaveLength(3);
    expect(screen.getByDisplayValue(1)).toBeInTheDocument();
    expect(screen.getByDisplayValue(2)).toBeInTheDocument();
    expect(screen.getByDisplayValue(3)).toBeInTheDocument();
    expect(screen.getAllByTestId('NumberComponent')).toHaveLength(3);

    // String Components
    expect(screen.getAllByText('Name')).toHaveLength(3);
    expect(screen.getByDisplayValue('Steve')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Bob')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Alice')).toBeInTheDocument();
    expect(screen.getAllByTestId('StringComponent')).toHaveLength(3);

    // Boolean Components
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Sms')).toBeInTheDocument();
    expect(screen.getByTitle('email')).toBeChecked();
    expect(screen.getByTitle('sms')).not.toBeChecked();
    expect(screen.getAllByTestId('BooleanComponent')).toHaveLength(2);

    // Null Components
    expect(screen.getByText('null')).toBeInTheDocument();
    expect(screen.getByText('ThisFieldIsNull')).toBeInTheDocument();
    expect(screen.getByTestId('NullComponent')).toBeInTheDocument();

    // Object Components
    expect(screen.getByText('Preferences')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getAllByTestId('ObjectComponent')).toHaveLength(4);

    // Array Components
    expect(screen.getByText('Friends')).toBeInTheDocument();
    expect(screen.getByTestId('ArrayComponent')).toBeInTheDocument();
    expect(screen.getAllByTestId('ArrayItemComponent')).toHaveLength(2);
  });
  it('should update values and debounce callback', async () => {
    userEvent.type(screen.getByDisplayValue(1), '2');
    expect(await screen.findByDisplayValue(12)).toBeInTheDocument();
    await waitFor(() =>
      expect(console.log).toHaveBeenCalledWith({
        id: 12,
        name: 'Steve',
        thisFieldIsNull: null,
        preferences: {theme: 'dark', notifications: {email: true, sms: false}},
        friends: [
          {id: 2, name: 'Bob'},
          {id: 3, name: 'Alice'},
        ],
      })
    );

    userEvent.type(screen.getByDisplayValue('Steve'), 'n');
    expect(await screen.findByDisplayValue('Steven')).toBeInTheDocument();
    await waitFor(() =>
      expect(console.log).toHaveBeenCalledWith({
        id: 12,
        name: 'Steven',
        thisFieldIsNull: null,
        preferences: {theme: 'dark', notifications: {email: true, sms: false}},
        friends: [
          {id: 2, name: 'Bob'},
          {id: 3, name: 'Alice'},
        ],
      })
    );

    userEvent.click(screen.getByTitle('email'));
    userEvent.click(screen.getByTitle('sms'));
    await waitFor(() => {
      expect(screen.getByTitle('email')).not.toBeChecked();
      expect(screen.getByTitle('sms')).toBeChecked();
    });
    await waitFor(() =>
      expect(console.log).toHaveBeenCalledWith({
        id: 12,
        name: 'Steven',
        thisFieldIsNull: null,
        preferences: {theme: 'dark', notifications: {email: false, sms: true}},
        friends: [
          {id: 2, name: 'Bob'},
          {id: 3, name: 'Alice'},
        ],
      })
    );

    userEvent.selectOptions(screen.getByRole('combobox'), 'light');
    await waitFor(() => {
      expect(screen.queryByTitle('dark')).not.toBeInTheDocument();
      expect(screen.getByText('light')).toBeInTheDocument();
    });
    await waitFor(() =>
      expect(console.log).toHaveBeenCalledWith({
        id: 12,
        name: 'Steven',
        thisFieldIsNull: null,
        preferences: {
          theme: 'light',
          notifications: {email: false, sms: true},
        },
        friends: [
          {id: 2, name: 'Bob'},
          {id: 3, name: 'Alice'},
        ],
      })
    );

    userEvent.click(screen.getAllByText('Add New Property')[0]);
    expect(await screen.findByText('NewField')).toBeInTheDocument();
    expect(await screen.findByDisplayValue('hello world')).toBeInTheDocument();
    await waitFor(() =>
      expect(console.log).toHaveBeenCalledWith({
        id: 12,
        name: 'Steven',
        thisFieldIsNull: null,
        preferences: {
          theme: 'light',
          notifications: {email: false, sms: true, newField: 'hello world'},
        },
        friends: [
          {id: 2, name: 'Bob'},
          {id: 3, name: 'Alice'},
        ],
      })
    );

    userEvent.click(screen.getAllByText('Delete Item')[0]);
    await waitFor(() => {
      expect(screen.queryByDisplayValue('Bob')).not.toBeInTheDocument();
    });
    await waitFor(() =>
      expect(console.log).toHaveBeenCalledWith({
        id: 12,
        name: 'Steven',
        thisFieldIsNull: null,
        preferences: {
          theme: 'light',
          notifications: {email: false, sms: true, newField: 'hello world'},
        },
        friends: [{id: 3, name: 'Alice'}],
      })
    );

    userEvent.click(screen.getByText('Add Array Item'));
    expect(await screen.findByDisplayValue('New Item')).toBeInTheDocument();
    await waitFor(() =>
      expect(console.log).toHaveBeenCalledWith({
        id: 12,
        name: 'Steven',
        thisFieldIsNull: null,
        preferences: {
          theme: 'light',
          notifications: {email: false, sms: true, newField: 'hello world'},
        },
        friends: [{id: 3, name: 'Alice'}, 'New Item'],
      })
    );
  });
});
