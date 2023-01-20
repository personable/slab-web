import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

// begin styled components
const Layout = styled.span`
  width: ${(props) => props.facadeSize}px;
  height: ${(props) => props.facadeSize}px;
  position: relative;
  border-radius: ${(props) =>
    props.facadeShape === "circle" ? "100%" : "var(--cc_size_border_radius_m)"};
`;
const HoverHighlight = styled.span`
  width: ${(props) => props.facadeSize * 2}px;
  height: ${(props) => props.facadeSize * 2}px;
  background: var(--cc_color_button_background_tint);
  display: block;
  position: absolute;
  top: -${(props) => props.facadeSize / 2}px;
  left: -${(props) => props.facadeSize / 2}px;
  border-radius: 100%;
  transform: scale(${(props) => (props.isHovered ? "1" : "0.5")});
  opacity: ${(props) => (props.isHovered ? "1" : "0")};
  transition: 0.3s all ease-out;
`;
const FauxInput = styled.span`
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: ${(props) =>
    props.facadeShape === "circle" ? "100%" : "var(--cc_size_border_radius_m)"};
  border-width: var(--cc_size_border_width_s);
  border-style: solid;

  /* style changes when checked */
  ${(props) =>
    props.isChecked
      ? css`
          background: ${props.color
            ? `var(--cc_color_utility_${props.color})`
            : "var(--cc_color_button_background_secondary)"};
          border-color: ${props.color
            ? `var(--cc_color_utility_${props.color})`
            : "var(--cc_color_button_background_secondary)"};
        `
      : css`
          background: transparent;
          border-color: ${props.color
            ? `var(--cc_color_utility_${props.color})`
            : "var(--cc_color_border_input_inactive)"};
        `}
`;
const Icon = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  fill: var(--cc_color_button_text_secondary);
  width: ${(props) => props.facadeSize * 0.75}px;
  height: ${(props) => props.facadeSize * 0.75}px;
`;
// end styled components

const getSVGPaths = (type) => {
  switch (type) {
    case "checkbox":
      return (
        <>
          <rect
            x="20.1216"
            y="3.88324"
            width="4.23919"
            height="20.1362"
            transform="rotate(45 20.1216 3.88324)"
          />
          <rect
            x="1.38687"
            y="13.6253"
            width="4.23919"
            height="6.35879"
            transform="rotate(-45 1.38687 13.6253)"
          />
        </>
      );
    case "radio":
      return (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
          fill="white"
        />
      );
    case "indeterminate":
      return <rect x="3" y="10" width="18" height="4" />;
    default:
      return null;
  }
};

const CheckboxRadioFacade = ({
  type,
  shape,
  color,
  isChecked,
  isHovered,
  isDisabled,
  size,
  className,
  style
}) => {
  return (
    <Layout
      facadeSize={size}
      facadeShape={shape}
      className={className}
      style={style}
    >
      {!isDisabled ? (
        <HoverHighlight facadeSize={size} isHovered={isHovered} />
      ) : null}
      <FauxInput
        aria-hidden="true"
        facadeType={type}
        facadeShape={shape}
        facadeSize={size}
        isChecked={isChecked}
        color={color}
      >
        {isChecked ? (
          <Icon viewBox="0 0 24 24" facadeSize={size}>
            {getSVGPaths(type)}
          </Icon>
        ) : null}
      </FauxInput>
    </Layout>
  );
};

CheckboxRadioFacade.propTypes = {
  type: PropTypes.oneOf(["checkbox", "radio", "indeterminate"]).isRequired,
  shape: PropTypes.oneOf(["square", "circle"]).isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.oneOf([undefined, "success", "caution", "destroy"]),
  isChecked: PropTypes.bool,
  isHovered: PropTypes.bool,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
CheckboxRadioFacade.defaultProps = {
  color: undefined,
  isChecked: false,
  isHovered: false,
  isDisabled: false,
  className: undefined,
  style: undefined
};

export default CheckboxRadioFacade;
