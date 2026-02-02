import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import type { Project } from "@/types";
import type { IProjectRepository, ProjectCreateData } from "./IProjectRepository";

const STORAGE_DIR = path.join(process.cwd(), "data");
const STORAGE_FILE = path.join(STORAGE_DIR, "projects.json");
const STORAGE_KEY = "projects";

/**
 * Repository Pattern: implementación para servidor (API routes).
 * Misma interfaz IProjectRepository pero persiste en archivo JSON.
 */
export class FileProjectRepository implements IProjectRepository {
  private async ensureDir(): Promise<void> {
    try {
      await mkdir(STORAGE_DIR, { recursive: true });
    } catch {
      // ignore
    }
  }

  private async readRaw(): Promise<string> {
    await this.ensureDir();
    try {
      return await readFile(STORAGE_FILE, "utf-8");
    } catch (err) {
      const isNodeError = err && typeof err === "object" && "code" in err;
      if (isNodeError && (err as NodeJS.ErrnoException).code === "ENOENT")
        return JSON.stringify({ [STORAGE_KEY]: [] });
      throw err;
    }
  }

  private parseProjects(raw: string): Project[] {
    try {
      const data = JSON.parse(raw || "{}");
      const list = data[STORAGE_KEY];
      return Array.isArray(list) ? list : [];
    } catch {
      return [];
    }
  }

  async getAll(): Promise<Project[]> {
    try {
      const raw = await this.readRaw();
      return this.parseProjects(raw);
    } catch {
      return [];
    }
  }

  async getById(id: string): Promise<Project | null> {
    const projects = await this.getAll();
    return projects.find((p) => p.id === id) ?? null;
  }

  async create(data: ProjectCreateData): Promise<Project> {
    const projects = await this.getAll();
    const now = new Date().toISOString();
    const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
    const project: Project = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now,
    };    
    projects.push(project);
    await this.ensureDir();
    await writeFile(
      STORAGE_FILE,
      JSON.stringify({ [STORAGE_KEY]: projects }, null, 2),
      "utf-8"
    );
    return project;
  }

  async update(
    id: string,
    data: Partial<ProjectCreateData>
  ): Promise<Project | null> {
    const projects = await this.getAll();
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
    await this.ensureDir();
    await writeFile(
      STORAGE_FILE,
      JSON.stringify({ [STORAGE_KEY]: projects }, null, 2),
      "utf-8"
    );
    return projects[index];
  }
}
