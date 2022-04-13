import { ILead } from "../types";

export function fetchLeadsService(): ILead[] {
  const leadsStorage = localStorage.getItem("@ELOCHALLENGE-LEADS");
  const leads: ILead[] = leadsStorage ? JSON.parse(leadsStorage) : null;

  return leads;
}