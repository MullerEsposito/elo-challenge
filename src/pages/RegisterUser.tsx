import { FormEvent, useState } from "react";
import { Button, Flex, Image } from "@chakra-ui/react";

import { SaveUserController } from "../modules/users/controllers/SaveUserController";
import { Input } from "../components/Input";
import { Alert, IAlert } from "../components/Alert";
import { Fieldset } from "../components/Fieldset";

import logo from "../assets/elo-logo-banner.jpg";
import { Link } from "react-router-dom";
import { validations } from "../components/Input/validations";

export function RegisterUser() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState<IAlert | null>(null);
  
  
  const clearRegisterForm = ():void => {
    const form = [setUser, setPassword, setConfirmationPassword];
    form.forEach( setState => setState(""));
  }
    
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {   
    e.preventDefault();   
    const { status, message } = SaveUserController({ user, password });
    
    setAlertMessage({ status, message, setAlertMessage });      
    if (status === "success") clearRegisterForm();
  }

  document.title = "EloGroup - Registro de Usuário";
  return (
    <Flex as="main" h="100vh" flexDirection="column" alignItems="center" justifyContent="center">
      <Link to="/">
        <Image 
          src={logo} 
          w="400px" h="140"
          mb="5"
          alt="Link para página principal com logo da empresa contendo o nome ELOGROUP"
        />
      </Link>
    
      <form id="form-user" onSubmit={onSubmit} style={{ width: '100%'}}>
        <Fieldset label="Cadastro de Usuário">
          <Input name="user" value={user} setValue={setUser} 
            validations={[ validations.isRequired("usuário") ]}
            isRequired
          >
            Usuário:
          </Input>
          <Input name="password" type="password" value={password} setValue={setPassword}
            validations={[
             validations.isRequired("senha"),
             validations.atLeast1Digit,
             validations.atLeastOneCapitalLetter,
             validations.atLeastOneSpecialCharacter,
             validations.atLeast8Chars,
            ]}
            alt="A senha deve ter pelo menos um dígito, uma letra maiúscula e um caracter especial"
            isRequired
          >
            Senha:
          </Input>
          <Input name="password-confirmation" type="password" value={confirmationPassword} setValue={setConfirmationPassword}
            validations={[
              validations.isRequired("confirmação de senha"),
              { regex: password, description: "As senhas devem ser iguais!" }
            ]}
            isRequired
          >
            Confirmação de Senha:
          </Input>
          { alertMessage && <Alert message={alertMessage.message} setAlertMessage={setAlertMessage} status={alertMessage.status} />}

          <Button 
            type="submit"
            alignSelf="center" 
            mt="10px"
            bg="green.400" 
            color="white" 
            _hover={{ bg: 'green.500' }}
          >
            Salvar
          </Button>
        </Fieldset>
      </form>
    </Flex>
  )
}