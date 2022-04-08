import { FormEvent, useState } from "react";
import { Button, FormControl, FormLabel, Text } from "@chakra-ui/react";

import { Input } from "../components/Input";
import * as ls from "../services/localstorage";

export function RegisterUser() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [thereIsNotification, setThereIsNotification] = useState("");
    
    
    const clearRegisterForm = ():void => {
      const form = [setUser, setPassword, setConfirmationPassword];
      form.forEach( setState => setState(""));
    }
      
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {   
      e.preventDefault();   
      try {
        ls.saveUser({ user, password });
        clearRegisterForm();
        setThereIsNotification("Usuário registrado com sucesso!");
        setTimeout(() => setThereIsNotification(""), 3000);
        
      } catch (error: any) {
        setThereIsNotification(error.message);
        setTimeout(() => setThereIsNotification(""), 3000);
      }
    }
  
    return (
      <form
        onSubmit={onSubmit}
        style={{ flex: 1, width: '100%', margin: '0 auto', padding: '10px'}}
      >
        <FormControl
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
          <FormLabel as="legend" textAlign="center" fontSize="1.5rem">
            Cadastro de Novo Usuário
          </FormLabel>
  
          <Input 
            name="user" 
            value={user} 
            setValue={setUser}
            errorMessage="O campo usuário é obrigatório!"
            isRequired 
          >
            Usuário:
          </Input>
          <Input 
            type="password" 
            name="password" 
            value={password} 
            setValue={setPassword}
            validations={[
              { regex: /.+/, description: "O campo senha é obrigatório!" },
              { regex: /\d/, description: "Deve conter ao menos um dígito!" },
              { regex: /[A-Z]/, description: "Deve conter ao menos uma letra maiúscula!" },
              { regex: /[$*&@#]/, description: "Deve conter ao menos um caractere especial!" },
              { regex: /^[0-9a-zA-Z$*&@#]{8,}$/, description: "Deve conter ao menos 8 caracteres!" }
            ]}
          >
            Senha:
          </Input>
          <Input 
            type="password" 
            name="confirmationPassword" 
            value={confirmationPassword}
            setValue={setConfirmationPassword}
            validations={[
              { regex: /.+/, description: "O campo confirmação de senha é obrigatório!" },
              { regex: password, description: "As senhas devem ser iguais!" }
            ]}
            errorMessage="O campo confirmação de senha é obrigatório!"
            isRequired
          >
            Confirmação de Senha:
          </Input>
          {!!thereIsNotification && <Text>{thereIsNotification}</Text>}
  
          <Button 
            // onClick={onSubmit}
            type="submit"
            alignSelf="center" 
            mt="10px"
            bg="green.400" 
            color="white" 
            _hover={{ bg: 'green.500' }}
          >
            Salvar
          </Button>
        </FormControl>
      </form>
    )
  }