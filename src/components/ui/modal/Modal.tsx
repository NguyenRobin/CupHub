"use client";

import "./Modal.scss";

type Props = {
  children: React.ReactNode;
  isActive: boolean;
};

function Modal({ children, isActive }: Props) {
  return (
    <div className={`modal ${isActive ? "display" : ""}`}>
      <div className="modal-content">{children}</div>
    </div>
  );
}

export default Modal;
