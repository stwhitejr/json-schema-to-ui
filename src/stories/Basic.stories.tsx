import type {Meta, StoryObj} from '@storybook/react';

const Basic = () => {
  return <div>hello world</div>;
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
