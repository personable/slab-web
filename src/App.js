import React, { useState } from "react";
import styled from "styled-components";
import "./styles.css";
import MyComponent from "./MyComponent";

const Background = styled.div`
  background: var(--cc_color_background_1);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  padding: var(--cc_size_spacing_xxl) var(--cc_size_spacing_m)
    var(--cc_size_spacing_m);
`;

const Container = styled.div`
  position: relative;
`;

const Button = styled.button`
  position: fixed;
  top: 0;
  right: 0;
  font-size: var(--cc_size_text_m);
`;

export default function App() {
  const [environment, setEnvironment] = useState("light");
  const handleToggle = () => {
    setEnvironment((prevEnvironment) =>
      prevEnvironment === "light" ? "dark" : "light"
    );
  };
  return (
    <Background className={`${environment}-environment`}>
      <Container>
        <Button type="button" onClick={handleToggle}>
          {environment} environment
        </Button>
        <MyComponent someProp="Hi there, CoCamers" />
      </Container>
    </Background>
  );
}
