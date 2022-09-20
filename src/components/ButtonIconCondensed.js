import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import ButtonIcon from "./ButtonIcon";

// begin styled components
const StyledButtonIcon = styled(ButtonIcon)`
  width: auto;
  height: auto;
`;
// end styled components

const ButtonIconCondensed = ({ accessibilityLabel, size, color, ...props }) => {
  return (
    <StyledButtonIcon
      accessibilityLabel={accessibilityLabel}
      minimal={true}
      size={size}
      color={color}
      {...props}
    />
  );
};

ButtonIconCondensed.propTypes = {
  accessibilityLabel: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "destroy",
    "primary",
    "secondary",
    "subtle",
    "success",
  ]),
};

ButtonIconCondensed.defaultProps = {
  color: "subtle",
  size: "medium",
};

export default ButtonIconCondensed;
