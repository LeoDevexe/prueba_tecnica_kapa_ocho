import { NextRequest, NextResponse } from "next/server";
import { updateProjectSchema } from "@/lib/validations/project";
import { FileProjectRepository } from "@/lib/storage/repositories/FileProjectRepository";

const repository = new FileProjectRepository();

type RouteContext = { params: { id: string } };

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = context.params;
    const project = await repository.getById(id);
    if (!project) {
      return NextResponse.json(
        { error: "Proyecto no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(project);
  } catch (err) {
    const message =
      err && typeof err === "object" && "message" in err
        ? String((err as { message: string }).message)
        : "Error al obtener proyecto";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = context.params;
    const body = await request.json();
    const parsed = updateProjectSchema.safeParse(body);
    if (!parsed.success) {
      const issues = parsed.error.flatten();
      return NextResponse.json(
        { error: "Validación fallida", issues: issues.fieldErrors },
        { status: 400 }
      );
    }
    const updated = await repository.update(id, parsed.data);
    if (!updated) {
      return NextResponse.json(
        { error: "Proyecto no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(updated);
  } catch (err) {
    const message =
      err && typeof err === "object" && "message" in err
        ? String((err as { message: string }).message)
        : "Error al actualizar proyecto";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
