import styled from "styled-components";
import React from 'react';
import PropTypes from 'prop-types';
import * as tokens from "./shared/tokens.js";

// end styled components
const getSize = (size) => {
  if (size === 'small') {
    return 'var(--cc_size_avatar_xs)';
  } else {
    return 'var(--cc_size_avatar_s)';
  }
};

const getFontSize = (size) => {
  if (size === 'small') {
    return '9';
  } else {
    return '10';
  }
};

const getIconSize = (size) => {
  if (size === 'small') {
    return '12';
  } else {
    return '14';
  }
};

const getHorizontalPadding = (size) => {
  if (size === 'small') {
    return '6px';
  } else {
    return 'var(--cc_size_spacing_s)';
  }
};

const getBgColor = (color) => {
  if (color === 'info') {
    return 'var(--cc_color_background_2)';
  } else if (color === 'upgrade' || color === 'add_on') {
    return `var(--cc_color_brand_${color}_alpha_20)`;
  } else {
    return `var(--cc_color_utility_${color}_alpha_20)`;
  }
};

const getBorderColor = (color) => {
  if (color === 'info') {
    return 'var(--cc_color_border_default)';
  } else if (color === 'upgrade' || color === 'add_on') {
    return `var(--cc_color_brand_${color}_alpha_60)`;
  } else {
    return `var(--cc_color_utility_${color}_alpha_60)`;
  }
};

const Container = styled.span`
  display: inline-flex;
  align-items: center;
  /* height: var(--cc_size_avatar_s); */
  /* padding: 0 var(--cc_size_spacing_s); */
  background-color: ${(props) => getBgColor(props.color)};
  border-radius: var(--cc_size_border_radius_pill);
  border: var(--cc_size_border_width_s) solid
    ${(props) => getBorderColor(props.color)};
  padding: ${(props) => `0 ${getHorizontalPadding(props.size)}`};
  height: ${(props) => getSize(props.size)};
`;
const Icon = styled.i`
  color: var(--cc_color_text_subtle);
  font-size: 15px;
  font-size: ${(props) => getIconSize(props.size)}px;
  margin-inline-end: var(--cc_size_spacing_xs);
`;
const Text = styled.span`
  color: var(--cc_color_text_subtle);
  font-family: 'Averta', system-ui, sans-serif;
  /* font-size: var(--cc_size_text_xxs); */
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.25px;
  font-size: ${(props) => getFontSize(props.size)}px;
`;

const BadgeStatus = ({
    children,
    className,
    color,
    iconName,
    size,
    style 
  }) => {
  return (
    <Container size={size} className={className} color={color} style={style}>
      {iconName ? <Icon size={size} className={`mdi mdi-${iconName}`} /> : null}
      <Text size={size}>{children}</Text>
    </Container>
  );
};

BadgeStatus.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'caution',
    'info',
    'success',
    'destroy',
    'upgrade',
    'add_on',
  ]),
  iconName: PropTypes.string,
  size: PropTypes.oneOf([
    'small',
    'medium'
  ]),
  style: PropTypes.object,
};

BadgeStatus.defaultProps = {
  className: undefined,
  iconName: undefined,
  color: 'info',
  size: "medium",
  style: undefined,
};

export default BadgeStatus;
