export type ProjectStatus = "Em andamento" | "Concluído" | "Pausado";

export type TaskStatus =
  | "A fazer"
  | "Em andamento"
  | "Concluída"
  | "Bloqueada";

export type TaskPriority = "Baixa" | "Média" | "Alta";

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  pendingTasks: number;
  progress: number;
}

export interface Task {
  id: string;
  title: string;
  project: string;
  responsible: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  read: boolean;
}