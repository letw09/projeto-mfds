import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Flag,
  Plus,
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
  getTasks,
} from "../services/taskService";
import type {
  Task,
  TaskPriority,
} from "../types/task";
import { TaskFormModal } from "../components/tasks/TaskFormModal";

export function TasksPage() {
  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [projects, setProjects] =
    useState<StoredProject[]>([]);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

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

  function handleCreateTask(
    projectId: string,
    title: string,
    description: string,
    priority: TaskPriority,
    dueDate: string,
  ) {
    createTask({
      projectId,
      title,
      description,
      priority,
      dueDate,
    });

    setTasks(getTasks());
    setIsModalOpen(false);

    setSuccessMessage(
      "Tarefa criada com sucesso.",
    );

    window.setTimeout(() => {
      setSuccessMessage("");
    }, 3500);
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
              Registre as atividades que precisam
              ser realizadas nos seus projetos.
            </p>
          </div>

          <button
            type="button"
            className="primary-button"
            onClick={() =>
              setIsModalOpen(true)
            }
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
            onCreate={() =>
              setIsModalOpen(true)
            }
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
              />
            ))}
          </div>
        )}
      </section>

      <TaskFormModal
        isOpen={isModalOpen}
        projects={projects}
        onClose={() =>
          setIsModalOpen(false)
        }
        onSubmit={handleCreateTask}
      />
    </>
  );
}

interface TaskCardProps {
  task: Task;
  projectName: string;
}

function TaskCard({
  task,
  projectName,
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
            <Circle size={7} fill="currentColor" />
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