import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import type { Project } from "@/types";

const STORAGE_DIR = path.join(process.cwd(), "data");
const STORAGE_FILE = path.join(STORAGE_DIR, "projects.json");
const STORAGE_KEY = "projects";

export interface StorageError {
  code: "READ_ERROR" | "WRITE_ERROR" | "PARSE_ERROR" | "NOT_FOUND";
  message: string;
}

async function ensureDir(): Promise<void> {
  try {
    await mkdir(STORAGE_DIR, { recursive: true });
  } catch {
    // ignore if exists
  }
}

async function readRaw(): Promise<string> {
  await ensureDir();
  try {
    return await readFile(STORAGE_FILE, "utf-8");
  } catch (err) {
    const isNodeError = err && typeof err === "object" && "code" in err;
    if (isNodeError && (err as NodeJS.ErrnoException).code === "ENOENT")
      return JSON.stringify({ [STORAGE_KEY]: [] });
    const message = err instanceof Error ? err.message : "Unknown read error";
    throw { code: "READ_ERROR" as const, message };
  }
}

function parseProjects(raw: string): Project[] {
  try {
    const data = JSON.parse(raw || "{}");
    const list = data[STORAGE_KEY];
    if (!Array.isArray(list)) return [];
    return list;
  } catch {
    throw { code: "PARSE_ERROR" as const, message: "Invalid JSON in storage" };
  }
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const raw = await readRaw();
    return parseProjects(raw);
  } catch (err) {
    if (err && typeof err === "object" && "code" in err) {
      if ((err as StorageError).code === "READ_ERROR") return [];
    }
    throw err;
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  const projects = await getAllProjects();
  return projects.find((p) => p.id === id) ?? null;
}

export async function saveProjects(projects: Project[]): Promise<void> {
  await ensureDir();
  const data = { [STORAGE_KEY]: projects };
  try {
    await writeFile(STORAGE_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown write error";
    throw { code: "WRITE_ERROR" as const, message };
  }
}

export async function createProject(project: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<Project> {
  const projects = await getAllProjects();
  const now = new Date().toISOString();
  const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
  const newProject: Project = {
    ...project,
    id,
    createdAt: now,
    updatedAt: now,
  };
  projects.push(newProject);
  await saveProjects(projects);
  return newProject;
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
  const projects = await getAllProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const now = new Date().toISOString();
  const { id: _id, createdAt, ...rest } = updates;
  projects[index] = {
    ...projects[index],
    ...rest,
    id: projects[index].id,
    createdAt: projects[index].createdAt,
    updatedAt: now,
  };
  await saveProjects(projects);
  return projects[index];
}
