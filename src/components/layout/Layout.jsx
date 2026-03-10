// Layout.jsx — Structure commune à toutes les pages
// Contient la Sidebar (gauche) + Header (haut) + contenu principal

import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
  return (
    // Conteneur principal en flex horizontal
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>

      {/* Sidebar fixe à gauche */}
      <Sidebar />

      {/* Zone droite : Header + contenu de la page */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Header fixe en haut */}
        <Header />

        {/* Outlet = la page active s'affiche ici (Dashboard, Biens, etc.) */}
        <main style={{ flex: 1, overflow: "auto", padding: "28px", background: "#faf9f7" }}>
          <Outlet />
        </main>

      </div>
    </div>
  );
}