import type { Meta, StoryObj } from '@storybook/react';
import { Item } from 'react-stately';

import { Select } from '.';

const meta = {
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: ['A', 'B', 'C'].map((value) => (
      <Item key={value} textValue={value}>
        {value}
      </Item>
    )),
  },
};
