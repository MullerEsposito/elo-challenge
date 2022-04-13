import { Flex } from "@chakra-ui/react";
import { GiArchiveRegister, GiLeadPipe } from "react-icons/gi";
import { Link } from "react-router-dom";
import { CardMenu } from "../components/CardMenu";

export function Home(): JSX.Element {
  document.title = "EloGroup - Home";
  return (
    <Flex alignItems="center" justifyContent="space-evenly" h="60vh" w="70vw" m="0 auto">
      <Link to="/users/register" title="para a tela de registro de usuário">
        <CardMenu 
          icon={GiArchiveRegister} 
          iconColor="blue.400"
          label="Registro de Usuário" 
        />
      </Link>
      <Link to="/leads" title="para a tela de painel de leads">
        <CardMenu 
          icon={GiLeadPipe} 
          iconColor="green.400"
          label="Painel de Leads" 
        />
      </Link>
    </Flex>
  )
}