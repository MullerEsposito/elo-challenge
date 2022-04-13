import { fetchLeadsService } from "../services/FetchLeadsService";
import { ILead } from "../types";

export function FetchLeadsController(): ILead[] {
  
  const leads = fetchLeadsService();
  return leads;
}