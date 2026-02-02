import { z } from "zod";

const projectStatusEnum = z.enum(["PLANNED", "IN_PROGRESS", "DONE"]);

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(120, "Máximo 120 caracteres"),
  client: z
    .string()
    .min(1, "El cliente es requerido")
    .max(120, "Máximo 120 caracteres"),
  status: projectStatusEnum.default("PLANNED"),
  description: z.string().max(500).optional(),
});

export const updateProjectSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  client: z.string().min(1).max(120).optional(),
  status: projectStatusEnum.optional(),
  description: z.string().max(500).optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
