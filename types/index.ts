export type ProjectStatus = "PLANNED" | "IN_PROGRESS" | "DONE";

export interface Project {
  id: string;
  name: string;
  client: string;
  status: ProjectStatus;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export type ProjectCreateInput = Omit<
  Project,
  "id" | "createdAt" | "updatedAt"
>;

export type ProjectUpdateInput = Partial<
  Pick<Project, "name" | "client" | "status" | "description">
>;
