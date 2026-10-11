import {
  Bell,
  CalendarDays,
  CheckSquare,
  ClipboardList,
  FileText,
  Gauge,
  LayoutDashboard,
  ListChecks,
  Plus,
  Settings,
  Users,
} from "lucide-react";
import {
  NavLink,
  Outlet,
  useLocation,
} from "react-router-dom";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Projetos",
    path: "/projetos",
    icon: ClipboardList,
  },
  {
    label: "Tarefas",
    path: "/tarefas",
    icon: CheckSquare,
  },
  {
    label: "Calendário",
    path: "/calendario",
    icon: CalendarDays,
  },
  {
    label: "Arquivos",
    path: "/arquivos",
    icon: FileText,
  },
  {
    label: "Equipe",
    path: "/equipe",
    icon: Users,
  },
  {
    label: "Notificações",
    path: "/notificacoes",
    icon: Bell,
  },
  {
    label: "Foco do dia",
    path: "/foco",
    icon: ListChecks,
  },
  {
    label: "Desempenho",
    path: "/desempenho",
    icon: Gauge,
  },
];

export function AppShell() {
  const location = useLocation();

  const currentPage =
    navigationItems.find(
      (item) => item.path === location.pathname,
    )?.label ?? "Dashboard";

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">M</div>

          <div>
            <strong>MFDS</strong>
            <span>Organização acadêmica</span>
          </div>
        </div>

        <nav className="navigation" aria-label="Navegação principal">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `navigation-link ${
                    isActive ? "active" : ""
                  }`
                }
              >
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <NavLink
            to="/nova-tarefa"
            className="primary-button"
          >
            <Plus size={18} aria-hidden="true" />
            Nova tarefa
          </NavLink>

          <button className="secondary-button" type="button">
            <Settings size={18} aria-hidden="true" />
            Configurações
          </button>
        </div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <div>
            <span className="breadcrumb">Workspace /</span>
            <h1>{currentPage}</h1>
          </div>

          <div className="user-summary">
            <div className="avatar" aria-hidden="true">
              LS
            </div>

            <div>
              <strong>Lucas Silva</strong>
              <span>Integrante da equipe</span>
            </div>
          </div>
        </header>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}