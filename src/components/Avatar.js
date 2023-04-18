import styled, { css } from "styled-components";
import React from 'react';
import PropTypes from 'prop-types';
import ScreenReaderContent from './shared/ScreenReaderContent';

const tooltipPositioning = {
  'top-center': {
    top: "auto",
    bottom: "100%",
    right: "auto",
    left: "auto",
    transform: "translateY(-11px)",
    borderColor: "var(--cc_color_button_background_secondary) transparent transparent transparent",
  },
  'top-right': {
    top: "auto",
    bottom: "100%",
    right: "auto",
    left: "0",
    transform: "translateY(-11px)",
    borderColor: "var(--cc_color_button_background_secondary) transparent transparent transparent",
  },
  'top-left': {
    top: "auto",
    bottom: "100%",
    right: "0",
    left: "auto",
    transform: "translateY(-11px)",
    borderColor: "var(--cc_color_button_background_secondary) transparent transparent transparent",
  },
  'bottom-center': {
    top: "100%",
    bottom: "auto",
    right: "auto",
    left: "auto",
    transform: "translateY(11px)",
    borderColor: "transparent transparent var(--cc_color_button_background_secondary) transparent",
  },
  'bottom-right': {
    top: "100%",
    bottom: "auto",
    right: "auto",
    left: "0",
    transform: "translateY(11px)",
    borderColor: "transparent transparent var(--cc_color_button_background_secondary) transparent",
  },
  'bottom-left': {
    top: "100%",
    bottom: "auto",
    right: "0",
    left: "auto",
    transform: "translateY(11px)",
    borderColor: "transparent transparent var(--cc_color_button_background_secondary) transparent",
  },
};

const hintTooltipStyles = css`
  position: relative;
  overflow: visible;

  &::before,
  &::after {
    position: absolute;
    visibility: hidden;
    opacity: 0;
    z-index: 1000000;
    pointer-events: none;

    ${(props) => css`
      top: ${tooltipPositioning[props.tooltipPosition].top};
      bottom: ${tooltipPositioning[props.tooltipPosition].bottom};
    `}
  }

  &::before {
    content: '';
    position: absolute;
    background: transparent;
    border: 6px solid;
    z-index: 1000001;

    ${(props) => css`
      border-color: ${tooltipPositioning[props.tooltipPosition].borderColor};
    `}
  }

  &::after {
    content: attr(aria-label);
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

    ${(props) => css`
      transform: ${tooltipPositioning[props.tooltipPosition].transform};
      left: ${tooltipPositioning[props.tooltipPosition].left};
      right: ${tooltipPositioning[props.tooltipPosition].right};
    `}
  }

  &:hover::before,
  &:hover::after {
    visibility: visible;
    opacity: 1;
  }
`;

const avatarSizes = {
  large: 40,
  medium: 32,
  small: 24,
  tiny: 16,
};

const Image = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  overflow: hidden;
  height: ${(props) => `${props.avatarSize}px`};
  width: ${(props) => `${props.avatarSize}px`};
  line-height: ${(props) => `${props.avatarSize}px`};
  background-image: url(${(props) => props.imageSrc});
  background-size: cover;
  background-position: 50%;
  background-color: ${(props) => props.backgroundColor ? props.backgroundColor : 'var(--cc_color_background_3)'};
  border: 2px solid;
  border-color: ${(props) => props.color ? props.color : 'transparent'};
  color: ${(props) => props.textColor ? props.textColor : 'var(--cc_color_text_subtle)'};
  ${(props) => props.showTitleOnHover ? hintTooltipStyles : null};
`;

const Initials = styled.div`
  font-size: ${(props) => `${props.textSize}px`};
  font-weight: 600;
  text-align: center;
  font-family: 'Averta', system-ui, sans-serif;
`;

const AvatarInitials = ({ initials, avatarSize }) => {
  const textSize = Math.round(avatarSize / 2.4);
  return <Initials textSize={textSize}>{initials}</Initials>;
};

const Avatar = ({
  title,
  src,
  color,
  backgroundColor,
  textColor,
  size,
  className,
  style,
  showTitleOnHover,
  tooltipPosition,
  customInitials,
}) => {
  const avatarSize = typeof size === 'number' ? size : avatarSizes[size];
  const initials = title ? title.split(' ').map(x => x.charAt(0)).join('').substr(0, 3).toUpperCase() : null
  return (
    <Image
      className={className}
      avatarSize={avatarSize}
      color={color}
      backgroundColor={backgroundColor}
      textColor={textColor}
      imageSrc={src}
      aria-label={title}
      style={style}
      showTitleOnHover={initials && showTitleOnHover}
      tooltipPosition={tooltipPosition}
    >
      {!src && !initials ? (
        <i className="mdi mdi-account" />
      ) : null}
      {!src && initials ? (
        <AvatarInitials textColor={textColor} avatarSize={avatarSize} initials={customInitials ? customInitials : initials} />
      ) : null}
      {title ? <ScreenReaderContent>{title}</ScreenReaderContent> : null}
    </Image>
  );
};

Avatar.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.oneOf(["tiny", "small", "medium", "large"]),
    PropTypes.number,
  ]),
  className: PropTypes.string,
  style: PropTypes.object,
  showTitleOnHover: PropTypes.bool,
  tooltipPosition: PropTypes.oneOf(["top-center", "top-left", "top-right", "bottom-center", "bottom-left", "bottom-right"]),
  customInitials: PropTypes.string,
};

Avatar.defaultProps = {
  title: undefined,
  src: '',
  size: avatarSizes.medium,
  color: undefined,
  backgroundColor: undefined,
  textColor: undefined,
  className: undefined,
  style: undefined,
  showTitleOnHover: false,
  tooltipPosition: "top-center",
  customInitials: undefined,
};

export default Avatar;
