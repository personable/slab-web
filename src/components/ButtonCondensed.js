import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "./Button";

// begin styled components
const StyledButton = styled(Button)`
  padding: 0 0.25ch;
  height: auto;
  line-height: inherit;
  vertical-align: baseline;
  border-radius: var(--cc_size_border_radius_m);
`;
// end styled components

const ButtonCondensed = ({ size, color, ...props }) => {
  return <StyledButton {...props} minimal size={size} color={color} />;
};

ButtonCondensed.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "destroy",
    "primary",
    "secondary",
    "subtle",
    "success",
  ]),
};

ButtonCondensed.defaultProps = {
  color: "subtle",
  size: "medium",
};

export default ButtonCondensed;
