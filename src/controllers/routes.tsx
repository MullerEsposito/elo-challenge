import { Routes as DOMRoutes, Route } from "react-router-dom"
import { RegisterUser } from "../pages/RegisterUser";

export function Routes(): JSX.Element {
    return (
        <DOMRoutes>
            <Route path="/register" element={<RegisterUser />}/>
            <Route path="/" element={<div>Home</div>}/>
        </DOMRoutes>
    );
};