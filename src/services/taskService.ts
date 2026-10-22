import type { Task, TaskPriority } from "../types/task";

const STORAGE_KEY = "mfds-tasks";

function createTaskId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return `task-${crypto.randomUUID()}`;
  }

  return `task-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

function readTasks(): Task[] {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch {
    return [];
  }
}

function writeTasks(tasks: Task[]): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(tasks),
  );
}

export function getTasks(): Task[] {
  return readTasks();
}

export interface CreateTaskData {
  projectId: string;
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
}

export function createTask(
  data: CreateTaskData,
): Task {
  const tasks = readTasks();

  const newTask: Task = {
    id: createTaskId(),
    projectId: data.projectId,
    title: data.title.trim(),
    description: data.description.trim(),
    priority: data.priority,
    status: "A fazer",
    dueDate: data.dueDate,
    createdAt: new Date().toISOString(),
  };

  const updatedTasks = [
    newTask,
    ...tasks,
  ];

  writeTasks(updatedTasks);

  return newTask;
}

export function updateTask(
  taskId: string,
  data: CreateTaskData,
): Task | null {
  const tasks = readTasks();

  const taskIndex = tasks.findIndex(
    (task) => task.id === taskId,
  );

  if (taskIndex === -1) {
    return null;
  }

  const currentTask = tasks[taskIndex];

  const updatedTask: Task = {
    ...currentTask,
    projectId: data.projectId,
    title: data.title.trim(),
    description: data.description.trim(),
    priority: data.priority,
    dueDate: data.dueDate,
  };

  const updatedTasks = [...tasks];

  updatedTasks[taskIndex] = updatedTask;

  writeTasks(updatedTasks);

  return updatedTask;
}

export function deleteTask(
  taskId: string,
): boolean {
  const tasks = readTasks();

  const taskExists = tasks.some(
    (task) => task.id === taskId,
  );

  if (!taskExists) {
    return false;
  }

  const updatedTasks = tasks.filter(
    (task) => task.id !== taskId,
  );

  writeTasks(updatedTasks);

  return true;
}