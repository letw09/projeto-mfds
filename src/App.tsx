import { Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { CalendarPage } from "./pages/CalendarPage";
import { DashboardPage } from "./pages/DashboardPage";
import { DocumentsPage } from "./pages/DocumentsPage";
import { FocusPage } from "./pages/FocusPage";
import { NewTaskPage } from "./pages/NewTaskPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { PerformancePage } from "./pages/PerformancePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { TasksPage } from "./pages/TasksPage";
import { TeamPage } from "./pages/TeamPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/projetos" element={<ProjectsPage />} />
        <Route path="/tarefas" element={<TasksPage />} />
        <Route path="/calendario" element={<CalendarPage />} />
        <Route path="/arquivos" element={<DocumentsPage />} />
        <Route path="/equipe" element={<TeamPage />} />
        <Route
          path="/notificacoes"
          element={<NotificationsPage />}
        />
        <Route path="/foco" element={<FocusPage />} />
        <Route
          path="/desempenho"
          element={<PerformancePage />}
        />
        <Route path="/nova-tarefa" element={<NewTaskPage />} />
      </Route>
    </Routes>
  );
}