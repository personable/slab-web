import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Spinner from "../Spinner";
import Button from "../Button";
import ModalBase from "./ModalBase";
import ModalAlert from "./ModalAlert";

const StyledModalBase = styled(ModalBase)`
  border-radius: var(--cc_size_border_radius_xl);
  ${(props) => props.size !== "large" && "max-height: 90vh;"}
  ${(props) =>
    !props.loading.isVisible &&
    !props.alert.isVisible &&
    `
      display: grid;
      grid-template-rows: ${props.title ? "auto " : ""}minmax(0, 1fr) ${
      props.shouldRenderFooter ? "auto" : ""
    };
  `}
`;
const CenteredLayout = styled.div`
  height: 100%;
  padding: var(--cc_size_spacing_xxl) var(--cc_size_spacing_xl);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
`;
const Header = styled.div`
  padding: var(--cc_size_spacing_l)
    ${(props) => (props.showCloseButton ? "60px" : "var(--cc_size_spacing_l)")}
    var(--cc_size_spacing_l) var(--cc_size_spacing_xl);
  border-block-end: var(--cc_size_border_width_s) solid
    var(--cc_color_border_default);
`;
const Title = styled.h2`
  margin: 0;
  font-size: var(--cc_size_text_xl);
  color: var(--cc_color_text_default);
  font-weight: 700;
`;
const Body = styled.div`
  padding: ${(props) =>
      props.hideHeaderBorder ? 0 : "var(--cc_size_spacing_l)"}
    var(--cc_size_spacing_xl) var(--cc_size_spacing_xl);
  overflow-y: auto;
`;
const Footer = styled.div`
  background: var(--cc_color_background_2);
  padding: var(--cc_size_spacing_m);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-bottom-left-radius: var(--cc_size_border_radius_xl);
  border-bottom-right-radius: var(--cc_size_border_radius_xl);
`;
const FooterContentBefore = styled.div`
  flex: 1;
`;
const FooterActions = styled.div`
  flex-shrink: 0;
`;
const PrimaryActionButton = styled(Button)`
  margin-inline-start: var(--cc_size_spacing_s);
`;
const SecondaryActionButton = styled(Button)`
  margin-inline-start: var(--cc_size_spacing_s);
`;
const Modal = ({
  isOpen,
  label,
  showCloseButton,
  shouldCloseOnOverlayClick,
  shouldAnimateIn,
  onRequestClose,
  children,
  size,
  title,
  primaryAction,
  secondaryAction,
  footerContentBefore,
  alert,
  loading,
  style,
  className,
  closeButtonStyle,
  hideHeaderBorder,
  headerStyle,
  bodyStyle,
  footerStyle,
}) => {
  const shouldRenderFooter =
    primaryAction.onClick ||
    secondaryAction.onClick ||
    primaryAction.component ||
    secondaryAction.component ||
    footerContentBefore;

  const renderTitle = () => {
    if (typeof title === "string") {
      return <Title>{title}</Title>;
    } else {
      return title;
    }
  };

  const renderFooterActions = () => {
    if (!primaryAction && !secondaryAction) {
      return null;
    }

    const renderPrimary = () => {
      if (primaryAction.label && !primaryAction.component) {
        return (
          <PrimaryActionButton
            color={primaryAction.isDelete ? "destroy" : "primary"}
            onClick={primaryAction.onClick}
            disabled={primaryAction.disabled}
            data-testid={primaryAction["data-testid"]}
          >
            {primaryAction.label}
          </PrimaryActionButton>
        );
      }
      return primaryAction.component;
    };

    const renderSecondary = () => {
      if (secondaryAction.label && !secondaryAction.component) {
        return (
          <SecondaryActionButton
            color="subtle"
            onClick={secondaryAction.onClick}
            disabled={secondaryAction.disabled}
            data-testid={secondaryAction["data-testid"]}
          >
            {secondaryAction.label}
          </SecondaryActionButton>
        );
      }

      return secondaryAction.component;
    };

    return (
      <FooterActions>
        {secondaryAction ? renderSecondary() : null}
        {primaryAction ? renderPrimary() : null}
      </FooterActions>
    );
  };

  const renderModalContent = () => {
    if (loading.isVisible) {
      return (
        <CenteredLayout>
          <Spinner label={loading.message} layout="vertical" size="large" />
        </CenteredLayout>
      );
    }
    if (alert.isVisible) {
      return (
        <CenteredLayout>
          <ModalAlert
            iconName={alert.iconName}
            iconAnimatesIn={alert.iconAnimatesIn}
            color={alert.color}
            title={alert.title}
            message={alert.message}
            actionLabel={alert.actionLabel}
            actionOnClick={alert.actionOnClick}
          />
        </CenteredLayout>
      );
    }

    return (
      <>
        {title ? (
          <Header
            showCloseButton={showCloseButton}
            style={
              hideHeaderBorder
                ? (headerStyle = { borderBottom: 0 })
                : headerStyle
            }
          >
            {renderTitle(title)}
          </Header>
        ) : null}

        <Body hideHeaderBorder={hideHeaderBorder} style={bodyStyle}>
          {children}
        </Body>

        {shouldRenderFooter ? (
          <Footer style={footerStyle}>
            <FooterContentBefore>{footerContentBefore}</FooterContentBefore>
            {renderFooterActions(primaryAction, secondaryAction)}
          </Footer>
        ) : null}
      </>
    );
  };

  return (
    <StyledModalBase
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      showCloseButton={showCloseButton}
      closeButtonStyle={closeButtonStyle}
      label={label}
      className={className}
      style={style}
      size={size}
      title={title}
      shouldRenderFooter={shouldRenderFooter}
      loading={loading}
      alert={alert}
      shouldAnimateIn={shouldAnimateIn}
    >
      {renderModalContent()}
    </StyledModalBase>
  );
};

Modal.propTypes = {
  /**
   * Children render in modal body
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  /**
   * State to open and close modal
   */
  isOpen: PropTypes.bool,
  /**
   * Callback that triggers when closing the modal is requested
   */
  onRequestClose: PropTypes.func,
  /**
   * Renders close button in header
   */
  showCloseButton: PropTypes.bool,
  /**
   * Closes the modal on overlay click
   */
  shouldCloseOnOverlayClick: PropTypes.bool,
  /**
   * Animates the modal on mount/unmount
   */
  shouldAnimateIn: PropTypes.bool,
  /**
   * Adds a title to the header
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Sets aria-label attribute for screen readers
   */
  label: PropTypes.string,
  /**
   * Size of the modal
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /**
   * Set `isVisible` to show alert state to inform user of error/warning etc.; customize `iconName`, `title`, `message`
   */
  alert: PropTypes.shape({
    isVisible: PropTypes.bool,
    color: PropTypes.string,
    iconName: PropTypes.string,
    iconAnimatesIn: PropTypes.bool,
    title: PropTypes.node,
    message: PropTypes.node,
    actionLabel: PropTypes.string,
    actionOnClick: PropTypes.func,
  }),

  /**
   * Set `isVisible` to show loading state; customize text with `message`
   */
  loading: PropTypes.shape({
    isVisible: PropTypes.bool,
    message: PropTypes.node,
  }),
  /**
   * Setting 'label' and 'onClick' renders a primary button in footer
   */
  primaryAction: PropTypes.shape({
    isDelete: PropTypes.bool,
    label: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    component: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    "data-testid": PropTypes.string,
  }),
  /**
   * Setting 'label' and 'onClick' renders a subtle button in footer
   */
  secondaryAction: PropTypes.shape({
    label: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    component: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    "data-testid": PropTypes.string,
  }),
  /**
   * Content for footer before primary and secondary actions
   */
  footerContentBefore: PropTypes.node,
  /**
   * Needed to make a styled-component
   */
  className: PropTypes.string,
  /**
   * Override the default styles if needed
   */
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  /**
   * Override the default style of the close button
   */
  closeButtonStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  /**
   * Override the default style of the header
   */
  headerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  /**
   * Hides the bottom border of the header
   */
  hideHeaderBorder: PropTypes.bool,
  /**
   * Override the default style of the body
   */
  bodyStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  /**
   * Override the default style of the footer
   */
  footerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Modal.defaultProps = {
  isOpen: false,
  onRequestClose: () => {},
  label: "Modal Content",
  showCloseButton: true,
  shouldCloseOnOverlayClick: true,
  shouldAnimateIn: true,
  size: "small",
  title: undefined,
  primaryAction: {
    label: undefined,
    onClick: undefined,
    disabled: false,
    type: "button",
    isDelete: false,
    component: null,
    "data-testid": null,
  },
  secondaryAction: {
    label: undefined,
    onClick: undefined,
    disabled: false,
    type: "button",
    component: null,
    "data-testid": null,
  },
  footerContentBefore: undefined,
  alert: {
    isVisible: false,
    color: "info",
    iconName: undefined,
    iconAnimatesIn: false,
    title: undefined,
    message: undefined,
    actionLabel: undefined,
    actionOnClick: () => {},
  },
  loading: {
    isVisible: false,
    message: undefined,
  },
  className: undefined,
  style: {},
  closeButtonStyle: {},
  headerStyle: {},
  bodyStyle: {},
  footerStyle: {},
  hideHeaderBorder: false,
};

export default Modal;
