import { StoryObj, Meta } from "@storybook/react";
import { FAQList } from "../../front/src/components/ShowUnorderdList";
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6';

const meta = {
  title: "Components/FAQList",
  component: FAQList,
  decorators: [withRouter],
  args: {
    items: [
      { "question": "入稿時の データチェック で修正される可能性のある項目は？", "pageTitle": "https://helpfeel.com/raksul/%E5%85%A5%E7%A8%BF%E5%89%8D%E3%83%81%E3%82%A7%E3%83%83%E3%82%AF%E3%83%AA%E3%82%B9%E3%83%88-60f55148effc3b001cad920d" }, { "question": "データチェック お急ぎ便が選択できない", "pageTitle": "https://helpfeel.com/raksul/%E3%83%87%E3%83%BC%E3%82%BF%E3%83%81%E3%82%A7%E3%83%83%E3%82%AF%E3%81%8A%E6%80%A5%E3%81%8E%E4%BE%BF%E3%81%8C%E9%81%B8%E6%8A%9E%E3%81%A7%E3%81%8D%E3%81%AA%E3%81%84%E3%80%81%E9%81%B8%E6%8A%9E%E3%81%97%E3%81%9F%E3%81%84-60f55154effc3b001cad985d" }, { "question": "カタログのスピードチェック入稿で自動 データチェック 結果を確認する方法は？", "pageTitle": "https://helpfeel.com/raksul/%E3%82%B9%E3%83%94%E3%83%BC%E3%83%89%E3%83%81%E3%82%A7%E3%83%83%E3%82%AF%E5%85%A5%E7%A8%BF%E3%81%AE%E3%81%94%E5%88%A9%E7%94%A8%E6%96%B9%E6%B3%95%20%E2%80%93%20%E4%B8%AD%E7%B6%B4%E3%81%98%E5%86%8A%E5%AD%90%E3%83%BB%E3%82%AB%E3%82%BF%E3%83%AD%E3%82%B0%20%E2%80%93-60f55149effc3b001cad92a4" }
    ],
    color: "color",
    hoverColor: "hoverColor",
    input: "input",
  },
} satisfies Meta<typeof FAQList>;

export default meta;
type Story = StoryObj<typeof FAQList>;

export const startUp: Story = {
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
};
