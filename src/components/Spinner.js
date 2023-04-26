import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

import { avatarSizes } from "./shared/styles";

const meterAnimation = keyframes`
  to {
    stroke-dashoffset: 200;
  }
`;

const svgAnimation = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

const ContentContainer = styled.span`
  display: inline-flex;
  flex-direction: ${(props) =>
    props.layout === "vertical" ? "column" : "row"};
  align-items: center;
`;

const SpinnerLabel = styled.span`
  font-weight: normal;
  font-size: ${(props) => props.labelFontSize}px;
  color: var(--cc_color_text_subtle);
  margin-${(props) =>
    props.layout === "vertical"
      ? "block-start"
      : "inline-start"}: var(--cc_size_spacing_l);
`;

const SpinnerContainer = styled.span`
  display: block;
  position: relative;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;

const SpinnerSVG = styled.svg`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transform: rotate(0turn);
  animation-name: ${svgAnimation};
  animation-duration: 0.75s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

const Track = styled.circle`
  stroke: ${(props) => props.trackColor};
  fill: transparent;
  stroke-width: 28;
`;

const Meter = styled.circle`
  stroke: ${(props) => props.meterColor};
  stroke-width: 28;
  fill: transparent;
  stroke-dasharray: 540;
  stroke-dashoffset: 506;
  animation-name: ${meterAnimation};
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: linear;
`;

const Spinner = ({
  label,
  accessibilityLabel,
  size,
  meterColor,
  trackColor,
  layout,
  className,
  style,
}) => {
  // TODO: change to tokens when they're in their own package
  const avatarSizes = {
    large: 40,
    medium: 32,
    small: 24,
    tiny: 16,
  };
  const spinnerSize = typeof size === "number" ? size : avatarSizes[size];
  const fontSize = spinnerSize <= 24 ? 14 : 16;
  const spinnerContent = (
    <SpinnerContainer size={spinnerSize} className={className} style={style}>
      <SpinnerSVG
        viewBox="0 0 200 200"
        focusable="false"
        data-svg-type="spinner"
      >
        <title>{accessibilityLabel}</title>
        <g role="presentation">
          <Track r="86" cy="100" cx="100" trackColor={trackColor} />
          <Meter r="86" cy="100" cx="100" meterColor={meterColor} />
        </g>
      </SpinnerSVG>
    </SpinnerContainer>
  );
  if (label) {
    return (
      <ContentContainer layout={layout}>
        {spinnerContent}
        <SpinnerLabel labelFontSize={fontSize} layout={layout}>
          {label}
        </SpinnerLabel>
      </ContentContainer>
    );
  } else {
    return spinnerContent;
  }
};

Spinner.propTypes = {
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.node,
  accessibilityLabel: PropTypes.string,
  meterColor: PropTypes.string,
  trackColor: PropTypes.string,
  layout: PropTypes.oneOf(["vertical", "horizontal"]),
  className: PropTypes.string,
  style: PropTypes.object,
};

Spinner.defaultProps = {
  size: "medium",
  label: undefined,
  accessibilityLabel: undefined,
  meterColor: "var(--cc_color_text_nonessential)",
  trackColor: "var(--cc_color_background_2)",
  layout: "horizontal",
  className: undefined,
  style: undefined,
};

export default Spinner;
