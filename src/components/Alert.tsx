import { Alert as ChakraAlert, AlertIcon, AlertProps } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect } from "react";

export interface IAlert extends AlertProps {
  status: "info" | "warning" | "success" | "error";
  message: string | null;
  setAlertMessage: Dispatch<SetStateAction<IAlert | null>>;
}

export function Alert({ status, message, setAlertMessage, ...rest }: IAlert): JSX.Element | null {  
  useEffect(() => {
    setTimeout(() => setAlertMessage(null), 3000);

  }, [message]);
  
  if (message) {
    return (
      <ChakraAlert status={status} {...rest}>
        <AlertIcon />
        { message }
      </ChakraAlert>
    )
  }
  return null;
}