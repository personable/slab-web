import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { buttonResetStyles, buttonSize } from "./shared/styles";
import Spinner from "./Spinner";

const getPadding = {
  small: "0 calc(var(--cc_size_spacing_s) * 1.25)",
  medium: "0 var(--cc_size_spacing_m)",
  large: "0 var(--cc_size_spacing_l)",
};

const getFontSize = {
  // bump up by 1 because Averta renders smaller than system font
  small: "calc(var(--cc_size_text_xs) + 1px)",
  medium: "calc(var(--cc_size_text_s) + 1px)",
  large: "calc(var(--cc_size_text_m) + 1px)",
};

const getSolidColors = (color) => {
  return `
    color: var(--cc_color_button_text_${color});
    background: var(--cc_color_button_background_${color});
    &:hover {
      background: var(--cc_color_button_background_${color}_darken_10);
    }
  `;
};

const getMinimalOutlineColors = (color, isOutline) => {
  if (color === "destroy" || color === "success") {
    return `
      background: transparent;
      color: var(--cc_color_utility_${color});
      &:hover {
        color: var(--cc_color_utility_${color}_darken_10);
        background: var(--cc_color_button_background_${color}_alpha_10);
      }
      ${
        isOutline
          ? `
              border-color: var(--cc_color_button_background_${color});
              &:hover {
                border-color: var(--cc_color_button_background_${color}_darken_10);
              }
            `
          : null
      }
    `;
  } else {
    return `
      background: transparent;
      color: var(--cc_color_link_${color});
      &:hover {
        background: var(--cc_color_button_background_${color}_alpha_${
      color === "subtle" ? "70" : "10"
    });
        color: var(--cc_color_link_${color}_darken_15);
      }
      ${
        isOutline
          ? `
              border-color: var(--cc_color_link_${color});
              &:hover {
                border-color: var(--cc_color_link_${color}_darken_10);
              }
            `
          : null
      }
  `;
  }
};

// begin styled components
const StyledButton = styled.button`
  ${(props) =>
    buttonResetStyles({ disabled: props.disabled, readOnly: props.readOnly })}
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${(props) => `calc(${getFontSize[props.size]} * 0.25 + 4px)`};
  border: var(--cc_size_border_width_m) solid transparent;
  border-radius: var(--cc_size_border_radius_l);
  font-weight: 700;
  transition: transform 0.25s, color 0.25s, background 0.25s;
  box-sizing: border-box;
  ${(props) =>
    props.isMinimal || props.isOutline
      ? getMinimalOutlineColors(props.buttonColor, props.isOutline)
      : getSolidColors(props.buttonColor)};
  height: ${(props) => buttonSize[props.size]};
  padding: ${(props) => getPadding[props.size]};
  font-family: "Averta", system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: ${(props) => getFontSize[props.size]};

  &:active {
    transform: scale(0.98);
  }
`;

const Text = styled.span`
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${(props) =>
    props.isLoading
      ? css`
          visibility: hidden;
        `
      : null}
`;

const StyledSpinner = styled(Spinner)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

const Icon = styled.i`
  // make icons render at the font size + 4px
  font-size: ${(props) => `calc(${getFontSize[props.buttonSize]} + 4px)`};
  ${(props) =>
    props.isLoading
      ? css`
          visibility: hidden;
        `
      : null}
`;

const Fart = styled.i``;
// end styled components

const Button = ({
  children,
  className,
  color,
  disabled,
  href,
  iconName,
  iconPosition,
  loading,
  minimal,
  onClick,
  outline,
  readOnly,
  size,
  style,
  type,
  ...props
}) => {
  const handleClick = (e) => {
    if (disabled || readOnly) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (typeof onClick === "function" && !href) {
      onClick(e);
    }
  };

  const iconContent = iconName ? (
    <Icon
      className={`mdi mdi-${iconName}`}
      buttonSize={size}
      isLoading={loading}
    />
  ) : null;

  return (
    <StyledButton
      as={href ? "a" : "button"}
      buttonColor={color}
      onClick={handleClick}
      href={href}
      disabled={disabled}
      isMinimal={minimal}
      isOutline={outline}
      readOnly={readOnly}
      size={size}
      type={!href ? type : null}
      className={className}
      style={style}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {iconPosition === "before" ? iconContent : null}
      <Text isLoading={loading}>{children}</Text>
      {iconPosition === "after" ? iconContent : null}
      {loading ? (
        <StyledSpinner
          accessibilityLabel="Loading"
          size={size === "large" ? 20 : "tiny"}
          trackColor="rgba(0, 0, 0, 0.2)"
          meterColor="currentColor"
        />
      ) : null}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    "destroy",
    "primary",
    "secondary",
    "subtle",
    "success",
  ]),
  disabled: PropTypes.bool,
  href: PropTypes.string,
  iconName: PropTypes.string,
  iconPosition: PropTypes.oneOf(["before", "after"]),
  loading: PropTypes.bool,
  minimal: PropTypes.bool,
  onClick: PropTypes.func,
  outline: PropTypes.bool,
  readOnly: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  style: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  type: PropTypes.string,
};

Button.defaultProps = {
  className: undefined,
  color: "subtle",
  disabled: false,
  iconName: undefined,
  iconPosition: "before",
  loading: false,
  minimal: false,
  onClick: () => {},
  outline: false,
  readOnly: false,
  size: "medium",
  style: undefined,
  type: "button",
};

export default Button;
