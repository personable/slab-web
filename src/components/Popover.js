import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import ScreenReaderContent from "./ScreenReaderContent";
import FloatingUIBase from "./shared/FloatingUIBase";
import { buttonResetStyles } from "./shared/styles";

// #region styled-components
const closeButtonSize = "24px";

const Container = styled.span`
  display: block;
  position: relative;
  ${(props) =>
    props.showCloseButton
      ? css`
          padding-block-start: calc(
            var(--cc_size_spacing_xs) + ${closeButtonSize}
          );
        `
      : null}
`;

const CloseButton = styled.button`
  ${buttonResetStyles}
  position: absolute;
  inset-inline-end: var(--cc_size_spacing_xs);
  inset-block-start: var(--cc_size_spacing_xs);
  z-index: 1;
  font-size: var(--cc_size_text_l);
  color: var(--cc_color_link_subtle);
  width: ${closeButtonSize};
  height: ${closeButtonSize};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  border-radius: 100%;

  &:hover {
    color: var(--cc_color_link_secondary);
  }
`;

const CloseSVG = styled.svg`
  fill: currentColor;
  width: 10px;
  height: 10px;
`;
// #endregion
const Popover = ({
  children,
  trigger,
  placement,
  isOpen,
  onOpenChange,
  style,
  className,
  ccBackground,
  ccDepth,
  ccBorderRadius,
  mountNodeId,
  id,
  showCloseButton,
  showArrow,
  flipOptions,
}) => {
  return (
    <FloatingUIBase
      trigger={trigger}
      placement={placement}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      style={style}
      className={className}
      ccBackground={ccBackground}
      ccDepth={ccDepth}
      ccBorderRadius={ccBorderRadius}
      mountNodeId={mountNodeId}
      id={id}
      role="dialog"
      shouldTrapFocus
      showArrow={showArrow}
      interactions={{
        click: true,
        focus: false,
        hover: false,
      }}
      // https://floating-ui.com/docs/flip
      flipOptions={flipOptions}
    >
      <Container showCloseButton={showCloseButton}>
        {showCloseButton ? (
          <CloseButton type="button" onClick={onOpenChange}>
            <CloseSVG viewBox="0 0 14 14" aria-hidden="true">
              <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" />
            </CloseSVG>
            <ScreenReaderContent>Close</ScreenReaderContent>
          </CloseButton>
        ) : null}
        {children}
      </Container>
    </FloatingUIBase>
  );
};

Popover.propTypes = {
  children: PropTypes.node.isRequired,
  trigger: PropTypes.node.isRequired,
  placement: PropTypes.oneOf([
    "top",
    "top-start",
    "top-end",
    "right",
    "right-start",
    "right-end",
    "bottom",
    "bottom-start",
    "bottom-end",
    "left",
    "left-start",
    "left-end",
  ]),
  isOpen: PropTypes.bool,
  onOpenChange: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.string,
  ccBackground: PropTypes.oneOf([1, 2, 3]),
  ccDepth: PropTypes.oneOf([1, 2, 3]),
  ccBorderRadius: PropTypes.oneOf(["s", "m", "l", "xl", "xxl"]),
  id: PropTypes.string,
  mountNodeId: PropTypes.string,
  showCloseButton: PropTypes.bool,
  showArrow: PropTypes.bool,
  flipOptions: PropTypes.object,
};
Popover.defaultProps = {
  placement: "bottom",
  isOpen: true,
  onOpenChange: () => {},
  style: undefined,
  className: undefined,
  ccBackground: 1,
  ccDepth: 3,
  ccBorderRadius: "l",
  id: undefined,
  mountNodeId: undefined,
  showCloseButton: false,
  showArrow: false,
  flipOptions: undefined,
};
export default Popover;
