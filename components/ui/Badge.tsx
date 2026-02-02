import type { ProjectStatus } from "@/types";

const statusConfig: Record<
  ProjectStatus,
  { label: string; className: string }
> = {
  PLANNED: {
    label: "Planificado",
    className:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  },
  IN_PROGRESS: {
    label: "En progreso",
    className:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  },
  DONE: {
    label: "Completado",
    className:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  },
};

interface BadgeProps {
  status: ProjectStatus;
  className?: string;
}

export function Badge({ status, className = "" }: BadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${config.className}
        ${className}
      `}
      role="status"
      aria-label={`Estado: ${config.label}`}
    >
      {config.label}
    </span>
  );
}
