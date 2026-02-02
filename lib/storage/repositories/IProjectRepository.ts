import type { Project } from "@/types";

export type ProjectCreateData = Omit<
  Project,
  "id" | "createdAt" | "updatedAt"
>;

export interface IProjectRepository {
  getAll(): Promise<Project[]>;
  getById(id: string): Promise<Project | null>;
  create(data: ProjectCreateData): Promise<Project>;
  update(id: string, data: Partial<ProjectCreateData>): Promise<Project | null>;
}
