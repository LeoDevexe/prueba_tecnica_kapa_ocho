"use client";

import type { Project } from "@/types";

const STORAGE_KEY = "kapa-ocho-projects";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getStoredProjects(): Project[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function setStoredProjects(projects: Project[]): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error("LocalStorage write error:", e);
  }
}

export function getStoredProjectById(id: string): Project | null {
  const projects = getStoredProjects();
  return projects.find((p) => p.id === id) ?? null;
}
