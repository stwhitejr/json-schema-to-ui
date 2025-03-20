import {useJsonToUiContext} from '../context';
import JsonToUi from '../index';
import type {Meta, StoryObj} from '@storybook/react';
import {produce} from 'immer';
import {useEffect, useRef, useState} from 'react';
import {set, unset, get} from 'lodash';

const capitalize = (string: string) => {
  const [firstLetter, ...rest] = string.split('');
  return `${firstLetter.toUpperCase()}${rest.join('')}`;
};

const Container = (props) => (
  <div
    data-testid={props.id}
    style={{
      ...props.schema?.ui?.styles,
      padding: '10px',
      ...(props.isComplexType
        ? {border: 'solid 1px #ddd', marginTop: '10px'}
        : {}),
    }}
  >
    {props.children}
  </div>
);

const Label = (props: {fieldName: string}) => (
  <label htmlFor={props.fieldName} style={{paddingRight: '10px'}}>
    {capitalize(props.fieldName)}
  </label>
);

const StringComponent = (props) => {
  const {onChange} = useJsonToUiContext();
  return (
    <Container id="StringComponent">
      <Label fieldName={props.fieldName} />
      <input
        type="string"
        name={props.fieldName}
        value={props.value}
        onChange={({target: {value}}) => onChange(props.path, value)}
      />
    </Container>
  );
};

const BooleanComponent = (props) => {
  const {onChange} = useJsonToUiContext();
  return (
    <Container id="BooleanComponent">
      <Label fieldName={props.fieldName} />
      <input
        title={props.fieldName}
        type="checkbox"
        name={props.fieldName}
        checked={props.value}
        onChange={({target: {checked}}) => onChange(props.path, checked)}
      />
    </Container>
  );
};
const NumberComponent = (props) => {
  const {onChange} = useJsonToUiContext();
  return (
    <Container id="NumberComponent">
      <Label fieldName={props.fieldName} />
      <input
        type="number"
        name={props.fieldName}
        value={props.value}
        onChange={({target: {value}}) =>
          onChange(props.path, parseInt(value, 10))
        }
      />
    </Container>
  );
};
const ObjectComponent = (props) => {
  const {onChange} = useJsonToUiContext();
  return (
    <Container id="ObjectComponent" isComplexType schema={props.schema}>
      <Label fieldName={props.fieldName} />
      <div>{props.children}</div>
      <div style={{paddingTop: '5px'}}>
        <button
          onClick={() =>
            onChange(props.path, {...props.value, newField: 'hello world'})
          }
        >
          Add New Property
        </button>
      </div>
    </Container>
  );
};
const ArrayComponent = (props) => {
  const {onChange} = useJsonToUiContext();
  return (
    <Container id="ArrayComponent" isComplexType>
      <Label fieldName={props.fieldName} />
      <div>{props.children}</div>
      <div style={{paddingTop: '5px'}}>
        <button
          onClick={() => onChange(props.path, props.value.concat('New Item'))}
        >
          Add Array Item
        </button>
      </div>
    </Container>
  );
};
const ArrayItemComponent = (props) => {
  const {onDelete} = useJsonToUiContext();
  return (
    <Container id="ArrayItemComponent">
      <button onClick={() => onDelete(props.path)}>Delete Item</button>
      <div>{props.children}</div>
    </Container>
  );
};
const NullComponent = (props) => {
  return (
    <Container id="NullComponent">
      <Label fieldName={props.fieldName} />
      <span>null</span>
    </Container>
  );
};

const Dropdown = (props) => {
  const {onChange} = useJsonToUiContext();
  const options = props.schema.ui.options;
  return (
    <Container id="Dropdown">
      <Label fieldName={props.fieldName} />
      <select
        name={props.fieldName}
        onChange={({target: {value}}) => onChange(props.path, value)}
      >
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </Container>
  );
};

const componentByTypeMapping = {
  string: StringComponent,
  boolean: BooleanComponent,
  number: NumberComponent,
  object: ObjectComponent,
  array: ArrayComponent,
  arrayItem: ArrayItemComponent,
  null: NullComponent,
};

const customComponentByTypeMapping = {
  Dropdown,
};

const Basic = (props) => {
  // You don't have to do this way but we're copying the value to local component state so that we can debounce the upstream update
  // This helps keep the JsonToUi components fast and controlled. You could use uncontrolled input components as well.
  const [value, setValue] = useState(props.value);
  const isFirstMount = useRef(true);

  // This will debounce the upstream update. This helps prevent a bunch of re-renders as the user types. You could even do this lower at the individual input component level.
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
    } else {
      const handler = setTimeout(() => {
        props.onChange(value);
      }, 250);
      return () => {
        clearTimeout(handler);
      };
    }
  }, [value]);

  return (
    <JsonToUi<{options?: string[]; styles?: React.CSSProperties}>
      componentByTypeMapping={componentByTypeMapping}
      customComponentByTypeMapping={customComponentByTypeMapping}
      schema={{
        type: 'object',
        properties: {
          preferences: {
            type: 'object',
            properties: {
              theme: {
                type: 'string',
                ui: {
                  component: 'Dropdown',
                  options: ['dark', 'light'],
                },
              },
            },
          },
          friends: {
            type: 'array',
            items: {
              type: 'object',
              ui: {
                styles: {backgroundColor: '#ddd'},
              },
              properties: {
                id: {
                  type: 'number',
                },
                name: {
                  type: 'string',
                },
              },
            },
          },
        },
      }}
      value={value}
      onChange={(path, newValue) => {
        const newState = produce(value, (draft) => {
          set(draft, path, newValue);
        });
        setValue(newState);
      }}
      onDelete={(path) => {
        const newState = produce(value, (draft) => {
          // If we're removing an array item we can't simply use lodash unset
          const pathAsArray = path.split('.');
          const lastPathEntry = pathAsArray.pop();
          const pathAtParent = pathAsArray.join('.');
          const parentProperty = get(draft, pathAtParent);
          if (Array.isArray(parentProperty)) {
            const updatedParentProperty = parentProperty.filter(
              (item, index) => index.toString() !== lastPathEntry
            );
            set(draft, pathAtParent, updatedParentProperty);
          } else {
            unset(draft, path);
          }
        });
        setValue(newState);
      }}
    />
  );
};

const meta: Meta<typeof Basic> = {
  component: Basic,
};

export default meta;
type Story = StoryObj<typeof Basic>;

export const Demo: Story = {
  args: {
    value: {
      id: 1,
      name: 'Steve',
      thisFieldIsNull: null,
      preferences: {
        theme: 'dark',
        notifications: {
          email: true,
          sms: false,
        },
      },
      friends: [
        {
          id: 2,
          name: 'Bob',
        },
        {
          id: 3,
          name: 'Alice',
        },
      ],
    },
    onChange(value) {
      console.log(value);
    },
  },
};
