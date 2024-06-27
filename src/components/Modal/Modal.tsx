import "./modal.scss";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
};

function Modal({ children, isOpen }: Props) {
  return (
    <div className={`modal ${isOpen ? "show" : ""}`}>
      <div className="modal-content">{children}</div>
    </div>
  );
}

export default Modal;
