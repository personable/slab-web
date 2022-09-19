import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import ScreenReaderContent from "./ScreenReaderContent";

// get rid of this and make this basebadge, accepting any color/text
const getColors = {
  info: {
    background: "var(--cc_color_background_3)",
    text: "var(--cc_color_text_subtle)",
  },
  success: {
    background: "var(--cc_color_utility_success)",
    text: "var(--cc_color_button_text_secondary)",
  },
  destroy: {
    background: "var(--cc_color_utility_destroy)",
    text: "white",
  },
  primary: {
    background: "var(--cc_color_button_background_primary)",
    text: "var(--cc_color_button_text_primary)",
  },
  secondary: {
    background: "var(--cc_color_button_background_secondary)",
    text: "var(--cc_color_button_text_secondary)",
  },
  upgrade: {
    background: "var(--cc_color_brand_upgrade)",
    text: "var(--cc_color_brand_secondary)",
  },
  accent: {
    background: "var(--cc_color_brand_accent)",
    text: "var(--cc_color_brand_secondary)",
  },
};

const getSizes = {
  tiny: {
    squareSize: 14,
    text: 9,
    icon: 10,
  },
  small: {
    squareSize: 18,
    text: 9,
    icon: 12,
  },
  medium: {
    squareSize: 24,
    text: 12,
    icon: 14,
  },
};

// begin styled components
const Container = styled.span`
  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  letter-spacing: 0.125ch;
  ${(props) => {
    const squareSize = getSizes[props.badgeSize].squareSize;
    return css`
      gap: ${props.hasNoTextContent ? "0" : `${Math.floor(squareSize / 5)}`}px;
      height: ${squareSize}px;
      line-height: ${squareSize}px;
      min-width: ${squareSize}px;
      border-radius: ${squareSize / 2}px;
      font-size: ${getSizes[props.badgeSize].text}px;
      padding: 0px
        ${props.hasNoTextContent
          ? "0"
          : Math.round(getSizes[props.badgeSize].squareSize * 0.3)}px;
      background: ${getColors[props.badgeColor].background};
      color: ${getColors[props.badgeColor].text};
    `;
  }}
`;

const Text = styled.span`
  text-transform: uppercase;
`;

const Icon = styled.span`
  font-size: ${(props) => getSizes[props.size].icon}px;
`;
// end styled components

const Badge = ({
  accessibilityLabel,
  className,
  color,
  iconName,
  iconPosition,
  size,
  style,
  textContent,
}) => {
  const hasNoTextContent = !textContent || textContent === "";
  const iconContent = iconName ? (
    <Icon className="material-icons" size={size}>
      {iconName}
    </Icon>
  ) : null;

  return (
    <Container
      badgeColor={color}
      className={`cc-slab-badge ${className ? className : ""}`}
      style={style}
      badgeSize={size}
      hasNoTextContent={hasNoTextContent}
    >
      {iconPosition === "before" ? iconContent : null}
      {textContent ? <Text>{textContent}</Text> : null}
      {iconPosition === "after" ? iconContent : null}
      {accessibilityLabel ? (
        <ScreenReaderContent>{accessibilityLabel}</ScreenReaderContent>
      ) : null}
    </Container>
  );
};

Badge.propTypes = {
  accessibilityLabel: PropTypes.string,
  color: PropTypes.oneOf([
    "info",
    "success",
    "destroy",
    "primary",
    "secondary",
    "upgrade",
    "accent",
  ]),
  className: PropTypes.string,
  iconName: PropTypes.string,
  iconPosition: PropTypes.oneOf(["before", "after"]),
  size: PropTypes.oneOf(["tiny", "small", "medium"]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textContent: PropTypes.string,
};

Badge.defaultProps = {
  accessibilityLabel: undefined,
  color: "info",
  iconName: undefined,
  iconPosition: "before",
  size: "small",
  className: undefined,
  style: undefined,
  textContent: null,
};

export default Badge;
