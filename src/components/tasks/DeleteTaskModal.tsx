import { AlertTriangle, X } from "lucide-react";

interface DeleteTaskModalProps {
  isOpen: boolean;
  taskTitle?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteTaskModal({
  isOpen,
  taskTitle,
  onCancel,
  onConfirm,
}: DeleteTaskModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onCancel();
        }
      }}
    >
      <section
        className="delete-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
      >
        <div className="delete-modal-header">
          <div className="delete-warning-icon">
            <AlertTriangle size={21} />
          </div>

          <button
            type="button"
            className="icon-button"
            onClick={onCancel}
            aria-label="Cancelar exclusão"
          >
            <X size={18} />
          </button>
        </div>

        <div className="delete-modal-content">
          <h2 id="delete-modal-title">
            Excluir tarefa?
          </h2>

          <p>
            Você está prestes a excluir a tarefa:
          </p>

          <strong>
            {taskTitle || "Tarefa selecionada"}
          </strong>

          <p>
            Essa ação não poderá ser desfeita.
          </p>
        </div>

        <div className="delete-modal-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={onCancel}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="danger-button"
            onClick={onConfirm}
          >
            Excluir tarefa
          </button>
        </div>
      </section>
    </div>
  );
}