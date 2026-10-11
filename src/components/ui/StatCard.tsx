interface StatCardProps {
  title: string;
  value: string;
  description: string;
  variant?: "default" | "success" | "warning";
}

export function StatCard({
  title,
  value,
  description,
  variant = "default",
}: StatCardProps) {
  return (
    <article className={`stat-card stat-card-${variant}`}>
      <span className="stat-card-title">{title}</span>
      <strong className="stat-card-value">{value}</strong>
      <span className="stat-card-description">
        {description}
      </span>
    </article>
  );
}