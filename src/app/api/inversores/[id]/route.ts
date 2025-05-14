import { NextRequest, NextResponse } from "next/server";
import { inversorSchema } from "../../../../../dtos/inversorValidationDTO";
import { tratarErro } from "../../../../../utils/tratamentoErros";
import { getInversorById, getIdFromParams, updateInversor, deleteInversor} from "../../../../../services/inversorServices"; 


export async function GET(request: NextRequest) {
  try {
    const id = getIdFromParams(request);
    const inversor =  await getInversorById(id);

    return NextResponse.json({ success: true, body: inversor });
  } catch (error) {
    return tratarErro(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const id = getIdFromParams(request);
    const body = await request.json();
    const data = inversorSchema.parse(body);
    const updatedInversor = await updateInversor(id, data);

    return NextResponse.json({ success: true, body: updatedInversor });
  } catch (error) {
    return tratarErro(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = getIdFromParams(request);
    await deleteInversor(id);
    return NextResponse.json({ success: true, message: "Inversor deletado com sucesso." });
  } catch (error) {
    return tratarErro(error);
  }
}