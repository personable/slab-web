import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { headingFontFamily, systemFontFamily } from "./shared/styles.js";

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

const getFontFamily = (size, userChosenFontFamily) => {
  return userChosenFontFamily || getStyles[size].family;
};

const getFontFamilyCSS = (size, userChosenFontFamily) => {
  return getFontFamily(size, userChosenFontFamily) === "heading"
    ? headingFontFamily
    : systemFontFamily;
};

const getFontSize = (size, userChosenFontFamily) => {
  const initialFontSize = getStyles[size].size;
  const fontFamilyIsHeading =
    getFontFamily(size, userChosenFontFamily) === "heading";

  if (fontFamilyIsHeading) {
    return `calc(${initialFontSize} + 1px)`;
  } else {
    return initialFontSize;
  }
};

const getSpacing = (spacing) => {
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

// begin styled components
const StyledText = styled.span`
  all: unset;
  display: ${(props) => props.textDisplay};
  color: ${(props) =>
    props.textColor === "inherit"
      ? "inherit"
      : `var(--cc_color_text_${props.textColor})`};
  ${(props) => getFontFamilyCSS(props.size, props.userChosenFontFamily)}
  font-size: ${(props) => getFontSize(props.size, props.userChosenFontFamily)};
  line-height: ${(props) => getStyles[props.size].lineHeight};
  ${(props) =>
    props.ccMargin
      ? css`
          margin: ${getSpacing(props.ccMargin)};
        `
      : null}
  ${(props) =>
    props.weight || getStyles[props.size].weight
      ? css`
          font-weight: ${props.weight || getStyles[props.size].weight};
        `
      : null}
`;
// end styled components

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
      as={as || getStyles[size].el}
      size={size}
      userChosenFontFamily={family}
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
