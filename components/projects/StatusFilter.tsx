"use client";

import { memo } from "react";
import type { ProjectStatus } from "@/types";
import { Select } from "@/components/ui/Select";

const OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "Todos los estados" },
  { value: "PLANNED", label: "Planificado" },
  { value: "IN_PROGRESS", label: "En progreso" },
  { value: "DONE", label: "Completado" },
];

interface StatusFilterProps {
  value: ProjectStatus | "";
  onChange: (value: ProjectStatus | "") => void;
  "aria-label"?: string;
}

export const StatusFilter = memo(function StatusFilter({
  value,
  onChange,
  "aria-label": ariaLabel = "Filtrar por estado",
}: StatusFilterProps) {
  return (
    <Select
      value={value}
      onChange={(e) => onChange((e.target.value || "") as ProjectStatus | "")}
      options={OPTIONS}
      aria-label={ariaLabel}
      className="min-w-[180px]"
    />
  );
});
