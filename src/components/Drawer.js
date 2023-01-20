import React from "react";
import styled, { css, keyframes } from "styled-components";
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useFloating,
  useInteractions,
  useRole,
  useDismiss,
  useClick,
} from "@floating-ui/react-dom-interactions";
import PropTypes from "prop-types";

const floatingEnter = keyframes`
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const getFloatingPosition = {
  bottom: css`
    left: 0;
    bottom: 0;
    width: 100%;
  `,
  top: css`
    left: 0;
    top: 0;
    width: 100%;
  `,
  left: css`
    left: 0;
    top: 0;
    height: 100%;
  `,
  right: css`
    right: 0;
    top: 0;
    height: 100%;
  `,
};

const getFloatingAnimateOffset = (animateOffset) => {
  return {
    bottom: `0, ${animateOffset}px`,
    top: `0, -${animateOffset}px`,
    left: `-${animateOffset}px, 0`,
    right: `${animateOffset}px, 0`,
  };
};

const StyledFloatingOverlay = styled(FloatingOverlay)`
  z-index: 1;
  background: rgba(20, 35, 52, 0.75);
  transform: translate3d(0, 0, 0);
  opacity: 0;
  animation-name: ${floatingEnter};
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
`;

const Floating = styled.div`
  max-height: 100%;
  max-width: 100%;
  overflow: auto;
  position: absolute;
  z-index: 1;
  ${(props) => `
    background: var(--cc_color_background_${props.background});
    box-shadow: 0 var(--cc_size_depth_${props.depth}_y)
      var(--cc_size_depth_${props.depth}_blur)
      var(--cc_color_depth_${props.depth});
    transform: translate3d(
      ${getFloatingAnimateOffset(props.animateOffset)[props.placement]},
      0
    );
    ${getFloatingPosition[props.placement]}
  `}
  opacity: 0;
  animation-name: ${floatingEnter};
  animation-delay: 0.2s;
  animation-duration: 0.2s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
`;

const Drawer = ({
  animateOffset,
  children,
  placement,
  trigger,
  isFullScreen,
  isOpen,
  onOpenChange,
  style,
  shouldTrapFocus,
  className,
  ccBackground,
  ccDepth,
  mountNodeId,
}) => {
  const { reference, floating, context } = useFloating({
    open: isOpen,
    onOpenChange: onOpenChange,
    placement,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context),
  ]);

  const Trigger = trigger ? trigger : null;

  const floatingEl = (
    <Floating
      {...getFloatingProps({
        className: className ? `CCDrawer ${className}` : "CCDrawer",
        ref: floating,
        style: style,
      })}
      placement={placement}
      animateOffset={animateOffset}
      background={ccBackground}
      depth={ccDepth}
      aria-modal="true"
    >
      {children}
    </Floating>
  );
  return (
    <>
      {trigger
        ? React.cloneElement(Trigger, {
            type: "button",
            ...getReferenceProps({ ref: reference }),
          })
        : null}
      <FloatingPortal id={mountNodeId ? mountNodeId : null}>
        {/* verbose below because focus manager gets weird unless it's repeated */}

        {isOpen && isFullScreen ? (
          <StyledFloatingOverlay
            lockScroll
            style={{
              overflow: "hidden",
            }}
          >
            <FloatingFocusManager context={context} modal={shouldTrapFocus}>
              {floatingEl}
            </FloatingFocusManager>
          </StyledFloatingOverlay>
        ) : null}

        {isOpen && !isFullScreen ? (
          <FloatingFocusManager context={context} modal={shouldTrapFocus}>
            {floatingEl}
          </FloatingFocusManager>
        ) : null}
      </FloatingPortal>
    </>
  );
};

Drawer.propTypes = {
  children: PropTypes.node.isRequired,
  trigger: PropTypes.node,
  placement: PropTypes.oneOf(["top", "right", "bottom", "left"]),
  animateOffset: PropTypes.number,
  isOpen: PropTypes.bool,
  isFullScreen: PropTypes.bool,
  onOpenChange: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.string,
  shouldTrapFocus: PropTypes.bool,
  ccBackground: PropTypes.oneOf([1, 2, 3]),
  ccDepth: PropTypes.oneOf([1, 2, 3]),
  mountNodeId: PropTypes.string,
};

Drawer.defaultProps = {
  placement: "bottom",
  animateOffset: 32,
  isOpen: false,
  isFullScreen: true,
  onOpenChange: () => {},
  style: undefined,
  className: undefined,
  ccBackground: 1,
  ccDepth: 3,
  mountNodeId: undefined,
  shouldTrapFocus: true,
};

export default Drawer;
