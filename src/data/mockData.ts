import type {
  Notification,
  Project,
  Task,
} from "../types";

export const mockProjects: Project[] = [
  {
    id: "project-1",
    name: "TCC - Web App de Doações",
    description: "Aplicação para organizar as atividades do TCC.",
    status: "Em andamento",
    pendingTasks: 8,
    progress: 65,
  },
  {
    id: "project-2",
    name: "Pesquisa Acadêmica",
    description: "Organização das etapas da pesquisa.",
    status: "Em andamento",
    pendingTasks: 4,
    progress: 40,
  },
  {
    id: "project-3",
    name: "Sistema de Estudos",
    description: "Planejamento da rotina de estudos.",
    status: "Concluído",
    pendingTasks: 0,
    progress: 100,
  },
];

export const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Finalizar tela de dashboard",
    project: "TCC - Web App de Doações",
    responsible: "Ana",
    priority: "Alta",
    status: "Em andamento",
    dueDate: "2026-11-20",
  },
  {
    id: "task-2",
    title: "Revisar documentação",
    project: "Pesquisa Acadêmica",
    responsible: "Bruno",
    priority: "Média",
    status: "A fazer",
    dueDate: "2026-11-22",
  },
  {
    id: "task-3",
    title: "Validar formulário",
    project: "TCC - Web App de Doações",
    responsible: "Carla",
    priority: "Alta",
    status: "Bloqueada",
    dueDate: "2026-11-24",
  },
];

export const mockNotifications: Notification[] = [
  {
    id: "notification-1",
    title: "Prazo próximo",
    description: "A tarefa de dashboard vence em breve.",
    read: false,
  },
  {
    id: "notification-2",
    title: "Nova tarefa atribuída",
    description: "Você recebeu uma nova tarefa.",
    read: false,
  },
];