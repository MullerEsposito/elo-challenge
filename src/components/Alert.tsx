import { Alert as ChakraAlert, AlertIcon } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect } from "react";

export interface IAlert {
  status: "info" | "warning" | "success" | "error";
  message: string | null;
  setAlertMessage: Dispatch<SetStateAction<IAlert | null>>;
}

export function Alert({ status, message, setAlertMessage }: IAlert): JSX.Element | null {  
  useEffect(() => {
    setTimeout(() => setAlertMessage(null), 3000);

  }, [message]);
  
  if (message) {
    return (
      <ChakraAlert status={status}>
        <AlertIcon />
        { message }
      </ChakraAlert>
    )
  }
  return null;
}