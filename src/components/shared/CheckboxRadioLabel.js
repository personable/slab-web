import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import * as tokens from "./tokens.js";

//
// start styled-components
//

const disabledStyles = css`
  opacity: 0.5;
  pointer-events: none;
`;

const sharedLabelTextStyles = css`
  cursor: pointer;
  font-weight: 400;
  user-select: none;
  margin: 0;
`;

// layout==="block" styles
const LabelBlock = styled.label`
  ${sharedLabelTextStyles}
  display: flex;
  gap: var(--cc_size_spacing_s);
  align-items: flex-start;
  ${(props) => (props.isDisabled ? disabledStyles : null)}
`;
// whole lot of calculation so the line-height of the text
// is always centered with the checkbox in radios and checkboxes
// where the label text breaks onto multiple lines
const getTextStyles = (size) => {
  const largeText = size >= 20;
  const fontSize = largeText ? tokens.size_text_m : tokens.size_text_s;
  const lineHeight = fontSize + 4;
  const yOffset = (size - lineHeight) / 2;

  return css`
    font-size: ${fontSize}px;
    line-height: ${lineHeight}px;
    transform: translateY(${yOffset}px);
  `;
};

// layout==="inline" styles
const LabelInline = styled.label`
  ${sharedLabelTextStyles}
  font-size: var(--cc_size_text_s);
  padding: 0 12px;
  height: var(--cc_size_avatar_m);
  line-height: 1;
  border-radius: var(--cc_size_border_radius_m);
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: transform 0.2s ease-out;
  &:active {
    transform: translate3d(0, 2px, 0);
  }
  &:hover {
    ${(props) =>
      !props.isChecked && !props.aboutisDisabled
        ? css`
            background: var(--cc_color_button_background_tint);
          `
        : null}
  }
  ${(props) => `
    background: ${
      props.isChecked
        ? "var(--cc_color_button_background_secondary)"
        : "transparent"
    };
    color: ${
      props.isChecked
        ? "var(--cc_color_button_text_secondary)"
        : "var(--cc_color_link_secondary)"
    };
    ${props.isDisabled ? disabledStyles : null}
  `}
`;
const LabelInlineContent = styled.span`
  ${(props) => getTextStyles(props.facadeSize)}
  flex: 1;
  min-width: 1px;
  color: var(--cc_color_text_default);
  user-select: none;
`;

//
// end styled components
//

const CheckboxRadioLabel = ({
  facade,
  htmlFor,
  content,
  size,
  isChecked,
  isDisabled,
  className,
  style,
  onMouseOver,
  onMouseOut,
  layout,
}) => {
  if (layout === "inline") {
    return (
      <LabelInline
        htmlFor={htmlFor}
        className={className}
        style={style}
        isChecked={isChecked}
        isDisabled={isDisabled}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        {content}
      </LabelInline>
    );
  } else {
    return (
      <LabelBlock
        htmlFor={htmlFor}
        className={className}
        style={style}
        isDisabled={isDisabled}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        {facade || null}
        <LabelInlineContent facadeSize={size}>{content}</LabelInlineContent>
      </LabelBlock>
    );
  }
};

CheckboxRadioLabel.propTypes = {
  facade: PropTypes.node,
  htmlFor: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  size: PropTypes.number.isRequired,
  layout: PropTypes.oneOf(["inline", "block"]).isRequired,
  isChecked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
CheckboxRadioLabel.defaultProps = {
  className: undefined,
  style: undefined,
  onMouseOver: () => {},
  onMouseOut: () => {},
};

export default CheckboxRadioLabel;
