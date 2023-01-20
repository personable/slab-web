import { cloneElement, useCallback, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import {
  arrow,
  offset,
  flip,
  shift,
  autoUpdate,
  useFloating,
  useInteractions,
  useHover,
  useFocus,
  useRole,
  useDismiss
} from "@floating-ui/react-dom-interactions";

import * as tokens from "./tokens.js";

const arrowSize = tokens.size_spacing_s;

const getFloatingAnimateOffset = (animateOffset) => {
  return {
    bottom: `0, -${animateOffset}px`,
    top: `0, ${animateOffset}px`,
    left: `${animateOffset}px, 0`,
    right: `-${animateOffset}px, 0`
  };
};

const floatingEnter = keyframes`
  to {
    opacity: 1;
    transform: scale(1) translate3d(0, 0, 0);
  }
`;

const Floating = styled.span`
  z-index: 1;
  transform: translate3d(
    ${(props) =>
      getFloatingAnimateOffset(props.animateOffset)[props.placement]},
    0
  );

  opacity: 0;
  animation-name: ${floatingEnter};
  animation-delay: 0.1s;
  animation-duration: 0.2s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  pointer-events: none;
  background: ${tokens.color_background_2_de};
  color: ${tokens.color_text_default_de};
  border-radius: var(--cc_size_border_radius_l);
  box-shadow: 0 var(--cc_size_depth_2_y) var(--cc_size_depth_2_blur)
    var(--cc_color_depth_2);
  padding: calc(var(--cc_size_spacing_m) - 4px) var(--cc_size_spacing_m);
  font-size: var(--cc_size_text_xs);
  font-weight: 400;
  line-height: calc(var(--cc_size_text_xs) + 4px);
  text-align: center;
  max-width: 200px;
`;

const Arrow = styled.span`
  position: absolute;
  display: block;
  height: ${arrowSize}px;
  width: ${arrowSize}px;
  transform: rotate(45deg);
  background: ${tokens.color_background_2_de};
`;

const Tooltip = ({
  animateOffset,
  children,
  trigger,
  placement: preferredPlacement
}) => {
  const [open, setOpen] = useState(false);
  const arrowRef = useRef(null);
  const {
    x,
    y,
    reference,
    floating,
    strategy,
    context,
    placement,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} }
  } = useFloating({
    placement: preferredPlacement,
    open,
    onOpenChange: setOpen,
    middleware: [
      offset(tokens.size_spacing_s),
      flip({
        fallbackPlacements: ["right", "top", "left"],
        fallbackStrategy: "initialPlacement",
        flipAlignment: false
      }),
      shift({ padding: tokens.size_spacing_s }),
      arrow({ element: arrowRef })
    ],
    whileElementsMounted: autoUpdate
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context),
    useFocus(context),
    useRole(context, { role: "tooltip" }),
    useDismiss(context)
  ]);

  const staticSide = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right"
  }[placement.split("-")[0]];

  const Trigger = trigger;

  return (
    <>
      {cloneElement(
        Trigger,
        getReferenceProps({ ref: reference, ...Trigger.props })
      )}
      {open && (
        <Floating
          {...getFloatingProps({
            ref: floating,
            className: "Tooltip",
            style: {
              position: strategy,
              top: y ?? 0,
              left: x ?? 0
            }
          })}
          animateOffset={animateOffset}
          placement={context.placement}
        >
          <Arrow
            ref={arrowRef}
            style={{
              left: arrowX !== null ? `${arrowX}px` : "",
              top: arrowY !== null ? `${arrowY}px` : "",
              right: "",
              bottom: "",
              [staticSide]: `-${arrowSize / 2}px`
            }}
          />
          {children}
        </Floating>
      )}
    </>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  trigger: PropTypes.node.isRequired,
  animateOffset: PropTypes.number,
  placement: PropTypes.oneOf(["top", "right", "bottom", "left"])
};
Tooltip.defaultProps = {
  animateOffset: tokens.size_spacing_s,
  placement: "top"
};

export default Tooltip;
