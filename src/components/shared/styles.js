import styled, { css } from "styled-components";
import CheckboxRadioLabel from "./CheckboxRadioLabel";
import CheckboxRadioFacade from "./CheckboxRadioFacade";

/*
 * --- ACCESSIBILITY UTILITIES
 */
export const visuallyHidden = css`
  margin: -1px;
  padding: 0;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip: rect(0, 0, 0, 0);
  position: absolute;
`;

export const focusStyles = css`
  outline: var(--cc_size_border_width_m) solid
    var(--cc_color_border_input_active);
  outline-offset: 0.25ch;
`;

/*
 * --- FONTS
 */
export const systemFontFamily = `font-family: system-ui, -apple-system, BlinkMacSystemFont,
'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;`;

export const headingFontFamily = `font-family: 'Averta', system-ui, -apple-system, BlinkMacSystemFont,
'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;`;

/*
 * --- CHECKBOX/RADIO SHARED STYLES
 */
export const CheckboxRadioContainer = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
`;

/*
This is a bit of a hack to get CSS's :focus-visible, which is
nicer than onFocus/onBlur because it only shows the outline when
the user is navigating by keyboard. We shouldn't be setting styles
across components usually.
*/
export const StyledCheckboxRadioLabel = styled(CheckboxRadioLabel)``;
export const StyledCheckboxRadioFacade = styled(CheckboxRadioFacade)``;
export const HiddenInput = styled.input`
  ${visuallyHidden}
  ${(props) =>
    props.layout === "inline"
      ? css`
          &:focus-visible ~ ${StyledCheckboxRadioLabel} {
            ${focusStyles};
          }
        `
      : css`
          &:focus-visible
            ~ ${StyledCheckboxRadioLabel}
            ${StyledCheckboxRadioFacade} {
            ${focusStyles};
          }
          &:active ~ ${StyledCheckboxRadioLabel} ${StyledCheckboxRadioFacade} {
            transition: transform 0.25s;
            transform: scale(1.25);
          }
        `}
`;

/*
 * --- BUTTONS
 */
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
      ${focusStyles}
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

export const spacingTokensToCSS = (spacing) => {
  const spacingWhiteList = ["xxl", "xl", "l", "m", "s", "xs", "xxs"];
  const spacingToArray = spacing.split(" ");
  const spacingToTokens = [];
  spacingToArray.forEach((space) => {
    if (spacingWhiteList.includes(space)) {
      spacingToTokens.push(`var(--cc_size_spacing_${space})`);
    } else {
      return spacingToTokens.push("0");
    }
  });
  return spacingToTokens.join(" ");
};

/*
 * --- HINT TOOLTIP
 */

export const hintTooltipStyles = ({ position }) => css`
  position: relative;
  overflow: visible;

  &::before,
  &::after {
    position: absolute;
    bottom: 100%;
    bottom: ${(props) => props.position === 'top' ? '100%' : 0};
    left: 50%;
    transform: translate3d(0, 0, 0);
    visibility: hidden;
    opacity: 0;
    z-index: 1000000;
    pointer-events: none;
  }

  &::before {
    content: '';
    position: absolute;
    margin-bottom: -7px;
    /* transform: translateX(-50%) translateY(-5px); */
    background: transparent;
    border: 6px solid transparent;
    border-top-color: var(--cc_color_button_background_secondary);
    z-index: 1000001;
  }

  &::after {
    /* left: 8px; */
    padding: 6px 8px;

    /* transform: translateX(-8px) translateY(-9px); */
    /* transform: translateX(-50%) translateY(-9px); */

    background: var(--cc_color_button_background_secondary);
    border-radius: var(--cc_size_border_radius_l);
    box-shadow: none;

    color: var(--cc_color_button_text_secondary);
    font-weight: 500;
    /* font-family: $systemFontsStack; */
    font-size: 11px;
    line-height: 1.5;
    white-space: nowrap;
    text-shadow: none;
  }

  &:hover::before,
  &:hover::after {
    visibility: visible;
    opacity: 1;
  }

  &:hover::before {
    transform: translateX(-50%) translateY(-6px);
  }

  &:hover::after {
    transform: translateX(-50%) translateY(-10px);
  }

  &[aria-label]::after {
    content: attr(aria-label);
  }
`;

const tooltipBefore = (position) => {
  switch (position) {
    case 'top':
      return css`
        position: absolute;
        transform: translate3d(0, 0, 0);
        visibility: hidden;
        opacity: 0;
        z-index: 1000001;
        pointer-events: none;
        left: 50%;
        bottom: 100%;
        margin-bottom: -7px;
        border: 6px solid transparent;
        border-top-color: var(--cc_color_button_background_secondary);
      `;
    case 'top-left':
      return css`
        left: 50%;
        bottom: 100%;
        margin-bottom: -7px;
        border: 6px solid transparent;
        border-top-color: var(--cc_color_button_background_secondary);
      `;
    case 'top-right':
      return css`
        left: 50%;
        bottom: 100%;
        margin-bottom: -7px;
        border: 6px solid transparent;
        border-top-color: var(--cc_color_button_background_secondary);
      `;
    case 'bottom':
      return css`
        transform-origin: right center;
      `;
    case 'bottom-left':
      return css`
        transform-origin: top left;
      `;
    case 'bottom-right':
      return css`
        transform-origin: top right;
      `;
  }
};

const tooltipHoverBefore = (position) => {
  switch (position) {
    case 'top':
      return css`
        transform: translateX(-50%) translateY(-6px);
      `;
    case 'top-left':
      return css`
        transform: translateX(-50%) translateY(-6px);
      `;
    case 'top-right':
      return css`
        transform: translateX(-50%) translateY(-6px);
      `;
    case 'bottom':
      return css`
        transform-origin: right center;
      `;
    case 'bottom-left':
      return css`
        transform-origin: top left;
      `;
    case 'bottom-right':
      return css`
        transform-origin: top right;
      `;
  }
};

const tooltipAfter = (position) => {
  switch (position) {
    case 'top':
      return css`
        position: absolute;
        transform: translate3d(0, 0, 0);
        visibility: hidden;
        opacity: 0;
        z-index: 1000000;
        pointer-events: none;
        left: 50%;
        bottom: 100%;
      `;
    case 'top-left':
      return css`
        right: 0;
        bottom: 100%;
      `;
    case 'top-right':
      return css`
        left: 0;
        bottom: 100%;
      `;
    case 'bottom':
      return css`
        transform-origin: right center;
      `;
    case 'bottom-left':
      return css`
        transform-origin: top left;
      `;
    case 'bottom-right':
      return css`
        transform-origin: top right;
      `;
  }
};

const tooltipHoverAfter = (position) => {
  switch (position) {
    case 'top':
      return css`
        transform: translateX(-50%) translateY(-10px);
      `;
    case 'top-left':
      return css`
        transform: translateX(50%) translateY(-10px);
      `;
    case 'top-right':
      return css`
        transform: translateX(-50%) translateY(-10px);
      `;
    case 'bottom':
      return css`
        transform-origin: right center;
      `;
    case 'bottom-left':
      return css`
        transform-origin: top left;
      `;
    case 'bottom-right':
      return css`
        transform-origin: top right;
      `;
  }
};


export const hintTooltipStyless = ({ position }) => {
  return`
    position: relative;
    overflow: visible;

    &::before,
    &::after {
      position: absolute;
      transform: translate3d(0, 0, 0);
      visibility: hidden;
      opacity: 0;
      z-index: 1000000;
      pointer-events: none;
    }

    &::before {
      content: '';
      position: absolute;
      background: transparent;
      z-index: 1000001;
      ${tooltipBefore(position)}
    }

    &::after {
      padding: 6px 8px;

      background: var(--cc_color_button_background_secondary);
      border-radius: var(--cc_size_border_radius_l);
      box-shadow: none;

      color: var(--cc_color_button_text_secondary);
      font-weight: 500;
      font-size: 11px;
      line-height: 1.5;
      white-space: nowrap;
      text-shadow: none;
      ${tooltipAfter(position)};
    }

    &:hover::before,
    &:hover::after {
      visibility: visible;
      opacity: 1;
    }

    &:hover::before {
      ${tooltipHoverBefore(position)};
    }

    &:hover::after {
      ${tooltipHoverBefore(position)};
    }

    &[aria-label]::after {
      content: attr(aria-label);
    }
  `;
};