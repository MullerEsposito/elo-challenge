import React, { Dispatch, useState } from 'react';
import { FormControl, FormLabel, Tooltip, Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react';
import { useRef } from 'react';

interface InputProps extends ChakraInputProps {
    validations?: { regex: RegExp | string, description: string }[] ;
    errorMessage?: string;
    children: string;  
    setValue: Dispatch<React.SetStateAction<string>>;
}

export const Input = ({ errorMessage, validations=[], setValue, children, ...rest }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasError, setHasError] = useState(false);
  
  const validation = (fieldValue: string) => {
    for (const validation of validations) {
        const matched = !!fieldValue.match(validation.regex);
        
        if (!matched) {
            inputRef.current?.setCustomValidity(validation.description);
            setHasError(true);
            break;
        } else {
            inputRef.current?.setCustomValidity('');
            setHasError(false);
        }
    };
  }

  return (
    <FormControl
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        mb={5}
      >
        <FormLabel>{children}</FormLabel>
            <ChakraInput 
                errorBorderColor="red.500" 
                borderColor="gray.400"
                isInvalid={hasError}
                onChange={(e) => { setValue(e.currentTarget.value); validation(e.currentTarget.value)}}
                // onInvalid={() => errorMessage && inputRef.current?.setCustomValidity(errorMessage)}
                ref={inputRef}
                {...rest}
            />  
    </FormControl>
  )
};