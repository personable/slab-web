import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import * as tokens from "./shared/tokens.js";

import {
  HiddenInput,
  CheckboxRadioContainer,
  StyledCheckboxRadioLabel,
  StyledCheckboxRadioFacade,
} from "./shared/styles";

const Checkbox = ({
  checked,
  className,
  borderColor,
  checkedBackgroundColor,
  uncheckedBackgroundColor,
  checkmarkColor,
  disabled,
  id,
  indeterminate,
  label,
  name,
  onClick,
  onFocus,
  onBlur,
  onMouseOver,
  onMouseOut,
  onChange,
  shape,
  size,
  style,
  value,
  ...props
}) => {
  const checkboxRef = useRef();
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

  // Using refs instead of checked attribute to support indeterminate checkbox state:
  // https://www.robinwieruch.de/react-checkbox-indeterminate/
  useEffect(() => {
    if (indeterminate) {
      checkboxRef.current.checked = false;
      checkboxRef.current.indeterminate = true;
    } else if (checked) {
      checkboxRef.current.checked = true;
      checkboxRef.current.indeterminate = false;
    } else {
      checkboxRef.current.checked = false;
      checkboxRef.current.indeterminate = false;
    }
  }, [checked, indeterminate]);

  return (
    <CheckboxRadioContainer className={className} style={style}>
      <HiddenInput
        type="checkbox"
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={handleChange}
        onFocus={onFocus}
        onClick={handleClick}
        value={value}
        ref={checkboxRef}
        checked={checked}
        aria-checked={indeterminate ? "mixed" : undefined}
        disabled={disabled}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
      <StyledCheckboxRadioLabel
        facade={
          <StyledCheckboxRadioFacade
            type={indeterminate ? "indeterminate" : "checkbox"}
            shape={shape}
            isChecked={checked}
            size={size}
            isHovered={isHovered}
            isDisabled={disabled}
            borderColor={borderColor}
            checkedBackgroundColor={checkedBackgroundColor}
            uncheckedBackgroundColor={uncheckedBackgroundColor}
            checkmarkColor={checkmarkColor}
          />
        }
        htmlFor={id}
        content={label}
        isChecked={checked}
        isDisabled={disabled}
        size={size}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        layout="block"
      />
    </CheckboxRadioContainer>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  checked: PropTypes.bool,
  borderColor: PropTypes.string,
  checkedBackgroundColor: PropTypes.string,
  uncheckedBackgroundColor: PropTypes.string,
  checkmarkColor: PropTypes.string,
  disabled: PropTypes.bool,
  indeterminate: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  shape: PropTypes.oneOf(["square", "circle"]),
  size: PropTypes.number,
  value: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
Checkbox.defaultProps = {
  checked: false,
  borderColor: undefined,
  checkedBackgroundColor: undefined,
  uncheckedBackgroundColor: undefined,
  checkmarkColor: undefined,
  disabled: false,
  indeterminate: false,
  shape: "square",
  size: tokens.size_spacing_m,
  onChange: () => {},
  onClick: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onMouseOver: () => {},
  onMouseOut: () => {},
};
export default Checkbox;
