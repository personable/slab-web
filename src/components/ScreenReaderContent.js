import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Hidden = styled.span`
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  border: 0;
`;

const ScreenReaderContent = ({ children }) => {
  return <Hidden>{children}</Hidden>;
};

ScreenReaderContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ScreenReaderContent;
