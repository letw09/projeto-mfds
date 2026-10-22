import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Edit3,
  Flag,
  Plus,
  Trash2,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getProjects,
  type StoredProject,
} from "../services/projectService";

import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../services/taskService";

import type {
  Task,
  TaskPriority,
} from "../types/task";

import { DeleteTaskModal } from "../components/tasks/DeleteTaskModal";

import { TaskFormModal } from "../components/tasks/TaskFormModal";

export function TasksPage() {
  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [projects, setProjects] =
    useState<StoredProject[]>([]);

  const [isFormOpen, setIsFormOpen] =
    useState(false);

  const [taskBeingEdited, setTaskBeingEdited] =
    useState<Task | null>(null);

  const [taskBeingDeleted, setTaskBeingDeleted] =
    useState<Task | null>(null);

  const [successMessage, setSuccessMessage] =
    useState("");

  useEffect(() => {
    setTasks(getTasks());

    setProjects(
      getProjects().filter(
        (project) => !project.archived,
      ),
    );
  }, []);

  const projectMap = useMemo(() => {
    return new Map(
      projects.map((project) => [
        project.id,
        project.name,
      ]),
    );
  }, [projects]);

  function showSuccessMessage(
    message: string,
  ) {
    setSuccessMessage(message);

    window.setTimeout(() => {
      setSuccessMessage("");
    }, 3500);
  }

  function handleOpenCreate() {
    setTaskBeingEdited(null);
    setIsFormOpen(true);
  }

  function handleOpenEdit(task: Task) {
    setTaskBeingEdited(task);
    setIsFormOpen(true);
  }

  function handleCloseForm() {
    setIsFormOpen(false);
    setTaskBeingEdited(null);
  }

  function handleSubmitTask(
    projectId: string,
    title: string,
    description: string,
    priority: TaskPriority,
    dueDate: string,
  ) {
    if (taskBeingEdited) {
      const updatedTask = updateTask(
        taskBeingEdited.id,
        {
          projectId,
          title,
          description,
          priority,
          dueDate,
        },
      );

      if (!updatedTask) {
        showSuccessMessage(
          "Não foi possível atualizar a tarefa.",
        );
        return;
      }

      setTasks(getTasks());
      handleCloseForm();

      showSuccessMessage(
        "Tarefa atualizada com sucesso.",
      );

      return;
    }

    createTask({
      projectId,
      title,
      description,
      priority,
      dueDate,
    });

    setTasks(getTasks());
    handleCloseForm();

    showSuccessMessage(
      "Tarefa criada com sucesso.",
    );
  }

  function handleConfirmDelete() {
    if (!taskBeingDeleted) {
      return;
    }

    const deleted = deleteTask(
      taskBeingDeleted.id,
    );

    if (!deleted) {
      showSuccessMessage(
        "Não foi possível excluir a tarefa.",
      );

      setTaskBeingDeleted(null);

      return;
    }

    setTasks(getTasks());
    setTaskBeingDeleted(null);

    showSuccessMessage(
      "Tarefa excluída com sucesso.",
    );
  }

  return (
    <>
      <section className="page-stack">
        <div className="tasks-page-header">
          <div>
            <span className="eyebrow">
              Organização
            </span>

            <h2>Tarefas</h2>

            <p className="page-description">
              Registre, atualize e mantenha
              organizadas as atividades dos
              seus projetos.
            </p>
          </div>

          <button
            type="button"
            className="primary-button"
            onClick={handleOpenCreate}
          >
            <Plus size={18} />
            Nova tarefa
          </button>
        </div>

        {successMessage && (
          <div
            className="task-success-message"
            role="status"
          >
            <CheckCircle2 size={17} />
            {successMessage}
          </div>
        )}

        {tasks.length === 0 ? (
          <EmptyTasksState
            onCreate={handleOpenCreate}
          />
        ) : (
          <div className="tasks-list">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                projectName={
                  projectMap.get(
                    task.projectId,
                  ) ??
                  "Projeto não encontrado"
                }
                onEdit={() =>
                  handleOpenEdit(task)
                }
                onDelete={() =>
                  setTaskBeingDeleted(task)
                }
              />
            ))}
          </div>
        )}
      </section>

      <TaskFormModal
        isOpen={isFormOpen}
        projects={projects}
        task={taskBeingEdited}
        onClose={handleCloseForm}
        onSubmit={handleSubmitTask}
      />

      <DeleteTaskModal
        isOpen={
          taskBeingDeleted !== null
        }
        taskTitle={
          taskBeingDeleted?.title
        }
        onCancel={() =>
          setTaskBeingDeleted(null)
        }
        onConfirm={
          handleConfirmDelete
        }
      />
    </>
  );
}

interface TaskCardProps {
  task: Task;
  projectName: string;
  onEdit: () => void;
  onDelete: () => void;
}

function TaskCard({
  task,
  projectName,
  onEdit,
  onDelete,
}: TaskCardProps) {
  return (
    <article className="task-card">
      <div className="task-card-status">
        <Circle size={19} />
      </div>

      <div className="task-card-main">
        <div className="task-card-heading">
          <div>
            <span className="task-project">
              {projectName}
            </span>

            <h3>{task.title}</h3>
          </div>

          <PriorityBadge
            priority={task.priority}
          />
        </div>

        {task.description && (
          <p className="task-description">
            {task.description}
          </p>
        )}

        <div className="task-card-meta">
          <span>
            <Circle
              size={7}
              fill="currentColor"
            />
            {task.status}
          </span>

          {task.dueDate && (
            <span>
              <CalendarDays size={13} />
              {formatDate(task.dueDate)}
            </span>
          )}

          <span className="task-id">
            ID: {task.id.slice(0, 14)}...
          </span>
        </div>
      </div>

      <div className="task-card-actions">
        <button
          type="button"
          className="task-action-button"
          onClick={onEdit}
          aria-label={`Editar tarefa ${task.title}`}
          title="Editar tarefa"
        >
          <Edit3 size={15} />
        </button>

        <button
          type="button"
          className="task-action-button task-delete-button"
          onClick={onDelete}
          aria-label={`Excluir tarefa ${task.title}`}
          title="Excluir tarefa"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </article>
  );
}

function PriorityBadge({
  priority,
}: {
  priority: TaskPriority;
}) {
  return (
    <span
      className={`task-priority priority-${priority.toLowerCase()}`}
    >
      <Flag size={12} />
      {priority}
    </span>
  );
}

function formatDate(date: string): string {
  const [year, month, day] =
    date.split("-");

  if (!year || !month || !day) {
    return date;
  }

  return `${day}/${month}/${year}`;
}

function EmptyTasksState({
  onCreate,
}: {
  onCreate: () => void;
}) {
  return (
    <div className="tasks-empty-state">
      <div className="tasks-empty-icon">
        <CheckCircle2 size={27} />
      </div>

      <h3>
        Nenhuma tarefa cadastrada
      </h3>

      <p>
        Crie sua primeira tarefa para
        começar a organizar as atividades
        dos seus projetos.
      </p>

      <button
        type="button"
        className="primary-button"
        onClick={onCreate}
      >
        <Plus size={17} />
        Criar primeira tarefa
      </button>
    </div>
  );
}