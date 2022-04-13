import { Flex, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import * as CSS from "csstype"
import { Token } from "@chakra-ui/styled-system/dist/declarations/src/utils";

interface ICardMenu {
  icon: IconType;
  iconColor: Token<CSS.Property.Color, "colors">;
  label: string;
}

export function CardMenu({ icon, iconColor, label }: ICardMenu): JSX.Element {
  return (
    <Flex 
      flexDirection="column" 
      alignItems="center" 
      w={["100px", "150px"]}
      _hover={{ mb: "15px" }}
      transition="margin-bottom 0.3s; width 1s"
      role="group"
    >
      <Icon 
        as={icon} 
        size="100" 
        w="100%" h={["100", "200"]} 
        color={iconColor} 
        bg="black"
        border="1px solid black"
        borderRadius="10px 10px 0 0"
        transition="height 1s"
      />
      <Text 
        fontSize="1rem" 
        bg="gray" 
        p="5px 0" 
        w="100%" 
        border="1px solid black"
        borderRadius="0 0 10px 10px"
        textAlign="center"
        fontWeight="600"
        color="rgba(255,255,255,0.7)"
        _groupHover={{ color: "white" }}
        transition="color 0.8s"
      >
        {label}
      </Text>
    </Flex>
  );
}