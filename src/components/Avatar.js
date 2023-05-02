import styled, { css } from "styled-components";
import React from 'react';
import PropTypes from 'prop-types';
import ScreenReaderContent from './shared/ScreenReaderContent';
import * as tokens from "./shared/tokens.js";

// const tooltipPositioning = {
//   'top-center': {
//     top: "auto",
//     bottom: "100%",
//     right: "auto",
//     left: "auto",
//     transform: "translateY(-11px)",
//     borderColor: "var(--cc_color_button_background_secondary) transparent transparent transparent",
//   },
//   'top-right': {
//     top: "auto",
//     bottom: "100%",
//     right: "auto",
//     left: "0",
//     transform: "translateY(-11px)",
//     borderColor: "var(--cc_color_button_background_secondary) transparent transparent transparent",
//   },
//   'top-left': {
//     top: "auto",
//     bottom: "100%",
//     right: "0",
//     left: "auto",
//     transform: "translateY(-11px)",
//     borderColor: "var(--cc_color_button_background_secondary) transparent transparent transparent",
//   },
//   'bottom-center': {
//     top: "100%",
//     bottom: "auto",
//     right: "auto",
//     left: "auto",
//     transform: "translateY(11px)",
//     borderColor: "transparent transparent var(--cc_color_button_background_secondary) transparent",
//   },
//   'bottom-right': {
//     top: "100%",
//     bottom: "auto",
//     right: "auto",
//     left: "0",
//     transform: "translateY(11px)",
//     borderColor: "transparent transparent var(--cc_color_button_background_secondary) transparent",
//   },
//   'bottom-left': {
//     top: "100%",
//     bottom: "auto",
//     right: "0",
//     left: "auto",
//     transform: "translateY(11px)",
//     borderColor: "transparent transparent var(--cc_color_button_background_secondary) transparent",
//   },
// };

// const hintTooltipStyles = css`
//   position: relative;
//   overflow: visible;

//   &::before,
//   &::after {
//     position: absolute;
//     visibility: hidden;
//     opacity: 0;
//     z-index: 1000000;
//     pointer-events: none;

//     ${(props) => css`
//       top: ${tooltipPositioning[props.tooltipPosition].top};
//       bottom: ${tooltipPositioning[props.tooltipPosition].bottom};
//     `}
//   }

//   &::before {
//     content: '';
//     position: absolute;
//     background: transparent;
//     border: 6px solid;
//     z-index: 1000001;

//     ${(props) => css`
//       border-color: ${tooltipPositioning[props.tooltipPosition].borderColor};
//     `}
//   }

//   &::after {
//     content: attr(aria-label);
//     padding: 6px 8px;

//     background: var(--cc_color_button_background_secondary);
//     border-radius: var(--cc_size_border_radius_l);
//     box-shadow: none;

//     color: var(--cc_color_button_text_secondary);
//     font-weight: 500;
//     font-size: 11px;
//     line-height: 1.5;
//     white-space: nowrap;
//     text-shadow: none;

//     ${(props) => css`
//       transform: ${tooltipPositioning[props.tooltipPosition].transform};
//       left: ${tooltipPositioning[props.tooltipPosition].left};
//       right: ${tooltipPositioning[props.tooltipPosition].right};
//     `}
//   }

//   &:hover::before,
//   &:hover::after {
//     visibility: visible;
//     opacity: 1;
//   }
// `;

const avatarSizes = {
  large: tokens.size_avatar_l,
  medium: tokens.size_avatar_m,
  small: tokens.size_avatar_s,
  tiny: tokens.size_avatar_xs,
};

const Image = styled.div`
  position: relative;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  height: ${(props) => `${props.avatarSize}px`};
  width: ${(props) => `${props.avatarSize}px`};
  line-height: ${(props) => `${props.avatarSize}px`};
  background-image: url(${(props) => props.imageSrc});
  background-size: cover;
  background-position: 50%;
  background-color: var(--cc_color_background_3);
  border: ${(props) => props.avatarColor ? `2px solid ${props.avatarColor}` : null };
  color: var(--cc_color_text_subtle);
  /* ${(props) => props.showNameOnHover ? hintTooltipStyles : null}; */
`;

const Initials = styled.div`
  font-size: ${(props) => `${props.textSize}px`};
  font-weight: 700;
  text-align: center;
  font-family: 'Averta', system-ui, sans-serif;
  text-transform: uppercase;
`;

// const IconBadgeBase = styled.i`
//   position: absolute;
//   top: -8px;
//   right: -8px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: ${(props) => `${props.iconSize}px`};
//   height: ${(props) => `${props.iconSize}px`};
//   padding: ${(props) => `${props.padding}px`};
//   background: var(--cc_color_button_background_secondary);
//   border-radius: 50%;
//   color: white;
//   font-size: ${(props) => `${props.iconSize}px`};
//   box-sizing: content-box;

//   &::before, &::after {
//     box-sizing: content-box;
//   }
// `;

// const IconBadge = ({ avatarSize, iconName }) => {
//   const iconSize = Math.round(avatarSize / 4 + 6);
//   const padding = Math.round(avatarSize / 16);
//   return <IconBadgeBase className={`mdi mdi-${iconName}`} padding={padding} iconSize={iconSize} />
// };

const AvatarInitials = ({ initials, avatarSize }) => {
  const textSize = Math.round(avatarSize / 2.5);
  return <Initials textSize={textSize}>{initials}</Initials>;
};

const Avatar = ({
  name,
  src,
  size,
  color,
  iconName,
  customInitials,
  className,
  style,
}) => {
  const avatarSize = typeof size === 'number' ? size : avatarSizes[size];
  const initials = name ? name.split(' ').map(x => x.charAt(0)).join('').substr(0, 3).toUpperCase() : null
  return (
    <Image
      imageSrc={src}
      avatarSize={avatarSize}
      aria-label={name}
      avatarColor={color}
      iconName={iconName}
      className={className}
      style={style}
    >
      {!src && !initials ? (
        <i className={`mdi mdi-${iconName}`}/>
      ) : null}

      {!src && initials ? (
        <AvatarInitials avatarSize={avatarSize} initials={customInitials ? customInitials : initials} />
      ) : null}

      {name ? ( 
        <ScreenReaderContent>{name}</ScreenReaderContent> 
      ) : null}
    </Image>
  );
};

Avatar.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.oneOf([
      "tiny",
      "small",
      "medium",
      "large",
    ]),
    PropTypes.number,
  ]),
  color: PropTypes.string,
  customInitials: PropTypes.string,
  iconName: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

Avatar.defaultProps = {
  name: undefined,
  src: '',
  size: "medium",
  color: undefined,
  iconName: "account",
  customInitials: undefined,
  className: undefined,
  style: undefined,
};

export default Avatar;
