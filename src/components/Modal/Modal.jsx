import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay, ModalWindow } from './ModalStyled';

const modalRoot = document.querySelector('#root-modal');

export function Modal({ children, onClose }) {
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <ModalOverlay className="overlay" onClick={handleBackdropClick}>
      <ModalWindow className="modal">
        {/* <img src="" alt="" /> */}
        {children}
      </ModalWindow>
    </ModalOverlay>,
    modalRoot
  );
}
