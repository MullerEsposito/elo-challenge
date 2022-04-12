import { ILead } from "../types";

export default function saveLeadService(lead: ILead): void {
  if (!lead.opportunities.length) throw Error("É necessário marcar pelo menos uma opção!");

  const leadsStorage = localStorage.getItem("@ELOCHALLENGE-LEADS");
  const leads: ILead[] = leadsStorage ? JSON.parse(leadsStorage) : [];
  
  const leadAlreadyExist = leads.some(({ email }) => email === lead.email);
  if (leadAlreadyExist) throw new Error("Já existe um lead cadastrado com este e-mail!");

  leads.push({ status: "potential", ...lead});
  localStorage.setItem("@ELOCHALLENGE-LEADS", JSON.stringify(leads));
}