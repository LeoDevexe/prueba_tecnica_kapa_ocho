"use client";

import type { Project } from "@/types";
import { BaseRepository } from "./BaseRepository";
import type { IProjectRepository, ProjectCreateData } from "./IProjectRepository";

const STORAGE_KEY = "kapa-ocho-projects";

function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Repository Pattern: implementación concreta para Project usando localStorage.
 * Extiende BaseRepository y cumple IProjectRepository.
 */
export class ProjectRepository
  extends BaseRepository<Project>
  implements IProjectRepository
{
  constructor() {
    super(STORAGE_KEY);
  }

  async getAll(): Promise<Project[]> {
    return Promise.resolve(this.getAllSync());
  }

  getAllSync(): Project[] {
    return super.getAll();
  }

  async getById(id: string): Promise<Project | null> {
    const projects = this.getAllSync();
    return projects.find((p) => p.id === id) ?? null;
  }

  async create(data: ProjectCreateData): Promise<Project> {
    const projects = this.getAllSync();
    const now = new Date().toISOString();
    const project: Project = {
      ...data,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
    projects.push(project);
    this.save(projects);
    return project;
  }

  async update(
    id: string,
    data: Partial<ProjectCreateData>
  ): Promise<Project | null> {
    const projects = this.getAllSync();
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) return null;
    const now = new Date().toISOString();
    projects[index] = {
      ...projects[index],
      ...data,
      id: projects[index].id,
      createdAt: projects[index].createdAt,
      updatedAt: now,
    };
    this.save(projects);
    return projects[index];
  }
}
