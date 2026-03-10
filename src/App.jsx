// App.jsx — Point d'entrée principal de Keylo
// Gère le routing (navigation entre les pages)

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout principal qui contient la Sidebar + Header
import Layout from "./components/layout/Layout";

// Pages de l'application
import Dashboard from "./pages/Dashboard";
import Biens from "./pages/Biens";
import Paiements from "./pages/Paiements";
import Documents from "./pages/Documents";
import Parametres from "./pages/Parametres";

export default function App() {
  return (
    // BrowserRouter active la navigation dans l'app
    <BrowserRouter>
      <Routes>
        {/* Route parent : toutes les pages partagent le même Layout */}
        <Route path="/" element={<Layout />}>

          {/* Redirige "/" vers "/dashboard" automatiquement */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Pages principales */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="biens" element={<Biens />} />
          <Route path="paiements" element={<Paiements />} />
          <Route path="documents" element={<Documents />} />
          <Route path="parametres" element={<Parametres />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}