import React from "react";
import Popover from "../components/Popover";
import PopoverDocs from "./PopoverDocs.mdx";

export default {
  title: "Popover",
  component: Popover,
  parameters: {
    docs: {
      page: PopoverDocs,
    },
  },
};

const Template = (args) => {
  return (
    <div
      id="popover-mount-node"
      style={{
        background: "var(--cc_color_background_2)",
        height: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Popover
        {...args}
        mountNodeId="popover-mount-node"
        trigger={
          <button type="button" style={{ display: "inline-block" }}>
            Use Storybook Controls
            <br />
            to open/close
          </button>
        }
      >
        <div style={{ padding: "1rem", maxWidth: "300px" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          corporis nemo amet id labore debitis itaque, nesciunt animi illo
          dolore sunt vel, repudiandae in blanditiis voluptatem temporibus eos
          tempora ipsam.lorem
        </div>
      </Popover>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  showCloseButton: true,
  showArrow: false,
  placement: "bottom-start",
  ccBackground: 1,
  ccDepth: 3,
  ccBorderRadius: "l",
};
