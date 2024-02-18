import { StoryObj, Meta } from "@storybook/react";
import Header from "../../front/src/components/Header";
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: "Components/Header",
  component: Header,
  decorators: [withRouter],
  args: {
    input: "",
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => { },
    handleInputSubmit: (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    }
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof Header>;

export const startUp: Story = {
  args: {
  },
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { userId: '42' },
        searchParams: { tab: 'activityLog' },
        state: { fromPage: 'homePage' },
      },
      routing: {
        path: '/users/:userId',
        handle: 'Profile',
      },
    }),
  },
};

export const input: Story = {
  args: {
    input: "input",
  },
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { userId: '42' },
        searchParams: { tab: 'activityLog' },
        state: { fromPage: 'homePage' },
      },
      routing: {
        path: '/users/:userId',
        handle: 'Profile',
      },
    }),
  },
};
