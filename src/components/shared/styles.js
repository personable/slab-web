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