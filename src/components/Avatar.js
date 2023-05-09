import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';
import ScreenReaderContent from './shared/ScreenReaderContent';
import * as tokens from "./shared/tokens.js";

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
`;

const Initials = styled.div`
  font-size: ${(props) => `${props.textSize}px`};
  font-weight: 700;
  text-align: center;
  font-family: 'Averta', system-ui, sans-serif;
  text-transform: uppercase;
`;

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

AvatarInitials.propTypes = {
  initials: PropTypes.string,
  avatarSize: PropTypes.number,
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
