import { ZodError } from "zod";
import { NextResponse } from "next/server";

export function tratarErro(error: any) {
  // Tratamento de erro de validação (ZodError)
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        message: "Erro de validação.",
        issues: error.errors,
      },
      { status: 400 }
    );
  }

  // Tratamento de erro de conflito (409)
  if (error.status === 409) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Conflito: recurso já existe.",
      },
      { status: 409 }
    );
  }

  if (error.status === 404) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Recurso inexistente.",
      },
      { status: 404 }
    );
  }

  // Erro interno do servidor (500)
  console.error("Erro interno:", error);
  return NextResponse.json(
    {
      success: false,
      message: "Erro interno do servidor.",
    },
    { status: 500 }
  );
}