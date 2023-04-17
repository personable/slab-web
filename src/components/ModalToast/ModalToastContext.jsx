import React from "react";
import PropTypes from "prop-types";

import useToast from "./useToast";

const ModalToastContext = React.createContext();
ModalToastContext.displayName = "ModalToastContext";

export default ModalToastContext;

export const ModalToastProvider = ({ children }) => {
  const { toast, showToast, resetToast } = useToast();

  return (
    <ModalToastContext.Provider value={{ toast, showToast, resetToast }}>
      {children}
    </ModalToastContext.Provider>
  );
};

ModalToastProvider.propTypes = {
  children: PropTypes.any,
};
