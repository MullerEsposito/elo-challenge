import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react"
import App from './App';

import { theme } from "./styles/theme";
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container as Element);

root.render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ChakraProvider>
);
