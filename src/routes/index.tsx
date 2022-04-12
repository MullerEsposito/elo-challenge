import { Routes as DOMRoutes, Route } from "react-router-dom"
import { Home } from "../pages/Home";
import { LeadsPanel } from "../pages/LeadsPanel";
import { RegisterLead } from "../pages/RegisterLead";
import { RegisterUser } from "../pages/RegisterUser";

export function Routes(): JSX.Element {
  return (
    <DOMRoutes>
      <Route path="/" element={<Home />} /> 
      <Route path="/users/register" element={<RegisterUser />} />
      <Route path="/leads" element={<LeadsPanel />} />
      <Route path="/leads/register" element={<RegisterLead />} />            
      <Route path="*" element={<main><p>Página não encontrada!</p></main>} />
    </DOMRoutes>
  );
};