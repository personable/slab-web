import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// begin styled components
const Container = styled.div`
  text-align: center;
  background-color: var(--cc_color_background_3);
  color: var(--cc_color_text_subtle);
  padding: var(--cc_size_spacing_m);
  border-radius: var(--cc_size_border_radius_l);
`;

const Heading = styled.h1`
  margin: 0 0 var(--cc_size_spacing_s);
  font-family: Averta, sans-serif;
  font-weight: 800;
  color: var(--cc_color_text_default);
`;
// end styled components

const MyComponent = ({ someProp }) => {
  return (
    <Container>
      <Heading>MyComponent</Heading>
      {someProp}
    </Container>
  );
};

MyComponent.propTypes = {
  someProp: PropTypes.string,
};
MyComponent.defaultProps = {
  someProp: "Hi, someone!",
};
export default MyComponent;
