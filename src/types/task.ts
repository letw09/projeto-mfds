export type TaskPriority =
  | "Baixa"
  | "Média"
  | "Alta";

export type TaskStatus =
  | "A fazer"
  | "Em andamento"
  | "Concluída";

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
}