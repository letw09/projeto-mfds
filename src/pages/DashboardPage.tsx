import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { StatCard } from "../components/ui/StatCard";
import { mockProjects, mockTasks } from "../data/mockData";

export function DashboardPage() {
  const completedTasks = mockTasks.filter(
    (task) => task.status === "Concluída",
  ).length;

  return (
    <div className="page-stack">
      <section className="welcome-section">
        <div>
          <span className="eyebrow">Visão geral</span>
          <h2>Olá, Lucas! 👋</h2>
          <p>
            Organize suas atividades e acompanhe o progresso
            dos seus projetos.
          </p>
        </div>

        <Link to="/nova-tarefa" className="primary-button">
          Nova tarefa
        </Link>
      </section>

      <section className="stats-grid" aria-label="Indicadores gerais">
        <StatCard
          title="Projetos ativos"
          value="02"
          description="Projetos em andamento"
        />

        <StatCard
          title="Tarefas pendentes"
          value="12"
          description="Atividades a acompanhar"
          variant="warning"
        />

        <StatCard
          title="Tarefas concluídas"
          value={String(completedTasks).padStart(2, "0")}
          description="Neste período"
          variant="success"
        />

        <StatCard
          title="Progresso geral"
          value="65%"
          description="Estimativa ilustrativa"
        />
      </section>

      <section className="content-grid">
        <article className="panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Acompanhamento</span>
              <h3>Meus projetos</h3>
            </div>

            <Link to="/projetos" className="text-link">
              Ver todos
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="project-list">
            {mockProjects.map((project) => (
              <div className="project-row" key={project.id}>
                <div className="project-icon">
                  <ClipboardIcon />
                </div>

                <div className="project-info">
                  <strong>{project.name}</strong>
                  <span>{project.description}</span>

                  <div className="progress-track">
                    <div
                      className="progress-value"
                      style={{
                        width: `${project.progress}%`,
                      }}
                    />
                  </div>

                  <small>{project.progress}% concluído</small>
                </div>

                <span className="status-badge">
                  {project.status}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Prioridades</span>
              <h3>Próximas tarefas</h3>
            </div>

            <Link to="/tarefas" className="text-link">
              Ver todas
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="task-list">
            {mockTasks.map((task) => (
              <div className="task-row" key={task.id}>
                <div>
                  <strong>{task.title}</strong>
                  <span>{task.project}</span>
                </div>

                <span
                  className={`priority-badge priority-${task.priority.toLowerCase()}`}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="focus-banner">
        <div className="focus-icon">
          <CheckCircle2 size={22} />
        </div>

        <div>
          <strong>Foco do dia</strong>
          <p>
            Escolha uma próxima ação clara para evitar
            acúmulo de tarefas.
          </p>
        </div>

        <Link to="/foco" className="text-link">
          Acessar foco
          <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}

function ClipboardIcon() {
  return <span aria-hidden="true">▣</span>;
}