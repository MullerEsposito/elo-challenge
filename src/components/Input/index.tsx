import React, { Dispatch, useState, useRef } from 'react';
import { FormControl, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps, Text } from '@chakra-ui/react';

interface InputProps extends ChakraInputProps {
  validations?: { regex: RegExp | string, description: string }[] ;
  setValue: Dispatch<React.SetStateAction<string>>;
  value: string;
}

export const Input: React.FC<InputProps> = ({ validations=[], value, setValue, children, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasError, setHasError] = useState(false);
  
  const validates = (fieldValue: string) => {
    inputRef.current?.setCustomValidity('');

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

    setValue(fieldValue); 
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
        onChange={e => validates(e.currentTarget.value)}
        onInvalid={() => validates(value)}
        value={value}
        ref={inputRef}
        {...rest}
      />
    </FormControl>
  )
};