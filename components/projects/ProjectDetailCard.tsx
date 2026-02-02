"use client";

import Link from "next/link";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";

interface ProjectDetailCardProps {
  project: Project;
  onMarkDone?: () => void;
  isMarkingDone?: boolean;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("es-ES", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export function ProjectDetailCard({
  project,
  onMarkDone,
  isMarkingDone = false,
}: ProjectDetailCardProps) {
  return (
    <Card className="animate-fade-in" padding="lg">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4">
        <div>
          <CardTitle className="mb-1">{project.name}</CardTitle>
          <Badge status={project.status} />
        </div>
        <div className="flex gap-2">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-100 dark:hover:bg-slate-500 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            Volver al listado
          </Link>
          {project.status !== "DONE" && onMarkDone && (
            <Button
              variant="primary"
              onClick={onMarkDone}
              isLoading={isMarkingDone}
              aria-label="Marcar proyecto como completado"
            >
              Marcar como completado
            </Button>
          )}
        </div>
      </CardHeader>
      <dl className="grid gap-4 sm:grid-cols-1">
        <div>
          <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Cliente
          </dt>
          <dd className="mt-0.5 text-slate-900 dark:text-slate-100">
            {project.client}
          </dd>
        </div>
        {project.description && (
          <div>
            <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Descripción
            </dt>
            <dd className="mt-0.5 text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
              {project.description}
            </dd>
          </div>
        )}
        <div className="grid gap-2 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Creado
            </dt>
            <dd className="mt-0.5 text-slate-600 dark:text-slate-400 text-sm">
              {formatDate(project.createdAt)}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Actualizado
            </dt>
            <dd className="mt-0.5 text-slate-600 dark:text-slate-400 text-sm">
              {formatDate(project.updatedAt)}
            </dd>
          </div>
        </div>
      </dl>
    </Card>
  );
}
