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

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside style={{
      width: collapsed ? 68 : 260,
      minWidth: collapsed ? 68 : 260,
      background: "white",
      borderRight: "1px solid #f0ece6",
      display: "flex",
      flexDirection: "column",
      transition: "width 0.22s cubic-bezier(.4,0,.2,1), min-width 0.22s",
      overflow: "hidden",
      zIndex: 10,
    }}>

      {/* ── Logo Keylo ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed ? "center" : "space-between",
        padding: collapsed ? "12px 0" : "12px 16px",
        borderBottom: "1px solid #f5f0ea",
      }}>
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

        {/* Bouton fermer sidebar */}
        {!collapsed && (
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

      {/* Bouton ouvrir sidebar */}
      {collapsed && (
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
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: collapsed ? "11px 0" : "10px 12px",
                justifyContent: collapsed ? "center" : "flex-start",
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

          {/* Nom + rôle */}
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontSize: 13, fontWeight: 600, color: "#111827",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
            }}>Jean Dupont</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>Propriétaire</div>
          </div>
        </div>
      )}

    </aside>
  );
}