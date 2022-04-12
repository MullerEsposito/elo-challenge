import { Icon, Link as ChakraLink } from "@chakra-ui/react";
import { IoIosReturnLeft } from "react-icons/io";
import { Link } from "react-router-dom";

export interface IButtonBack {
  id?: string;
  to: string;
  title?: string;
}

export function ButtonBack({ id, to, title }: IButtonBack): JSX.Element {
  return (
  <ChakraLink id={id} as={Link} to={to} alignSelf="flex-start" ml="10px" title={title}>
    <Icon 
      as={IoIosReturnLeft} 
      size="15" 
      w="30px" h="30px" 
      color="white" 
      borderRadius="15px"
      bg="blackAlpha.700"
      _hover={{ bg: "blackAlpha.900"}}
      transition="background 0.8s"
    />
  </ChakraLink>
  );
}