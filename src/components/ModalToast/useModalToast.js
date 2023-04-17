import { useContext } from 'react';
import ModalToastContext from './ModalToastContext';

export const useModalToast = () => {
  const context = useContext(ModalToastContext);
  if (!context) {
    throw new Error(
      'useModalToast must be used within <Modal /> from components/shared/DesignSystem/Modal',
    );
  }

  return context;
};

export default useModalToast;
