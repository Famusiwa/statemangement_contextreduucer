import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
};

const Modal = ({ isOpen, onClose, title, children, actions }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  return createPortal(
    <dialog id="modal" ref={dialogRef} onClose={onClose}>
      {title && <h2>{title}</h2>}
      <div>{children}</div> 
      {actions && (
        <form method="dialog" id="modal-actions">
          {actions}
        </form>
      )}
    </dialog>,
    document.getElementById("modal-root")!,
  );
};
export default Modal;
