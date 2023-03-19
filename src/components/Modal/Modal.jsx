import { useEffect } from 'react';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay, ModalWindow } from './ModalStyled';

const modalRoot = document.querySelector('#root-modal');

// export function Modal({ props }) {
//   // тут так же попробовать вместо (props) - {onClose} и далее использовать без props.

//   const handleBackdropClick = e => {
//     if (e.currentTarget === e.target) {
//       props.onClose();
//     }
//   };

//   useEffect(() => {
//     const handleKeyDown = e => {
//       if (e.code === 'Escape') {
//         props.onClose();
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [onClose]);

//   return createPortal(
//     <ModalOverlay className="overlay" onClick={handleBackdropClick}>
//       <ModalWindow className="modal">
//         {/* <img src="" alt="" /> */}
//         {props.children}
//       </ModalWindow>
//     </ModalOverlay>,
//     modalRoot
//   );
// }

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <ModalOverlay className="overlay" onClick={this.handleBackdropClick}>
        <ModalWindow className="modal">
          {/* <img src="" alt="" /> */}
          {this.props.children}
        </ModalWindow>
      </ModalOverlay>,
      modalRoot
    );
  }
}
