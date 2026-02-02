"use client";

import { useCallback, useEffect, useState } from "react";
import type { Project } from "@/types";

/**
 * Hook que expone la capa de datos de proyectos vía API routes del servidor.
 * Capa de aplicación que se comunica con las APIs REST.
 */
export function useProjectsRepository() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/projects");
      if (!response.ok) {
        throw new Error("Error al cargar proyectos");
      }
      const data = await response.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al cargar");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const create = useCallback(
    async (data: { name: string; client: string; status?: Project["status"]; description?: string }) => {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al crear proyecto");
      }
      
      const project = await response.json();
      setProjects((prev) => [...prev, project]);
      return project;
    },
    []
  );

  const update = useCallback(
    async (id: string, data: Partial<Pick<Project, "name" | "client" | "status" | "description">>) => {
      const response = await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        if (response.status === 404) return null;
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al actualizar proyecto");
      }
      
      const updated = await response.json();
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? updated : p))
      );
      return updated;
    },
    []
  );

  const getById = useCallback(
    async (id: string): Promise<Project | null> => {
      try {
        const response = await fetch(`/api/projects/${id}`);
        if (!response.ok) {
          if (response.status === 404) return null;
          throw new Error("Error al obtener proyecto");
        }
        return await response.json();
      } catch {
        return null;
      }
    },
    []
  );

  return {
    projects,
    loading,
    error,
    refetch: load,
    create,
    update,
    getById,
  };
}
