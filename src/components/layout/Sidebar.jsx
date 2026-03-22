// Sidebar.jsx — Menu de navigation latéral de Keylo
// Contient le logo, les liens de navigation et le profil utilisateur

import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,  // Tableau de bord
  Building2,        // Biens
  CreditCard,       // Paiements
  FileText,         // Documents
  Settings,         // Paramètres
  ChevronLeft,      // Bouton collapse
  ChevronRight,     // Bouton expand
  LogOut,           // Déconnexion
} from "lucide-react";

// Couleurs principales de Keylo
const ORANGE = "#f97316";
const ORANGE_LIGHT = "#fff7ed";

// Liste des éléments de navigation avec icônes Lucide
const NAV_ITEMS = [
  { label: "Tableau de bord", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Biens",           icon: Building2,       path: "/biens" },
  { label: "Paiements",       icon: CreditCard,      path: "/paiements" },
  { label: "Documents",       icon: FileText,        path: "/documents" },
  { label: "Paramètres",      icon: Settings,        path: "/parametres" },
];

export default function Sidebar({ isMobile = false, open = true, onClose = () => {} }) {
  const [collapsed, setCollapsed] = useState(false);
  const [logoutHover, setLogoutHover] = useState(false);

  const effectiveCollapsed = isMobile ? false : collapsed;

  const baseStyle = {
    width: effectiveCollapsed ? 68 : 260,
    minWidth: effectiveCollapsed ? 68 : 260,
    background: "white",
    borderRight: isMobile ? "none" : "1px solid #f0ece6",
    display: "flex",
    flexDirection: "column",
    transition:
      isMobile
        ? "transform 0.22s cubic-bezier(.4,0,.2,1)"
        : "width 0.22s cubic-bezier(.4,0,.2,1), min-width 0.22s",
    overflow: "hidden",
    zIndex: 20,
  };

  const mobileStyle = isMobile
    ? {
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        transform: open ? "translateX(0)" : "translateX(-100%)",
        boxShadow: open ? "2px 0 12px rgba(0,0,0,0.16)" : "none",
      }
    : {};

  return (
    <>
      {isMobile && open && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            zIndex: 15,
          }}
        />
      )}

      <aside style={{ ...baseStyle, ...mobileStyle }}>

      {/* ── Logo Keylo ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: effectiveCollapsed ? "center" : "space-between",
          padding: effectiveCollapsed ? "12px 0" : "12px 16px",
          borderBottom: "1px solid #f5f0ea",
        }}
      >
        {isMobile && (
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#6b7280",
              padding: 4,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              marginRight: 8,
            }}
          >
            ✕
          </button>
        )}
        <img
          src="/logo keylo.png"
          alt="Keylo logo"
          style={{
            width: collapsed ? 250 : 210,
            height: collapsed ? 60 : 90,
            objectFit: "contain",
            transition: "width 0.22s, height 0.22s",
          }}
        />

        {/* Bouton fermer sidebar (desktop seulement pour éviter bug mobile) */}
        {!isMobile && !collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#d1cdc8", padding: 4, borderRadius: 6,
              display: "flex", alignItems: "center",
            }}
          >
            <ChevronLeft size={18} />
          </button>
        )}
      </div>

      {/* Bouton ouvrir sidebar (desktop seulement) */}
      {!isMobile && collapsed && (
        <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 0" }}>
          <button
            onClick={() => setCollapsed(false)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#d1cdc8", padding: 4, borderRadius: 6,
              display: "flex", alignItems: "center",
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* ── Navigation ── */}
      <nav style={{ padding: "14px 10px", flex: 1 }}>
        {NAV_ITEMS.map(item => {
          // Récupère le composant icône dynamiquement
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                if (isMobile) onClose();
              }}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: effectiveCollapsed ? "11px 0" : "10px 12px",
                justifyContent: effectiveCollapsed ? "center" : "flex-start",
                borderRadius: 10,
                cursor: "pointer",
                marginBottom: 2,
                textDecoration: "none",
                background: isActive ? ORANGE_LIGHT : "transparent",
                color: isActive ? ORANGE : "#6b7280",
                fontWeight: isActive ? 600 : 400,
                fontSize: 14,
                transition: "background 0.15s, color 0.15s",
              })}
            >
              {/* Icône Lucide avec taille fixe */}
              <Icon size={18} strokeWidth={1.8} style={{ flexShrink: 0 }} />
              {!collapsed && (
                <span style={{ whiteSpace: "nowrap" }}>{item.label}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* ── Profil utilisateur ── */}
      {!collapsed && (
        <div style={{
          padding: "14px 16px",
          borderTop: "1px solid #f5f0ea",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          {/* Avatar initiales */}
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: `linear-gradient(135deg, #fdba74, ${ORANGE})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontWeight: 700, fontSize: 13, flexShrink: 0,
          }}>JD</div>

          {/* Nom + rôle + bouton déconnexion */}
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{
              fontSize: 13, fontWeight: 600, color: "#111827",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
            }}>Jean Dupont</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>Propriétaire</div>
          </div>

          {/* Bouton déconnexion */}
          <button
            onClick={() => {
              // TODO: Implémenter la logique de déconnexion
              console.log("Déconnexion");
            }}
            onMouseEnter={() => setLogoutHover(true)}
            onMouseLeave={() => setLogoutHover(false)}
            style={{
              background: logoutHover ? "#fee2e2" : "transparent",
              border: "none",
              cursor: "pointer",
              color: "#ef4444",
              padding: "6px",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "background 0.15s",
            }}
            title="Déconnexion"
          >
            <LogOut size={18} strokeWidth={1.8} />
          </button>
        </div>
      )}

      </aside>
    </>
  );
}