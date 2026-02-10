import { useState, useEffect } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faBell,
  faSignOutAlt,
  faShieldHalved,
  faSearch,
  faGlobe,
  faBars,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/admin/Sidebar";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-white font-sans overflow-x-hidden">
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-90 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />

      <div
        className={`flex-1 transition-all duration-500 min-h-screen flex flex-col w-full ${isOpen ? "lg:pl-64" : "lg:pl-24"} pl-0`}
      >
        <header className="h-16 lg:h-20 bg-white/80 backdrop-blur-xl border-b border-slate-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-slate-900 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
            </button>

          </div>

          <div className="flex items-center gap-10">

            <div className="flex items-center gap-6">
      
              <div className="flex items-center gap-4 group cursor-pointer relative">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-900 uppercase leading-none mb-1">
                    {user?.nama?.split(' ')[0] || "Admin"}
                  </p>
                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest text-right">ID: {user?.id || "0"}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border-2 border-white shadow-xl overflow-hidden ring-2 ring-slate-100">
                  <img src={`https://i.pravatar.cc/100?u=${user?.email}`} alt="admin" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 flex-1 animate-fadeIn overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
