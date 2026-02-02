"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useProjectsRepository } from "@/features/projects";
import { ProjectDetailCard } from "@/components/projects/ProjectDetailCard";
import { Button } from "@/components/ui/Button";

type Props = { params: { id: string } };

export function ProjectDetailView({ params }: Props) {
  const id = params.id;
  const { getById, update } = useProjectsRepository();
  const [project, setProject] = useState<Awaited<ReturnType<typeof getById>>>(null);
  const [loaded, setLoaded] = useState(false);
  const [isMarkingDone, setIsMarkingDone] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoaded(false);
    getById(id).then((p) => {
      setProject(p);
      setLoaded(true);
    });
  }, [id, getById]);

  const handleMarkDone = async () => {
    if (!id) return;
    setIsMarkingDone(true);
    try {
      const updated = await update(id, { status: "DONE" });
      if (updated) setProject(updated);
    } finally {
      setIsMarkingDone(false);
    }
  };

  if (!loaded) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
        <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded" />
      </div>
    );
  }

  if (loaded && !project) {
    return (
      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 text-center animate-fade-in">
        <p className="text-slate-600 dark:text-slate-400 font-medium mb-2">
          Proyecto no encontrado
        </p>
        <Button asChild variant="secondary">
          <Link href="/projects">Volver al listado</Link>
        </Button>
      </div>
    );
  }

  return (
    <ProjectDetailCard
      project={project}
      onMarkDone={handleMarkDone}
      isMarkingDone={isMarkingDone}
    />
  );
}
