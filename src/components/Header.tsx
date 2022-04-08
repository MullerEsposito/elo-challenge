import { Flex, Image, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";

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
            src="assets/elo-logo-banner.jpg" 
            w={['200px', '240px', '280px']}
            h={140}
            transition="width 1s" 
            title="Logo da empresa contendo o nome ELOGROUP."
        />
      </ChakraLink>
    </Flex>
  );
}