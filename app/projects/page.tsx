import { Suspense } from "react";
import { ProjectsPageClient } from "@/components/projects/ProjectsPageClient";
import { ProjectsPageSkeleton } from "@/components/projects/ProjectsPageSkeleton";

export const metadata = {
  title: "Proyectos | Kapa Ocho",
  description: "Listado de proyectos",
};

export default function ProjectsPage() {
  return (
    <Suspense fallback={<ProjectsPageSkeleton />}>
      <ProjectsPageClient />
    </Suspense>
  );
}
