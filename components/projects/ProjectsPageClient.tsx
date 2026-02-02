"use client";

import { useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { useProjectsRepository } from "@/features/projects";
import type { ProjectStatus } from "@/types";
import { Button } from "@/components/ui/Button";
import { ProjectTable } from "@/components/projects/ProjectTable";
import { ProjectSearch } from "@/components/projects/ProjectSearch";
import { StatusFilter } from "@/components/projects/StatusFilter";
import { EmptyProjects, EmptySearch } from "@/components/projects/EmptyState";
import { ProjectsPageSkeleton } from "@/components/projects/ProjectsPageSkeleton";

export function ProjectsPageClient() {
  const { projects, loading, error, refetch } = useProjectsRepository();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "">("");
  
  // Memoizar callbacks para evitar re-renders en componentes hijos
  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
  }, []);
  
  const handleStatusChange = useCallback((value: ProjectStatus | "") => {
    setStatusFilter(value);
  }, []);

  const filtered = useMemo(() => {
    const lower = search.trim().toLowerCase();
    return projects.filter((p) => {
      const matchSearch =
        !lower ||
        p.name.toLowerCase().includes(lower) ||
        p.client.toLowerCase().includes(lower);
      const matchStatus = !statusFilter || p.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [projects, search, statusFilter]);

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-6 text-center animate-fade-in">
        <p className="text-red-700 dark:text-red-300 font-medium mb-2">
          Error al cargar proyectos
        </p>
        <p className="text-red-600 dark:text-red-400 text-sm mb-4">{error}</p>
        <Button onClick={() => refetch()} variant="secondary">
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Proyectos
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="w-full sm:w-64">
            <ProjectSearch value={search} onChange={handleSearchChange} />
          </div>
          <StatusFilter value={statusFilter} onChange={handleStatusChange} />
          <Button asChild>
            <Link href="/projects/new">Nuevo proyecto</Link>
          </Button>
        </div>
      </div>

      {loading ? (
        <ProjectsPageSkeleton />
      ) : filtered.length === 0 ? (
        projects.length === 0 ? (
          <EmptyProjects
            action={
              <Button asChild>
                <Link href="/projects/new">Crear primer proyecto</Link>
              </Button>
            }
          />
        ) : (
          <EmptySearch />
        )
      ) : (
        <ProjectTable projects={filtered} />
      )}
    </div>
  );
}
