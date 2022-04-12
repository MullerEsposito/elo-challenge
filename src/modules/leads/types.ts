export type ILeadStatus = "potential" | "confirmed" | "schelled";

export interface ILead {
  name: string;
  phone: string;
  email: string;
  status?: ILeadStatus;
  opportunities: string[];
}

export interface ILeadResponse {
  status: "success" | "error";
  message: string;
}