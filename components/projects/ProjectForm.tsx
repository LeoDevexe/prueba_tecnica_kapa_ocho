"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createProjectSchema } from "@/lib/validations/project";
import type { ProjectStatus } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { useToast } from "@/lib/hooks/useToast";

const STATUS_OPTIONS: { value: ProjectStatus; label: string }[] = [
  { value: "PLANNED", label: "Planificado" },
  { value: "IN_PROGRESS", label: "En progreso" },
  { value: "DONE", label: "Completado" },
];

interface ProjectFormProps {
  defaultValues?: {
    name: string;
    client: string;
    status: ProjectStatus;
    description?: string;
  };
  submitLabel?: string;
  onSubmit: (data: {
    name: string;
    client: string;
    status: ProjectStatus;
    description?: string;
  }) => Promise<unknown>;
  onSuccessRedirect?: string;
}

export function ProjectForm({
  defaultValues,
  submitLabel = "Crear proyecto",
  onSubmit,
  onSuccessRedirect,
}: ProjectFormProps) {
  const router = useRouter();
  const { addToast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [name, setName] = useState(defaultValues?.name ?? "");
  const [client, setClient] = useState(defaultValues?.client ?? "");
  const [status, setStatus] = useState<ProjectStatus>(
    defaultValues?.status ?? "PLANNED"
  );
  const [description, setDescription] = useState(
    defaultValues?.description ?? ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = createProjectSchema.safeParse({
      name,
      client,
      status,
      description: description || undefined,
    });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        const path = err.path[0];
        if (path && typeof path === "string")
          fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);
      addToast("error", "Revisa los campos del formulario.");
      return;
    }
    setErrors({});
    startTransition(async () => {
      try {
        await onSubmit(parsed.data);
        addToast("success", "Proyecto guardado correctamente.");
        if (onSuccessRedirect) router.push(onSuccessRedirect);
      } catch (err) {
        addToast(
          "error",
          err instanceof Error ? err.message : "Error al guardar el proyecto."
        );
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <Input
        label="Nombre del proyecto"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
        placeholder="Ej: Sitio web corporativo"
        required
        maxLength={120}
        autoComplete="off"
        aria-required="true"
      />
      <Input
        label="Cliente"
        value={client}
        onChange={(e) => setClient(e.target.value)}
        error={errors.client}
        placeholder="Ej: Acme Corp"
        required
        maxLength={120}
        autoComplete="off"
        aria-required="true"
      />
      <Select
        label="Estado"
        value={status}
        onChange={(e) => setStatus(e.target.value as ProjectStatus)}
        options={STATUS_OPTIONS}
        error={errors.status}
        aria-label="Estado del proyecto"
      />
      <Textarea
        label="Descripción (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={errors.description}
        placeholder="Breve descripción del proyecto..."
        maxLength={500}
        rows={4}
      />
      <div className="flex gap-3 pt-2">
        <Button type="submit" isLoading={isPending} fullWidth>
          {submitLabel}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
          disabled={isPending}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
