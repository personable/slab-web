/* attaching mouse events to label bc input is hidden */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from "react";
import PropTypes from "prop-types";
import * as tokens from "./tokens.js";

import {
  HiddenInput,
  CheckboxRadioContainer,
  StyledCheckboxRadioLabel,
  StyledCheckboxRadioFacade
} from "./shared/styles";

const RadioButton = ({
  id,
  label,
  value,
  checked,
  contentBefore,
  contentAfter,
  name,
  disabled,
  onClick,
  onChange,
  onFocus,
  onBlur,
  onMouseOver,
  onMouseOut,
  size,
  layout,
  className,
  style,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleChange = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onChange(e);
  };
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick(e);
  };
  const handleMouseOver = (e) => {
    setIsHovered(true);
    onMouseOver(e);
  };
  const handleMouseOut = (e) => {
    setIsHovered(false);
    onMouseOut(e);
  };

  return (
    <CheckboxRadioContainer style={style} className={className}>
      <HiddenInput
        id={id}
        type="radio"
        checked={checked}
        value={value}
        name={name}
        layout={layout}
        disabled={disabled}
        onClick={handleClick}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
        aria-describedby={`${contentBefore ? `${id}-contentBefore` : ""} ${
          contentAfter ? `${id}-contentAfter` : ""
        }`}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
      <StyledCheckboxRadioLabel
        facade={
          <StyledCheckboxRadioFacade
            type="radio"
            shape="circle"
            isChecked={checked}
            size={size}
            isHovered={isHovered}
            isDisabled={disabled}
          />
        }
        htmlFor={id}
        content={label}
        isChecked={checked}
        isDisabled={disabled}
        size={size}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        layout={layout}
      />
    </CheckboxRadioContainer>
  );
};

RadioButton.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  checked: PropTypes.bool,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  layout: PropTypes.oneOf(["block", "inline"]),
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
RadioButton.defaultProps = {
  checked: false,
  disabled: false,
  name: undefined,
  onClick: () => {},
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onMouseOver: () => {},
  onMouseOut: () => {},
  size: tokens.size_avatar_xs,
  layout: "block",
  className: undefined,
  style: undefined
};
export default RadioButton;
/* eslint-enable jsx-a11y/mouse-events-have-key-events */
