import { Suspense } from "react";
import { ProjectDetailView } from "./ProjectDetailView";
import { ProjectsPageSkeleton } from "@/components/projects/ProjectsPageSkeleton";

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props) {
  return {
    title: `Proyecto ${params.id} | Kapa Ocho`,
    description: "Detalle del proyecto",
  };
}

export default function ProjectDetailPage({ params }: Props) {
  return (
    <Suspense fallback={<ProjectsPageSkeleton />}>
      <ProjectDetailView params={params} />
    </Suspense>
  );
}
