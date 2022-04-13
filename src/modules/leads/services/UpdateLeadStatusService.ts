import { ILead, ILeadStatus } from "../types";

interface IUpdateLeadStatusDTO {
  leads: ILead[];
  idLeadToUpdate: string;
  idxNewStatus: number;
}

const status: ILeadStatus[] = ["potential", "confirmed", "schelled"];

export function updateLeadStatusService({ 
  leads, idLeadToUpdate, idxNewStatus
}: IUpdateLeadStatusDTO): ILead[] {
  
  const leadToUpdate = leads.find(({email}) => email === idLeadToUpdate);
  if (!leadToUpdate) throw Error("Lead não encontrado!");
  
  const idxOldStatus = status.findIndex(value => value === leadToUpdate.status);

  if (idxNewStatus < idxOldStatus) throw Error("Não é possível mover para um status anterior!");
  if ((idxNewStatus - idxOldStatus) > 1) throw Error("Não é possível pular mais de uma coluna!");

  const updatedLeads = leads.map(lead => ( 
    lead.email === idLeadToUpdate
        ? ({ ...lead, status: status[idxNewStatus]})
        : lead
  ));

  localStorage.setItem("@ELOCHALLENGE-LEADS", JSON.stringify(updatedLeads));
  
  return updatedLeads;
}