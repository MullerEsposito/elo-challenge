import saveLeadService from "../services/SaveLeadService";
import { ILead, ILeadResponse } from "../types";

export function saveLeadController(lead: ILead): ILeadResponse {
  try {
    saveLeadService(lead);

    return {
      status: "success",
      message: "Lead cadastrado com sucesso!",
    }
  } catch (error: any) {
    return {
      status: "error",
      message: error.message,
    }
  }
}