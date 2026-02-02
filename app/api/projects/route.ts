import { NextRequest, NextResponse } from "next/server";
import { createProjectSchema } from "@/lib/validations/project";
import { FileProjectRepository } from "@/lib/storage/repositories/FileProjectRepository";

const repository = new FileProjectRepository();

export async function GET() {
  try {
    const projects = await repository.getAll();
    return NextResponse.json(projects);
  } catch (err) {
    const message =
      err && typeof err === "object" && "message" in err
        ? String((err as { message: string }).message)
        : "Error al listar proyectos";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = createProjectSchema.safeParse(body);
    if (!parsed.success) {
      const issues = parsed.error.flatten();
      return NextResponse.json(
        { error: "Validación fallida", issues: issues.fieldErrors },
        { status: 400 }
      );
    }
    const project = await repository.create({
      name: parsed.data.name,
      client: parsed.data.client,
      status: parsed.data.status,
      description: parsed.data.description,
    });
    return NextResponse.json(project, { status: 201 });
  } catch (err) {
    const message =
      err && typeof err === "object" && "message" in err
        ? String((err as { message: string }).message)
        : "Error al crear proyecto";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
