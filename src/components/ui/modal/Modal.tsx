import { createPortal } from 'react-dom';
import './Modal.scss';

type Props = {
  children: React.ReactNode;
  isActive: boolean;
};

function Modal({ children, isActive }: Props) {
  return createPortal(
    <div className={`modal ${isActive ? 'display' : ''}`}>
      <div className="modal__content">{children}</div>
    </div>,
    document.body
  );
}

export default Modal;
