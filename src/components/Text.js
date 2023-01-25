import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import {
  headingFontFamily,
  systemFontFamily,
  spacingTokensToCSS,
} from "./shared/styles.js";

// Each size prop comes with default font-family, font-size, html element, etc.
const getStyles = {
  xxxl: {
    size: "var(--cc_size_text_xxxl)",
    family: "heading",
    weight: 800,
    lineHeight: 1.1,
    el: "h1",
  },
  xxl: {
    size: "var(--cc_size_text_xxl)",
    family: "heading",
    weight: 800,
    lineHeight: 1.1,
    el: "h1",
  },
  xl: {
    size: "var(--cc_size_text_xl)",
    family: "heading",
    weight: 700,
    lineHeight: 1.1,
    el: "h2",
  },
  l: {
    size: "var(--cc_size_text_l)",
    family: "system",
    weight: 700,
    lineHeight: 1.2,
    el: "h3",
  },
  m: {
    size: "var(--cc_size_text_m)",
    family: "system",
    lineHeight: 1.4,
    el: "p",
  },
  s: {
    size: "var(--cc_size_text_s)",
    family: "system",
    lineHeight: 1.4,
    el: "p",
  },
  xs: {
    size: "var(--cc_size_text_xs)",
    family: "system",
    lineHeight: 1.4,
    el: "span",
  },
  xxs: {
    size: "var(--cc_size_text_xxs)",
    family: "system",
    lineHeight: 1.4,
    el: "span",
  },
};

// #region styled-components
const StyledText = styled.span`
  /* unset all global typography styles */
  all: unset;

  /* default is block */
  display: ${(props) => props.textDisplay};

  /* Component can inherit font color for one-offs */
  color: ${(props) =>
    props.textColor === "inherit"
      ? "inherit"
      : `var(--cc_color_text_${props.textColor})`};

  /* Use either Averta (heading) or system font stack default */
  ${(props) =>
    props.fontFamilyIsHeading ? headingFontFamily : systemFontFamily}

  /* Add 1px to font size if heading font family, due to Averta lookin' too small */
  font-size: ${(props) =>
    props.fontFamilyIsHeading
      ? `calc(${getStyles[props.size].size} + 1px)`
      : getStyles[props.size].size};
  line-height: ${(props) => getStyles[props.size].lineHeight};

  /* if ccMargin is specified in props, convert spacing tokens to CSS variables */
  ${(props) =>
    props.ccMargin
      ? css`
          margin: ${spacingTokensToCSS(props.ccMargin)};
        `
      : null}

  /* if user specifies weight in props OR there is a weight default for the font size, set it in CSS */
  ${(props) =>
    props.weight || getStyles[props.size].weight
      ? css`
          font-weight: ${props.weight || getStyles[props.size].weight};
        `
      : null}
`;
// #endregion

const Text = ({
  as,
  children,
  color,
  family,
  size,
  ccMargin,
  weight,
  display,
  className,
  style,
  ...props
}) => {
  return (
    <StyledText
      as={as || getStyles[size].el} // if user supplies as, use that instead of the default
      size={size}
      fontFamilyIsHeading={
        family === "heading" || getStyles[size].family === "heading"
      }
      ccMargin={ccMargin}
      textColor={color}
      weight={weight}
      textDisplay={display}
      className={className}
      style={style}
      {...props}
    >
      {children ? children : null}
    </StyledText>
  );
};

Text.propTypes = {
  children: PropTypes.node,
  as: PropTypes.string,
  color: PropTypes.oneOf(["default", "subtle", "nonessential", "inherit"]),
  size: PropTypes.oneOf(["xxxl", "xxl", "xl", "l", "m", "s", "xs", "xxs"]),
  family: PropTypes.oneOf(["heading", "system"]),
  ccMargin: PropTypes.string,
  weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  display: PropTypes.oneOf(["inline", "block"]),
  className: PropTypes.string,
  style: PropTypes.object,
};
Text.defaultProps = {
  children: undefined,
  family: undefined,
  color: "default",
  as: undefined,
  size: "s",
  ccMargin: undefined,
  weight: undefined,
  display: "block",
  className: undefined,
  style: undefined,
};
export default Text;
