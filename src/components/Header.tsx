import { Flex, Image, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import logo from "../assets/elo-logo-banner.jpg";

export function Header(): JSX.Element {
  return (
    <Flex 
        as="header"
        h="140px" maxW="none" 
        alignItems="center" 
        justifyContent="center"
        p="10px 5px"
    >
      <ChakraLink as={Link} to="/">
        <Image 
            src={logo}
            w={['200px', '240px', '280px']}
            h={140}
            transition="width 1s" 
            title="para página principal com logo da empresa contendo o nome ELOGROUP"
        />
      </ChakraLink>
    </Flex>
  );
}