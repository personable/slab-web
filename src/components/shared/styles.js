import { css } from "styled-components";

export const buttonResetStyles = ({ disabled, readOnly }) => {
  return `
    all: initial;
    box-sizing: border-box;
    font-family: inherit;
    max-width: 100%;
    overflow: visible;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    background: none;
    position: relative;
    appearance: none;
    text-decoration: none;
    touch-action: manipulation;
    cursor: pointer;
    user-select: none;

    &:focus-visible {
      outline: var(--cc_size_border_width_m) solid var(--cc_color_link_primary);
      outline-offset: 0.25ch;
    }
    
    ${
      disabled || readOnly
        ? css`
            pointer-events: none;
          `
        : ""
    }
    ${
      disabled
        ? css`
            opacity: 0.5;
            cursor: not-allowed;
          `
        : ""
    }
  `;
};

export const buttonSize = {
  small: "var(--cc_size_avatar_m)",
  medium: "var(--cc_size_avatar_l)",
  large: "48px",
};
