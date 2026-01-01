import type { ReactNode } from "react";
import '../../styles/common/Modal.css'

export function Modal({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div
      className="modalOverlay"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="closeBtn"
          onClick={onClose}
          aria-label="закрыть"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}