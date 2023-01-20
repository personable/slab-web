import React, { useCallback, useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import PropTypes from "prop-types";
import {
  arrow,
  autoUpdate,
  FloatingFocusManager,
  FloatingPortal,
  useFloating,
  shift,
  offset,
  flip,
  useInteractions,
  useRole,
  useDismiss,
  useClick,
  useHover,
  useFocus,
} from "@floating-ui/react-dom-interactions";
import * as tokens from "./tokens";

const floatingEnter = keyframes`
  to {
    opacity: 1;
    transform: scale(1) translate3d(0, 0, 0);
  }
`;

const getFloatingOffset = (placement, animateOffset) => {
  if (placement.includes("top")) {
    return `0, ${animateOffset}px`;
  } else if (placement.includes("bottom")) {
    return `0, -${animateOffset}px`;
  } else if (placement.includes("left")) {
    return `${animateOffset}px, 0`;
  } else if (placement.includes("right")) {
    return `-${animateOffset}px, 0`;
  } else {
    return "0, 0";
  }
};

/* really faint tint of black, to give arrow some definition */
const faintArrowOutline = "rgba(0, 0, 0, 0.075)";

const Floating = styled.div`
  ${(props) => `
    border-radius: var(--cc_size_border_radius_${props.borderRadius});
    background: var(--cc_color_background_${props.background});
    box-shadow: 0 var(--cc_size_depth_${props.depth}_y)
      var(--cc_size_depth_${props.depth}_blur)
      var(--cc_color_depth_${props.depth});
    transform: translate3d(
      ${getFloatingOffset(props.placement, props.animateOffset)},
      0
    );
  `}
  opacity: 0;
  animation-name: ${floatingEnter};
  animation-delay: 0.1s;
  animation-duration: 0.2s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  max-height: 100vh;
  max-width: 100vh;
`;

const getBorderSides = (staticSide) => {
  switch (staticSide) {
    case "top":
      return ["top", "left"];
    case "bottom":
      return ["bottom", "right"];
    case "left":
      return ["left", "bottom"];
    case "right":
      return ["right", "top"];
    default:
      return [];
  }
};

const Arrow = styled.span`
  position: absolute;
  display: block;
  height: ${(props) => props.arrowSize}px;
  width: ${(props) => props.arrowSize}px;
  transform: rotate(45deg);
  ${(props) => css`
    background: ${`var(--cc_color_background_${props.background})`};
    border-${
      getBorderSides(props.staticSide)[0]
    }: var(--cc_size_border_width_s) solid ${faintArrowOutline};
    border-${
      getBorderSides(props.staticSide)[1]
    }: var(--cc_size_border_width_s) solid ${faintArrowOutline};
  `}
`;

const HandleOverflow = styled.span`
  display: block;
  max-height: 100vh;
  max-width: 100vh;
  overflow: auto;
`;

const FloatingUIBase = ({
  animateOffset,
  children,
  placement,
  trigger,
  triggerOffset,
  isOpen,
  onOpenChange,
  arrowSize,
  arrowStyle,
  style,
  showArrow,
  shouldTrapFocus,
  className,
  ccBackground,
  ccDepth,
  ccBorderRadius,
  mountNodeId,
  id,
  role,
  interactions,
  flipOptions,
}) => {
  const arrowRef = useRef(null);
  const {
    x,
    y,
    reference,
    floating,
    strategy,
    context,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
    update,
  } = useFloating({
    open: isOpen,
    onOpenChange,
    middleware: [
      offset(triggerOffset || null),
      // if you're looking for all possible flipOptions, make some tea and give https://floating-ui.com/docs/flip a gander
      flipOptions ? flip(flipOptions) : flip(),
      shift(),
      arrow({ element: arrowRef }),
    ],
    placement,
    whileElementsMounted: autoUpdate,
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context, { enabled: interactions.click }),
    useFocus(context, { enabled: interactions.focus }),
    useHover(context, { enabled: interactions.hover }),
    useRole(context, { role }),
    useDismiss(context),
  ]);

  const Trigger = trigger;

  const staticSide = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
  }[placement.split("-")[0]];

  const hideArrow = !showArrow || placement !== context.placement;

  const arrowCallback = useCallback(
    (node) => {
      arrowRef.current = node;
      update();
    },
    [update]
  );

  return (
    <>
      {React.cloneElement(Trigger, {
        type: "button",
        ...getReferenceProps({ ref: reference }),
      })}
      <FloatingPortal id={mountNodeId || null}>
        {isOpen ? (
          <FloatingFocusManager context={context} modal={shouldTrapFocus}>
            <Floating
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...getFloatingProps({
                className,
                id,
                ref: floating,
                style: {
                  position: strategy,
                  left: x ?? "",
                  top: y ?? "",
                  ...style,
                },
              })}
              placement={context.placement}
              animateOffset={animateOffset}
              borderRadius={ccBorderRadius}
              background={ccBackground}
              depth={ccDepth}
            >
              {!hideArrow ? (
                <Arrow
                  ref={arrowCallback}
                  style={{
                    left: arrowX !== null ? `${arrowX}px` : "",
                    top: arrowY !== null ? `${arrowY}px` : "",
                    right: "",
                    bottom: "",
                    [staticSide]: `-${arrowSize / 2}px`,
                    ...arrowStyle,
                  }}
                  background={ccBackground}
                  arrowSize={arrowSize}
                  staticSide={staticSide}
                />
              ) : null}
              <HandleOverflow
                borderRadius={ccBorderRadius}
                background={ccBackground}
              >
                {children}
              </HandleOverflow>
            </Floating>
          </FloatingFocusManager>
        ) : null}
      </FloatingPortal>
    </>
  );
};

FloatingUIBase.propTypes = {
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
  animateOffset: PropTypes.number,
  triggerOffset: PropTypes.number,
  isOpen: PropTypes.bool,
  onOpenChange: PropTypes.func,
  arrowSize: PropTypes.number,
  showArrow: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  arrowStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.string,
  shouldTrapFocus: PropTypes.bool,
  ccBackground: PropTypes.oneOf([1, 2, 3]),
  ccDepth: PropTypes.oneOf([1, 2, 3]),
  ccBorderRadius: PropTypes.oneOf(["s", "m", "l", "xl", "xxl"]),
  id: PropTypes.string,
  mountNodeId: PropTypes.string,
  role: PropTypes.oneOf(["dialog", "menu", "listbox"]),
  interactions: PropTypes.shape({
    click: PropTypes.bool,
    focus: PropTypes.bool,
    hover: PropTypes.bool,
  }),
  flipOptions: PropTypes.object,
};

FloatingUIBase.defaultProps = {
  placement: "bottom",
  animateOffset: tokens.size_spacing_m,
  triggerOffset: tokens.size_spacing_s,
  isOpen: true,
  onOpenChange: () => {},
  arrowSize: 12,
  showArrow: false,
  shouldTrapFocus: true,
  style: undefined,
  arrowStyle: undefined,
  className: undefined,
  ccBackground: 1,
  ccDepth: 3,
  ccBorderRadius: "l",
  id: undefined,
  mountNodeId: undefined,
  role: "dialog",
  interactions: {
    click: true,
    focus: false,
    hover: false,
  },
  flipOptions: null,
};

export default FloatingUIBase;
