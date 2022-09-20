import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import Button from "./Button";
import ScreenReaderContent from "./ScreenReaderContent";
import { buttonSize } from "./shared/styles";

// begin styled components
const StyledButton = styled(Button)`
  padding: 0;
  gap: 0;
  width: ${(props) => buttonSize[props.size]};
  ${(props) => (props.shape === "circle" ? "border-radius: 100%;" : null)}
`;
// end styled components

const ButtonIcon = ({
  accessibilityLabel,
  size,
  color,
  minimal,
  shape,
  ...props
}) => {
  return (
    <StyledButton
      minimal={minimal}
      outline={false}
      size={size}
      color={color}
      shape={shape}
      {...props}
    >
      <ScreenReaderContent>{accessibilityLabel}</ScreenReaderContent>
    </StyledButton>
  );
};

ButtonIcon.propTypes = {
  accessibilityLabel: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "destroy",
    "primary",
    "secondary",
    "subtle",
    "success",
  ]),
  minimal: PropTypes.bool,
  shape: PropTypes.oneOf(["square", "circle"]),
};

ButtonIcon.defaultProps = {
  color: "subtle",
  size: "medium",
  minimal: false,
  shape: "circle",
};

export default ButtonIcon;
