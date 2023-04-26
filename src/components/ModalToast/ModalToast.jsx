import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

import * as tokens from "../shared/tokens.js";

import { DEFAULT_TOAST_DURATION_MS } from "./constants";

// #region styled-components
const LiveRegion = styled.div`
  position: absolute;
  top: ${tokens.size_spacing_m}px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: auto;
`;
const toastAnimation = keyframes`
  10% { opacity: 1; transform: translate3d(0, 0, 0); }
  75% { opacity: 1; transform: translate3d(0, 0, 0); }
  80% { opacity: 1; transform: translate3d(0, 0, 0) scale(1.1); }
  90% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
  100% { opacity: 0; transform: translate3d(0, -50%, 0) scale(1); }
`;
const Toast = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.backgroundColor};
  color: ${tokens.color_text_default_de};
  padding: 6px 16px 6px 12px;
  font-size: ${tokens.size_text_s}px;
  font-weight: 600;
  border-radius: ${tokens.size_border_radius_pill}px;
  box-shadow: 0 ${tokens.size_depth_2_y}px ${tokens.size_depth_2_blur}px
    ${tokens.color_depth_2_le};
  opacity: 0;
  transform: translate3d(0, -50%, 0);
  animation-name: ${toastAnimation};
  animation-duration: ${(props) => props.animationDuration};
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;
`;
const ToastIcon = styled.i`
  display: inline-block;
  font-size: 18px;
  color: ${tokens.color_text_default_de};
  margin-inline-end: ${tokens.size_spacing_xs}px;
`;
const ActionText = styled.button`
  font-size: ${tokens.size_text_s}px;
  font-weight: 700;
  margin-left: ${tokens.size_spacing_s}px;
  border-left: 1px solid ${tokens.color_text_default_de};
  border-radius: 0px;
  min-height: 0px;
  padding: 0px 0px 0px ${tokens.size_spacing_s}px !important;
  color: ${tokens.color_text_default_de};

  &:hover {
    color: ${tokens.color_text_default_de};
    text-decoration: underline;
  }
`;
// #endregion

const getToastStyles = (type) => {
  switch (type) {
    case SUCCESS:
      return {
        backgroundColor: tokens.color_utility_success,
        icon: "mdi mdi-check",
      };
    case ERROR:
      return {
        backgroundColor: tokens.color_utility_destroy,
        icon: "mdi mdi-alert-circle",
      };
    default:
      return {
        backgroundColor: tokens.color_background_3_le,
        icon: "mdi mdi-information-outline",
      };
  }
};

const ModalToast = ({
  type = "success",
  message,
  errorMessage,
  successMessage,
  actionMessage,
  onActionPress,
  toastDuration = DEFAULT_TOAST_DURATION_MS,
}) => {
  const DEFAULT_SUCCESS_MESSAGE = successMessage;
  const DEFAULT_ERROR_MESSAGE = errorMessage;

  const renderToastMessage = () => {
    switch (type) {
      case SUCCESS:
        return message || DEFAULT_SUCCESS_MESSAGE;
      case ERROR:
        return message || DEFAULT_ERROR_MESSAGE;
      default:
        return "";
    }
  };

  const renderActionMessage = () => {
    if (!actionMessage || !onActionPress) {
      return null;
    }

    return (
      <ActionText className="ccb-white-minimal-small" onClick={onActionPress}>
        {actionMessage}
      </ActionText>
    );
  };

  const toast = getToastStyles(type);

  return (
    <LiveRegion role="region" aria-live="assertive">
      <Toast
        backgroundColor={toast.backgroundColor}
        animationDuration={`${toastDuration}ms`}
      >
        <ToastIcon className={toast.icon} aria-hidden="true" />
        {renderToastMessage()}
        {renderActionMessage()}
      </Toast>
    </LiveRegion>
  );
};

ModalToast.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
  actionMessage: PropTypes.string,
  onActionPress: PropTypes.func,
  toastDuration: PropTypes.number, // duration of toast in ms
};

export default ModalToast;
