import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { isAuthenticated, logout } from "../services/authService";
import {
  HiMenu,
  HiX,
  HiHome,
  HiCollection,
  HiFolder,
  HiUserGroup,
  HiChat,
  HiSparkles,
  HiOfficeBuilding,
} from "react-icons/hi";

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (!isAuthenticated()) {
    return null;
  }

  const menuItems = [
    { path: "/admin", label: "Homepage", icon: HiHome },
    { path: "/admin/about-us", label: "About Us", icon: HiOfficeBuilding },
    { path: "/admin/services", label: "Services", icon: HiCollection },
    { path: "/admin/projects", label: "Projects", icon: HiFolder },
    { path: "/admin/clients", label: "Clients", icon: HiUserGroup },
    { path: "/admin/client-reviews", label: "Client Reviews", icon: HiChat },
    { path: "/admin/core-values", label: "Core Values", icon: HiSparkles },
  ];

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Glass Effect Overlay */}
      <div className="fixed inset-0 backdrop-blur-sm bg-black/40 -z-10"></div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 backdrop-blur-xl bg-white/5 border-r border-white/10 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo and Close Button */}
          <div className="flex items-center justify-between lg:justify-center p-6 border-b border-white/10">
            <img
              src="https://res.cloudinary.com/dybv1h20q/image/upload/v1771049149/Ratsch_Productions_Logo_Png-White_ynyzqp.png"
              alt="Ratsch Productions"
              className="w-32 h-auto"
            />
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white p-2 hover:text-[#E30514] transition-colors"
            >
              <HiX className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    active
                      ? "bg-[#E30514]/20 border border-[#E30514]/50 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white border border-transparent"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-white/20 hover:border-[#E30514] text-white hover:bg-[#E30514]/10 transition-all duration-300"
            >
              <span className="text-sm font-medium uppercase">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/5 border-b border-white/10">
          <div className="flex items-center gap-4 px-4 md:px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-white p-2 hover:text-[#E30514] transition-colors flex-shrink-0 relative z-10"
              aria-label="Open menu"
              type="button"
            >
              <HiMenu className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-white text-xl md:text-2xl font-bold uppercase">
                Admin Panel
              </h1>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
