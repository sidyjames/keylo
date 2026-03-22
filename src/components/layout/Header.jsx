// Header.jsx — Barre supérieure de Keylo
// Affiche le titre de la page active et les actions globales

import { Bell, Menu } from "lucide-react"; // icônes
import { useLocation } from "react-router-dom";

const ORANGE = "#f97316";

// Correspondance entre les URLs et les titres/descriptions
const PAGE_INFO = {
  "/dashboard":  { title: "Tableau de bord", desc: "Vue d'ensemble de votre activité locative" },
  "/biens":      { title: "Mes biens",        desc: "Gérez vos propriétés et locataires" },
  "/paiements":  { title: "Paiements",        desc: "Suivi des loyers et relances" },
  "/documents":  { title: "Documents",        desc: "Baux, quittances et états des lieux" },
  "/parametres": { title: "Paramètres",       desc: "Gérez votre compte et abonnement" },
};

export default function Header({ isMobile = false, onToggleSidebar = () => {} }) {
  const location = useLocation();
  const page = PAGE_INFO[location.pathname] || { title: "Keylo", desc: "" };

  return (
    <header
      style={{
        background: "white",
        borderBottom: "1px solid #f0ece6",
        padding: isMobile ? "0 12px" : "0 28px",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        zIndex: 5,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {isMobile && (
          <button
            onClick={onToggleSidebar}
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              border: "1px solid #f0ece6",
              background: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 8,
            }}
            aria-label="Ouvrir le menu"
          >
            <Menu size={20} color={ORANGE} />
          </button>
        )}

        <div>
          <h1 style={{
            fontSize: isMobile ? 18 : 20,
            fontWeight: 800,
            color: "#111827",
            margin: 0,
            letterSpacing: "-0.4px"
          }}>{page.title}</h1>
          <p style={{ fontSize: 12, color: "#9ca3af", margin: 0, marginTop: 1 }}>
            {page.desc}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>

        {/* Cloche de notifications */}
        <div style={{ position: "relative", cursor: "pointer" }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: "#faf9f7", border: "1px solid #f0ece6",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Bell size={20} color={ORANGE} strokeWidth={1.8} />
          </div>

          <div style={{
            position: "absolute", top: -4, right: -4,
            width: 18, height: 18, borderRadius: "50%",
            background: ORANGE, color: "white",
            fontSize: 10, fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "2px solid white",
          }}>3</div>
        </div>

        <button style={{
          background: ORANGE, color: "white", border: "none",
          padding: isMobile ? "8px 12px" : "10px 20px", borderRadius: 10, cursor: "pointer",
          fontSize: 14, fontWeight: 600,
          display: "flex", alignItems: "center", gap: 6,
          boxShadow: "0 2px 8px rgba(249,115,22,0.30)",
          transition: "background 0.15s",
        }}>
          <span style={{ fontSize: 17 }}>+</span>
          Ajouter un bien
        </button>

      </div>
    </header>
  );
}
