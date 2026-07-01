// App.jsx — Point d'entrée principal de Keylo
// Gère le routing (navigation entre les pages)

import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout principal qui contient la Sidebar + Header
import Layout from "./components/layout/Layout";

// Pages de l'application
import Dashboard from "./pages/Dashboard";
import Biens from "./pages/Biens";
import BienDetail from "./pages/BienDetail";
import PaiementHistory from "./pages/PaiementHistory";
import Paiements from "./pages/Paiements";
import Documents from "./pages/Documents";
import Parametres from "./pages/Parametres";
import { properties as initialProperties } from "./data/properties";

export default function App() {
  // Source commune des biens pour les pages qui doivent rester synchronisées.
  // Tant qu'il n'y a pas d'API, ce state remplace la base de données côté front.
  const [properties, setProperties] = useState(initialProperties);

  // Met à jour un bien complet, par exemple après le formulaire de modification.
  // On remplace uniquement le bien dont l'id correspond et on conserve les autres tels quels.
  const updateProperty = (updatedProperty) => {
    setProperties((currentProperties) =>
      currentProperties.map((property) =>
        property.id === updatedProperty.id ? updatedProperty : property
      )
    );
  };

  // Passe le prochain paiement d'un bien en "Payé".
  // Comme Dashboard et BienDetail lisent tous les deux ce state, les deux écrans se mettent à jour.
  const markPropertyAsPaid = (propertyId) => {
    setProperties((currentProperties) =>
      currentProperties.map((property) =>
        property.id === propertyId ? { ...property, status: "Payé" } : property
      )
    );
  };

  // Supprime un bien depuis la liste.
  // Centraliser cette action garde la liste, le dashboard et les routes de détail cohérents.
  const deleteProperty = (propertyId) => {
    setProperties((currentProperties) =>
      currentProperties.filter((property) => property.id !== propertyId)
    );
  };

  return (
    // BrowserRouter active la navigation dans l'app
    <BrowserRouter>
      <Routes>
        {/* Route parent : toutes les pages partagent le même Layout */}
        <Route path="/" element={<Layout />}>

          {/* Redirige "/" vers "/dashboard" automatiquement */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Pages principales */}
          <Route path="dashboard" element={<Dashboard properties={properties} />} />
          <Route
            path="biens"
            element={<Biens properties={properties} onDeleteProperty={deleteProperty} />}
          />
          <Route
            path="biens/:bienId"
            element={
              <BienDetail
                properties={properties}
                onUpdateProperty={updateProperty}
                onMarkPropertyAsPaid={markPropertyAsPaid}
              />
            }
          />
          <Route
            path="biens/:bienId/paiements"
            element={<PaiementHistory properties={properties} />}
          />
          <Route path="paiements" element={<Paiements />} />
          <Route path="documents" element={<Documents />} />
          <Route path="parametres" element={<Parametres />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
