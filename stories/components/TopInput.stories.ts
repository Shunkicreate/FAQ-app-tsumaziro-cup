import { StoryObj, Meta } from "@storybook/react";
import TopInput from "../../front/src/components/TopInput";

const meta = {
  title: "Components/TopInput",
  component: TopInput,
  args: {
    input: "",
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => {},
    handleInputSubmit: (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        }
  },
} satisfies Meta<typeof TopInput>;

export default meta;
type Story = StoryObj<typeof TopInput>;

export const startUp: Story = {
  args: {
  },
};

export const input: Story = {
  args: {
    input: "input",
  },
};
