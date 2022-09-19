import { useDarkMode } from "storybook-dark-mode";
import { themes } from "@storybook/theming";
import * as tokens from "./tokens";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    stylePreview: true,
    darkClass: "dark-environment",
    lightClass: "light-environment",
    light: {
      ...themes.light,
      colorPrimary: tokens.color_link_primary_le,
      colorSecondary: tokens.color_link_secondary_le,

      // UI
      appBg: tokens.color_background_2_le,
      appContentBg: tokens.color_background_1_le,
      appBorderColor: tokens.color_border_default_le,
      appBorderRadius: tokens.size_border_radius_l,

      // Typography
      fontBase:
        '"Averta", system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
      fontCode:
        "Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;",

      // Text colors
      textColor: tokens.color_text_default_le,
      textInverseColor: tokens.color_text_default_de,

      // Toolbar default and active colors
      barTextColor: tokens.color_text_subtle_le,
      barSelectedColor: tokens.color_link_secondary_le,
      barBg: tokens.color_background_2_le,

      // Form colors
      inputBg: tokens.color_background_1_le,
      inputBorder: tokens.color_border_input_inactive_le,
      inputTextColor: tokens.color_link_secondary_le,
      inputBorderRadius: tokens.size_border_radius_l,
    },
    dark: {
      ...themes.dark,
      colorPrimary: tokens.color_link_primary_de,
      colorSecondary: tokens.color_link_secondary_de,

      // UI
      appBg: tokens.color_background_2_de,
      appContentBg: tokens.color_background_1_de,
      appBorderColor: tokens.color_border_default_de,
      appBorderRadius: tokens.size_border_radius_l,

      // Typography
      fontBase:
        '"Averta", system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif',
      fontCode:
        "Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace;",

      // Text colors
      textColor: tokens.color_text_default_de,
      textInverseColor: tokens.color_text_default_le,

      // Toolbar default and active colors
      barTextColor: tokens.color_text_subtle_de,
      barSelectedColor: tokens.color_link_secondary_de,
      barBg: tokens.color_background_2_de,

      // Form colors
      inputBg: tokens.color_background_1_de,
      inputBorder: tokens.color_border_input_inactive_de,
      inputTextColor: tokens.color_link_secondary_de,
      inputBorderRadius: tokens.size_border_radius_l,
    },
  },
};

export const decorators = [
  (Canvas, context) => {
    // console.log(useDarkMode());
    return <Canvas />;
  },
];
