import { StoryObj, Meta } from "@storybook/react";
import Footer from "../../front/src/components/Footer";

const meta = {
  title: "Components/Footer",
  component: Footer,
  args: {
    input: "",
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => { },
    handleInputSubmit: (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    }
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof Footer>;

export const startUp: Story = {
  args: {
  },
};

export const input: Story = {
  args: {
    input: "input",
  },
};
