import { Suspense } from "react";
import { NewProjectForm } from "./NewProjectForm";
import { ProjectsPageSkeleton } from "@/components/projects/ProjectsPageSkeleton";

export const metadata = {
  title: "Nuevo proyecto | Kapa Ocho",
  description: "Crear un nuevo proyecto",
};

export default function NewProjectPage() {
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
        Nuevo proyecto
      </h1>
      <Suspense fallback={<ProjectsPageSkeleton />}>
        <NewProjectForm />
      </Suspense>
    </div>
  );
}
