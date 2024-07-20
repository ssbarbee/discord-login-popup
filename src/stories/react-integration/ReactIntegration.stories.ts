import type { Meta, StoryObj } from '@storybook/react';

import { ReactIntegration } from './ReactIntegration';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof ReactIntegration> = {
  component: ReactIntegration,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  title: 'ReactIntegration',
};

export default meta;
type Story = StoryObj<typeof ReactIntegration>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    discordAppClientId: '1263854212983296073',
    redirectUrl: `${window.location.origin}/discord-login.html`,
    responseType: 'token',
    scopes: 'identify',
  },
};
