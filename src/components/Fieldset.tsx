import { FormLabel, Stack } from "@chakra-ui/react";

interface IFieldset {
  children: React.ReactNode;
  label?: string;
}

export function Fieldset({ children, label }: IFieldset): JSX.Element {
  return (
    <Stack
      as="fieldset"
      display="flex"
      flexDirection="column"
      maxW="400px"
      m="0 auto"
      p="10px"
      border="1px"
      borderColor="#ccccccab"
      bg="white"
    >
      { label && (
        <FormLabel as="legend" textAlign="center" fontSize="1.5rem">
          { label }
        </FormLabel>
      )}
      { children }
    </Stack>
  )
}