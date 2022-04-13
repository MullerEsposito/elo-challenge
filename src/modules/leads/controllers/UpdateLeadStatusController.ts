import { updateLeadStatusService } from "../services/UpdateLeadStatusService";
import { ILead } from "../types";

interface IUpdateLeadStatusDTO {
  leads: ILead[];
  idLeadToUpdate: string;
  idxNewStatus: number;
}

interface IUpdateLeadStatusResponse {
  status: "success" | "error";
  message: string;
  content?: ILead[];
}

export function updateLeadStatusController(
  data: IUpdateLeadStatusDTO
): IUpdateLeadStatusResponse {
  try {
    const updatedLeads = updateLeadStatusService(data);

    return {
      status: "success",
      message: "Status do lead atualizado com sucesso!",
      content: updatedLeads,
    }
  } catch (error: any) {
    return {
      status: "error",
      message: error.message,
    }    
  }
}