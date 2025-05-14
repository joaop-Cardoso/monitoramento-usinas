import { NextRequest, NextResponse } from "next/server";
import { usinaSchema } from "../../../../../dtos/usinaValidationDTO";
import { tratarErro } from "../../../../../utils/tratamentoErros";
import { getUsinaById, updateUsina, deleteUsina, getIdFromParams} from "../../../../../services/usinaServices"; 
// , updateUsina, deleteUsina,

export async function GET(request: NextRequest) {
  try {
    const id = getIdFromParams(request);
    const usina =  await getUsinaById(id);

    return NextResponse.json({ success: true, body: usina });
  } catch (error) {
    return tratarErro(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const id = getIdFromParams(request);
    const body = await request.json();
    const data = usinaSchema.parse(body);
    const updatedUsina = await updateUsina(id, data);

    return NextResponse.json({ success: true, body: updatedUsina });
  } catch (error) {
    return tratarErro(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = getIdFromParams(request);
    await deleteUsina(id);
    return NextResponse.json({ success: true, message: "Usina deletada com sucesso." });
  } catch (error) {
    return tratarErro(error);
  }
}