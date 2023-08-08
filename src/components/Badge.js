import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const getBgColor = (color) => {
  switch (color) {
    case 'info':
      return 'var(--cc_color_background_2)';

    case 'upgrade':
      return 'var(--cc_color_brand_upgrade_alpha_20)';

    case 'assigned':
      return 'rgba(231, 97, 25, 0.2)';

    case 'add_on':
      return 'rgba(121, 73, 209, 0.2)';

    default:
      return `var(--cc_color_utility_${color}_alpha_20)`;
  }
};

const getBorderColor = (color) => {
  switch (color) {
    case 'info':
      return 'var(--cc_color_border_default)';

    case 'upgrade':
      return `var(--cc_color_brand_upgrade_alpha_60)`;

    case 'assigned':
      return 'rgba(231, 97, 25, 0.6)';

    case 'add_on':
      return 'rgba(121, 73, 209, 0.6)';

    default:
      return `var(--cc_color_utility_${color}_alpha_60)`;
  }
};

const Container = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--cc_size_spacing_xs);
  background-color: ${(props) => getBgColor(props.color)};
  border-radius: var(--cc_size_border_radius_pill);
  border: var(--cc_size_border_width_s) solid
    ${(props) => getBorderColor(props.color)};
  padding: ${(props) => props.size === 'small' ? '6px' : 'var(--cc_size_spacing_s)'};
  height: ${(props) => props.size === 'small' ? 'var(--cc_size_avatar_xs)' : 'var(--cc_size_avatar_s)'};
  line-height: 1.5;
`;

const Icon = styled.i`
  color: var(--cc_color_text_default);
  font-size: ${(props) => props.size === 'small' ? '11px' : '14px'};
  line-height: 0;
`;

const Text = styled.span`
  color: var(--cc_color_text_default);
  font-family: 'Averta', system-ui, sans-serif;
  font-weight: 600;
  font-size: ${(props) => props.size === 'small' ? '9px' : '10px'};
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.25px;

  &:empty {
    display: none;
  }
`;

const Badge = ({
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

Badge.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'caution',
    'info',
    'success',
    'destroy',
    'upgrade',
    'add_on',
    'assigned',
  ]),
  iconName: PropTypes.string,
  size: PropTypes.oneOf([
    'small',
    'medium'
  ]),
  style: PropTypes.object,
};

Badge.defaultProps = {
  className: undefined,
  iconName: undefined,
  color: 'info',
  size: "medium",
  style: undefined,
};

export default Badge;
