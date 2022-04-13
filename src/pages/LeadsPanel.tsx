import { useEffect, useState } from "react";
import { Button, Flex } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { FetchLeadsController } from "../modules/leads/controllers/FetchLeadsController";
import { ILead } from "../modules/leads/types";
import { DnDTable } from "../components/DnDTable";

export function LeadsPanel(): JSX.Element {
  const [leads, setLeads] = useState<ILead[]>([]);

  useEffect(() => {
    setLeads(FetchLeadsController());
  }, []);

  
  document.title = "EloGroup - Painel de Leads";
  return (
    <Flex as="main" flexDirection={"column"} m={[0, 0, 10]}>
      <Link to="/leads/register" style={{ alignSelf: "flex-start"}} title="Botão para a tela de cadastro de novo lead.">
        <Button 
          alignSelf="flex-start" 
          m="10px 0"
          bg="blue.400" 
          color="white" 
          _hover={{ bg: 'blue.500' }}
        >
          Novo Lead (+)
        </Button>
      </Link>

      <DnDTable leads={leads} setLeads={setLeads} /> 
    </Flex>
  );
};
