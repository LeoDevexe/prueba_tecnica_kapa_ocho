"use client";

import { ProjectForm } from "@/components/projects/ProjectForm";
import { useProjectsRepository } from "@/features/projects";

export function NewProjectForm() {
  const { create } = useProjectsRepository();

  const handleSubmit = async (data: {
    name: string;
    client: string;
    status: "PLANNED" | "IN_PROGRESS" | "DONE";
    description?: string;
  }) => {
    await create(data);
  };

  return (
    <ProjectForm
      submitLabel="Crear proyecto"
      onSubmit={handleSubmit}
      onSuccessRedirect="/projects"
    />
  );
}
