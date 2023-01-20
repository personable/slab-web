import React from "react";
import Drawer from "../components/Drawer";
import DrawerDocs from "./DrawerDocs.mdx";

export default {
  title: "Drawer",
  component: Drawer,
  parameters: {
    docs: {
      page: DrawerDocs,
    },
  },
};

const Template = (args) => {
  return (
    <div
      id="drawer-mount-node"
      style={{
        position: "relative",
        height: "300px",
        overflow: "hidden",
        border: "1px solid var(--cc_color_border_default)",
        background: "var(--cc_color_background_2)",
      }}
    >
      <Drawer {...args} mountNodeId="drawer-mount-node">
        <div>
          <h1>👋</h1>
          <p>See the Docs tab for implentation details.</p>
        </div>
      </Drawer>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  isFullScreen: false,
  placement: "left",
  ccBackground: 1,
  ccDepth: 3,
};
