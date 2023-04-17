import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';

const marginSpacingStyle = `
  margin: var(--cc_size_spacing_s) 0;
`;

const iconAnimation = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.125);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const Container = styled.div`
  text-align: center;
  max-width: 500px;
`;
const Icon = styled.i`
  display: inline-block;
  font-size: 48px;
  color: ${(props) => `var(--cc_color_utility_${props.color})`};
  ${(props) =>
    props.iconAnimatesIn
      ? css`
          opacity: 0;
          transform: scale(0.75);
          animation-name: ${iconAnimation};
          animation-duration: 300ms;
          animation-fill-mode: forwards;
          animation-timing-function: ease-out;
          animation-delay: 150ms;
        `
      : null}
`;
const Title = styled.h2`
  ${marginSpacingStyle}
`;
const Message = styled.p`
  ${marginSpacingStyle}
  line-height: 1.5;
  font-size: var(--cc_size_text_m);
  color: var(--cc_color_text_subtle);
`;
const Button = styled.button`
  margin-block-start: var(--cc_size_spacing_m);
`;

const ModalAlert = ({
  iconName,
  iconAnimatesIn,
  color,
  title,
  message,
  actionLabel,
  actionOnClick,
}) => {
  return (
    <Container>
      {iconName ? (
        <Icon
          className={`mdi mdi-${iconName}`}
          color={color}
          iconAnimatesIn={iconAnimatesIn}
        />
      ) : null}
      {title ? <Title>{title}</Title> : null}
      {message ? <Message>{message}</Message> : null}
      <Button type="button" className="ccb-light-gray" onClick={actionOnClick}>
        {actionLabel}
      </Button>
    </Container>
  );
};

ModalAlert.propTypes = {
  iconName: PropTypes.string,
  iconAnimatesIn: PropTypes.bool,
  color: PropTypes.oneOf(['info', 'success', 'caution', 'destroy']),
  title: PropTypes.string,
  message: PropTypes.node,
  actionLabel: PropTypes.string,
  actionOnClick: PropTypes.func,
};

ModalAlert.defaultProps = {
  iconName: 'alert-circle',
  iconAnimatesIn: false,
  color: 'destroy',
  title: undefined,
  message: undefined,
  actionLabel: undefined,
  actionOnClick: () => {},
};

export default ModalAlert;
