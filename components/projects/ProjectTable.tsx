"use client";

import { memo } from "react";
import Link from "next/link";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ProjectTableProps {
  projects: Project[];
}

export const ProjectTable = memo(function ProjectTable({ projects }: ProjectTableProps) {
  if (projects.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 shadow-sm animate-fade-in">
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700" role="table" aria-label="Lista de proyectos">
        <thead className="bg-slate-50/80 dark:bg-slate-800/80">
          <tr>
            <th
              scope="col"
              className="px-5 py-3.5 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider"
            >
              Proyecto
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider hidden sm:table-cell"
            >
              Cliente
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider hidden md:table-cell"
            >
              Estado
            </th>
            <th scope="col" className="relative px-4 py-3">
              <span className="sr-only">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
          {projects.map((project) => (
            <tr
              key={project.id}
              className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <td className="px-5 py-3.5">
                <Link
                  href={`/projects/${project.id}`}
                  className="font-medium text-primary-600 dark:text-primary-400 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500 rounded underline-offset-2"
                >
                  {project.name}
                </Link>
              </td>
              <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400 hidden sm:table-cell">
                {project.client}
              </td>
              <td className="px-5 py-3.5 hidden md:table-cell">
                <Badge status={project.status} />
              </td>
              <td className="px-5 py-3.5 text-right">
                <Link href={`/projects/${project.id}`}>
                  <Button variant="ghost" size="sm" type="button" className="!p-0 min-w-0">
                    Ver
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
