import { FormEvent, useState } from "react";
import { Button, Flex, Stack } from "@chakra-ui/react";

import { Input } from "../components/Input";
import { Alert, IAlert } from "../components/Alert";
import { ButtonBack } from "../components/ButtonBack";
import { CheckBoxTable } from "../components/CheckBoxTable";
import { saveLeadController } from "../modules/leads/controllers/SaveLeadController";

import * as mask from "../components/Input/masks";
import * as data from "../data";
import { validations } from "../components/Input/validations";

export function RegisterLead(): JSX.Element {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [opportunities, setOpportunities] = useState<string[]>([]);
    const [alertMessage, setAlertMessage] = useState<IAlert | null>(null);
    
    const clearRegisterForm = (): void => {
        const form = [setName, setPhone, setEmail];
        form.forEach(setState => setState(""));
        setOpportunities([]);
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();      
      
      const { status, message } = saveLeadController({ name, phone, email, opportunities });
      setAlertMessage({ status, message, setAlertMessage });  
      if (status === "success") clearRegisterForm();
    };

    document.title = "EloGroup - Registro de Leads";

    return (
      <Flex 
        as="main"
        flexDirection={"column"} 
        alignItems="center"
        maxW="800px"
        m="0 auto"
      >
        <form
          onSubmit={onSubmit}
          style={{ flex: 1, width: '100%', margin: '0 auto', padding: '10px' }}
        >
          <Flex  
            justifyContent="space-between"
            flexDirection={["column", "row"]}
            m="0 auto"
            p="10px"
            border="1px"
            borderColor="#ccccccab"
            bg="white"
          >
            <Flex flexDirection={"column"}>
              <Input
                name="name"
                value={name}
                setValue={setName}
                validations={[validations.isRequired("nome")]}
                isRequired
              >
                Nome:
              </Input>
              <Input
                name="phone"
                type="tel"
                maxLength={15}
                value={phone}
                setValue={setPhone}
                onKeyUp={mask.phone}
                validations={[validations.isRequired("telefone"), validations.atLeast10Digits]}
                isRequired
              >
                Telefone:
              </Input>
              <Input
                type="email"
                name="email"
                value={email}
                setValue={setEmail}
                validations={[validations.isRequired("e-mail")]}
                isRequired
              >
                E-mail:
              </Input>
            </Flex>
            
            <Stack w={["100%", "50%"]}>
              <CheckBoxTable
                id="checkbox-group"
                items={data.opportunities} 
                checkedValues={opportunities}
                setCheckedValues={setOpportunities}
                label="Oportunidades" 
              />

              <Button
                type="submit"
                mt="auto"
                mb="20px"
                bg="green.400"
                color="white"
                _hover={{ bg: 'green.500' }}
              >
                Salvar
              </Button>

            </Stack>
          </Flex>
        </form>
        <ButtonBack id="button-back" to="/leads" title="Voltar para a tela anterior" />
        { alertMessage && <Alert color="black" message={alertMessage.message} setAlertMessage={setAlertMessage} status={alertMessage.status} />}
      </Flex>
    );
};
