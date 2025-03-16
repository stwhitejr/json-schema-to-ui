import {useJsonToUiContext} from '@root/context';
import JsonToUi from '@root/JsonToUi';
import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';

const StringComponent = (props) => {
  const {onChange} = useJsonToUiContext();
  return (
    <div>
      <input
        value={props.value}
        onChange={({target: {value}}) => onChange(props.path, value)}
      />
    </div>
  );
};

const componentByTypeMapping = {
  string: StringComponent,
};

const Basic = () => {
  const [value, setValue] = useState({
    foo: 'bar',
  });
  return (
    <JsonToUi
      componentByTypeMapping={componentByTypeMapping}
      value={value}
      onChange={(path, newValue) => {
        console.log(path, newValue);
        setValue({
          ...value,
          // TODO: support nesting
          [path]: newValue,
        });
      }}
    />
  );
};

const meta: Meta<typeof Basic> = {
  component: Basic,
};

export default meta;
type Story = StoryObj<typeof Basic>;

export const FirstStory: Story = {
  args: {
    foo: 'bar',
  },
};
