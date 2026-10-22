import {
 type FormEvent,
  useEffect,
  useState,
} from "react";
import { X } from "lucide-react";
import type {
  Task,
  TaskPriority,
} from "../../types/task";
import type {
  StoredProject,
} from "../../services/projectService";

interface TaskFormModalProps {
  isOpen: boolean;
  projects: StoredProject[];
  task?: Task | null;
  onClose: () => void;
  onSubmit: (
    projectId: string,
    title: string,
    description: string,
    priority: TaskPriority,
    dueDate: string,
  ) => void;
}

export function TaskFormModal({
  isOpen,
  projects,
  task,
  onClose,
  onSubmit,
}: TaskFormModalProps) {
  const [projectId, setProjectId] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState<TaskPriority>("Média");

  const [dueDate, setDueDate] =
    useState("");

  const [error, setError] =
    useState("");

  const isEditing = Boolean(task);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (task) {
      setProjectId(task.projectId);
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setDueDate(task.dueDate);
    } else {
      setProjectId(projects[0]?.id ?? "");
      setTitle("");
      setDescription("");
      setPriority("Média");
      setDueDate("");
    }

    setError("");
  }, [isOpen, task, projects]);

  if (!isOpen) {
    return null;
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!projectId) {
      setError(
        "Selecione o projeto da tarefa.",
      );
      return;
    }

    if (!trimmedTitle) {
      setError(
        "Informe o título da tarefa.",
      );
      return;
    }

    onSubmit(
      projectId,
      trimmedTitle,
      description.trim(),
      priority,
      dueDate,
    );
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
          onClose();
        }
      }}
    >
      <section
        className="task-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
      >
        <div className="modal-header">
          <div>
            <span className="eyebrow">
              Organização
            </span>

            <h2 id="task-modal-title">
              {isEditing
                ? "Editar tarefa"
                : "Nova tarefa"}
            </h2>
          </div>

          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Fechar formulário"
          >
            <X size={18} />
          </button>
        </div>

        <form
          className="task-form"
          onSubmit={handleSubmit}
        >
          <div className="form-field">
            <label htmlFor="task-project">
              Projeto
            </label>

            <select
              id="task-project"
              value={projectId}
              onChange={(event) =>
                setProjectId(
                  event.target.value,
                )
              }
            >
              {projects.length === 0 ? (
                <option value="">
                  Nenhum projeto disponível
                </option>
              ) : (
                projects.map((project) => (
                  <option
                    key={project.id}
                    value={project.id}
                  >
                    {project.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="task-title">
              Título da tarefa
            </label>

            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(
                  event.target.value,
                )
              }
              placeholder="Ex.: Criar tela de login"
              autoFocus
            />
          </div>

          <div className="form-field">
            <label htmlFor="task-description">
              Descrição
            </label>

            <textarea
              id="task-description"
              rows={4}
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value,
                )
              }
              placeholder="Descreva o que precisa ser realizado."
            />
          </div>

          <div className="task-form-grid">
            <div className="form-field">
              <label htmlFor="task-priority">
                Prioridade
              </label>

              <select
                id="task-priority"
                value={priority}
                onChange={(event) =>
                  setPriority(
                    event.target
                      .value as TaskPriority,
                  )
                }
              >
                <option value="Baixa">
                  Baixa
                </option>

                <option value="Média">
                  Média
                </option>

                <option value="Alta">
                  Alta
                </option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="task-due-date">
                Prazo
              </label>

              <input
                id="task-due-date"
                type="date"
                value={dueDate}
                onChange={(event) =>
                  setDueDate(
                    event.target.value,
                  )
                }
              />
            </div>
          </div>

          {error && (
            <div
              className="form-error"
              role="alert"
            >
              {error}
            </div>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="primary-button"
            >
              {isEditing
                ? "Salvar alterações"
                : "Criar tarefa"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}