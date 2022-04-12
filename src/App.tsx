import { useLocation } from "react-router-dom";

import { Header } from './components/Header';
import { Routes } from './routes';

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/users/register" && <Header />}
      <Routes />
    </>
  )
}

export default App;
