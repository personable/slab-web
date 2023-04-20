import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactModal from "react-modal";

import * as tokens from "../shared/tokens.js";
import ButtonIconCondensed from "../ButtonIconCondensed";
import ScreenReaderContent from "../ScreenReaderContent";
import "./modal.styles.css";

// import ModalToast from "../ModalToast/ModalToast";
// import { useModalToast } from "../ModalToast/useModalToast";

const fullScreenModalStyles = `
  width: calc(100% - var(--cc_size_spacing_xxl));
  height: calc(100% - var(--cc_size_spacing_xxl));
`;

const getSizeStyles = (size) => {
  if (size === "small") {
    return "height: auto; width: 600px;";
  } else if (size === "medium") {
    return "height: auto; width: 900px;";
  } else {
    return fullScreenModalStyles;
  }
};

const StyledReactModal = styled(ReactModal)`
  position: relative;
  background: var(--cc_color_background_1);
  outline: none;
  min-height: 64px;

  /* make box-shadow color always dark mode to look good w/ dark overlay */
  box-shadow: 0 var(--cc_size_depth_1_y) var(--cc_size_depth_1_blur)
    ${tokens.color_depth_1_de};

  @media (max-width: 649px) {
    ${fullScreenModalStyles}
  }
  @media (min-width: 650px) {
    ${(props) => getSizeStyles(props.size)}
  }
`;

const CloseButton = styled(ButtonIconCondensed)`
  position: absolute;
  inset-block-start: var(--cc_size_spacing_m);
  inset-inline-end: var(--cc_size_spacing_m);
  z-index: 1;
`;

const ModalBase = ({
  isOpen,
  label,
  showCloseButton,
  closeButtonStyle,
  shouldCloseOnOverlayClick,
  onRequestClose,
  children,
  style,
  className,
  size,
  shouldAnimateIn,
}) => {
  // const { toast } = useModalToast();

  let overlayClassName = "modal-base";
  if (!shouldAnimateIn) {
    overlayClassName += "modal-base--no-animation";
  }

  let contentClassName = `modal-base ${className || ""}`;
  if (!shouldAnimateIn) {
    contentClassName += "modal-base--no-animation";
  }

  return (
    <StyledReactModal
      // how long should the modal hang around before it unmounts
      // coordinate with longest transition in .modal-base {} in modal.styles.css
      closeTimeoutMS={300}
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      contentLabel={label}
      overlayClassName={overlayClassName}
      className={contentClassName}
      style={style}
      size={size}
    >
      {showCloseButton && (
        <CloseButton
          minimal
          iconName="close"
          size="large"
          onClick={onRequestClose}
          style={closeButtonStyle}
          data-testid="shared__modal-close-button"
          accessibilityLabel="Close Modal Button"
        >
          <ScreenReaderContent>Close Modal</ScreenReaderContent>
        </CloseButton>
      )}
      {children}
      {/* {toast ? (
        <ModalToast
          type={toast.type}
          message={toast.message}
          actionMessage={toast.actionMessage}
          onActionPress={toast.onActionPress}
          toastDuration={toast.toastDuration}
        />
      ) : null} */}
    </StyledReactModal>
  );
};

ModalBase.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  label: PropTypes.string,
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  showCloseButton: PropTypes.bool,
  shouldCloseOnOverlayClick: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.string,
  closeButtonStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  shouldAnimateIn: PropTypes.bool,
};

ModalBase.defaultProps = {
  isOpen: false,
  onRequestClose: () => {},
  label: "Modal Content",
  showCloseButton: true,
  shouldCloseOnOverlayClick: true,
  size: "medium",
  closeButtonStyle: {},
  style: {},
  className: undefined,
  shouldAnimateIn: true,
};

export default ModalBase;
