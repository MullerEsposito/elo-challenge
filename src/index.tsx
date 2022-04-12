import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react"
import App from './App';

import { theme } from "./styles/theme";

const container = document.getElementById('root');
const root = createRoot(container as Element);

root.render(
  <ChakraProvider theme={theme}>
      <App />
  </ChakraProvider>
);
