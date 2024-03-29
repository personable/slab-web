import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import * as tokens from "./shared/tokens.js";

const getIconName = (iconName, color) => {
  if (iconName) {
    return iconName;
  } else if (color === "success") {
    return "check";
  } else if (color === "caution" || color === "destroy") {
    return "alert-circle-outline";
  } else if (color === "upgrade") {
    return "lightning-bolt";
  } else {
    return "information-outline";
  }
};

const getSizes = {
  small: {
    containerPadding: "6px 8px",
    iconContainerSize: 24,
    fontSize: "var(--cc_size_text_xs)",
    iconSize: 16,
  },
  medium: {
    containerPadding:
      "calc(var(--cc_size_spacing_s) + 2px) var(--cc_size_spacing_m) calc(var(--cc_size_spacing_s) + 2px)",
    iconContainerSize: 28,
    fontSize: "13px",
    iconSize: 18,
  },
  large: {
    containerPadding:
      "var(--cc_size_spacing_m) var(--cc_size_spacing_l) var(--cc_size_spacing_m) var(--cc_size_spacing_m)",
    iconContainerSize: 34,
    fontSize: "var(--cc_size_text_s)",
    iconSize: 22,
  },
};

const getColors = {
  info: {
    containerBackground: "var(--cc_color_background_3_alpha_80)",
    iconContainerBackground: "var(--cc_color_utility_info_alpha_80)",
    iconContainerBorderRadius: "var(--cc_size_border_radius_l)",
    iconColor: tokens.color_text_default_de,
  },
  caution: {
    containerBackground: "var(--cc_color_utility_caution_alpha_20)",
    iconContainerBackground: "var(--cc_color_utility_caution)",
    iconContainerBorderRadius: "var(--cc_size_border_radius_l)",
    iconColor: tokens.color_text_default_le,
  },
  success: {
    containerBackground: "var(--cc_color_utility_success_alpha_10)",
    iconContainerBackground: "var(--cc_color_utility_success)",
    iconContainerBorderRadius: "var(--cc_size_border_radius_l)",
    iconColor: "var(--cc_color_background_1)",
  },
  destroy: {
    containerBackground: "var(--cc_color_utility_destroy_alpha_10)",
    iconContainerBackground: "var(--cc_color_utility_destroy)",
    iconContainerBorderRadius: "var(--cc_size_border_radius_l)",
    iconColor: "var(--cc_color_background_1)",
  },
  upgrade: {
    containerBackground: "var(--cc_color_brand_upgrade_alpha_20)",
    iconContainerBackground: "var(--cc_color_brand_upgrade)",
    iconContainerBorderRadius: "var(--cc_size_border_radius_pill)",
    iconColor: "var(--cc_color_brand_secondary)",
  },
};

// #region styled components
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: var(--cc_color_text_subtle);
  border-radius: var(--cc_size_border_radius_l);
  ${(props) => css`
    align-items: ${props.contentAlign === "top" ? "start" : "center"};
    padding: ${getSizes[props.noticeSize].containerPadding};
    background-color: ${getColors[props.noticeColor].containerBackground};
    font-size: ${getSizes[props.noticeSize].fontSize};
    line-height: 1.3;
    gap: ${props.noticeSize === "small"
      ? "calc(var(--cc_size_spacing_s) + 2px)"
      : "var(--cc_size_spacing_m)"};
  `}
`;

const Content = styled.span`
  flex: 1;
`;

const ContentBeforeAfter = styled.span`
  flex-shrink: 0;
`;

const Icon = styled.span`
  flex-shrink: 0;
  display: grid;
  place-items: center;
  ${(props) => css`
    background-color: ${getColors[props.noticeColor].iconContainerBackground};
    width: ${getSizes[props.noticeSize].iconContainerSize}px;
    height: ${getSizes[props.noticeSize].iconContainerSize}px;
    border-radius: ${getColors[props.noticeColor].iconContainerBorderRadius};
  `}
`;
const Glyph = styled.i`
  ${(props) => css`
    font-size: ${getSizes[props.noticeSize].iconSize}px;
    color: ${getColors[props.noticeColor].iconColor};
  `}
`;
// #endregion

const Notice = ({
  children,
  color,
  contentBefore,
  contentAfter,
  contentAlign,
  iconName,
  hideIcon,
  size,
}) => {
  return (
    <Container
      noticeColor={color}
      noticeSize={size}
      contentAlign={contentAlign}
    >
      {!hideIcon && !contentBefore ? (
        <Icon noticeColor={color} noticeSize={size}>
          <Glyph
            className={`mdi mdi-${getIconName(iconName, color)}`}
            aria-hidden="true"
            noticeSize={size}
            noticeColor={color}
          />
        </Icon>
      ) : null}
      {contentBefore ? (
        <ContentBeforeAfter>{contentBefore}</ContentBeforeAfter>
      ) : null}
      <Content>{children}</Content>
      {contentAfter ? (
        <ContentBeforeAfter>{contentAfter}</ContentBeforeAfter>
      ) : null}
    </Container>
  );
};

Notice.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["caution", "info", "success", "destroy", "upgrade"]),
  contentBefore: PropTypes.node,
  contentAfter: PropTypes.node,
  contentAlign: PropTypes.oneOf(["center", "top"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  iconName: PropTypes.string,
  hideIcon: PropTypes.bool,
};
Notice.defaultProps = {
  color: "info",
  contentBefore: undefined,
  contentAfter: undefined,
  contentAlign: "center",
  size: "medium",
  iconName: undefined,
  hideIcon: false,
};

export default Notice;
