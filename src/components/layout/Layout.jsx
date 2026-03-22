// Layout.jsx — Structure commune à toutes les pages
// Contient la Sidebar (gauche) + Header (haut) + contenu principal

import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMobileSidebarOpen(false);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const toggleSidebar = () => setMobileSidebarOpen((prev) => !prev);
  const closeSidebar = () => setMobileSidebarOpen(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Sidebar
        isMobile={isMobile}
        open={!isMobile || mobileSidebarOpen}
        onClose={closeSidebar}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Header isMobile={isMobile} onToggleSidebar={toggleSidebar} />

        <main
          style={{
            flex: 1,
            overflow: "auto",
            padding: isMobile ? "14px" : "28px",
            background: "#faf9f7",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}