import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThLarge,
  faBed,
  faUserTie,
  faCalendarCheck,
  faChevronLeft,
  faBars,
  faSignOutAlt,
  faUsers,
  faShieldHalved,
  faMicrochip,
  faGlobe,
  faCreditCard // Tambahkan icon credit card
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = user.role === "admin";

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-4 px-6 py-4 transition-all duration-500 relative group ${isActive
      ? "text-blue-500 bg-white/5 shadow-inner"
      : "text-slate-500 hover:text-white hover:bg-white/2"
    }`;

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-[100] bg-slate-950 transition-all duration-500 flex flex-col border-r border-white/5 
        ${isOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0 lg:w-24"}`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-6 h-20 bg-slate-950 shrink-0 border-b border-white/5">
        {isOpen ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs shadow-lg shadow-blue-500/20">
              <FontAwesomeIcon icon={faBed} />
            </div>
            <span className="text-white font-bold text-lg tracking-tight uppercase">
              Stay<span className="text-blue-600">Ease.</span>
            </span>
          </div>
        ) : (
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white text-sm mx-auto shadow-lg shadow-blue-500/20">
            <FontAwesomeIcon icon={faBed} />
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="mt-6 flex-1 space-y-1.5 px-2 overflow-y-auto custom-scrollbar">
        <NavLink to="/admin" end className={navLinkClass}>
          {({ isActive }) => (
            <>
              <div className={`w-6 flex justify-center text-lg transition-transform duration-500 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                <FontAwesomeIcon icon={faThLarge} />
              </div>
              {isOpen && <span className="font-bold uppercase tracking-wider text-[10px]">Dashboard</span>}
              {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-l-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>}
            </>
          )}
        </NavLink>

        <NavLink to="/admin/rooms" className={navLinkClass}>
          {({ isActive }) => (
            <>
              <div className={`w-6 flex justify-center text-lg transition-transform duration-500 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                <FontAwesomeIcon icon={faBed} />
              </div>
              {isOpen && <span className="font-bold uppercase tracking-wider text-[10px]">Daftar Kamar</span>}
              {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-l-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>}
            </>
          )}
        </NavLink>

        <NavLink to="/admin/bookings" className={navLinkClass}>
          {({ isActive }) => (
            <>
              <div className={`w-6 flex justify-center text-lg transition-transform duration-500 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                <FontAwesomeIcon icon={faCalendarCheck} />
              </div>
              {isOpen && <span className="font-bold uppercase tracking-wider text-[10px]">Reservasi</span>}
              {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-l-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>}
            </>
          )}
        </NavLink>

        {/* MENU PEMBAYARAN (BARU) */}
        <NavLink to="/admin/payments" className={navLinkClass}>
          {({ isActive }) => (
            <>
              <div className={`w-6 flex justify-center text-lg transition-transform duration-500 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                <FontAwesomeIcon icon={faCreditCard} />
              </div>
              {isOpen && <span className="font-bold uppercase tracking-wider text-[10px]">Pembayaran</span>}
              {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-l-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>}
            </>
          )}
        </NavLink>

        <NavLink to="/admin/staff" className={navLinkClass}>
          {({ isActive }) => (
            <>
              <div className={`w-6 flex justify-center text-lg transition-transform duration-500 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                <FontAwesomeIcon icon={faUserTie} />
              </div>
              {isOpen && <span className="font-bold uppercase tracking-wider text-[10px]">Daftar Staff</span>}
              {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-l-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>}
            </>
          )}
        </NavLink>

        {isAdmin && (
          <NavLink to="/admin/users" className={navLinkClass}>
            {({ isActive }) => (
              <>
                <div className={`w-6 flex justify-center text-lg transition-transform duration-500 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                  <FontAwesomeIcon icon={faUsers} />
                </div>
                {isOpen && <span className="font-bold uppercase tracking-wider text-[10px]">Daftar Pengguna</span>}
                {isActive && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-l-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>}
              </>
            )}
          </NavLink>
        )}
      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-white/5 bg-white/2 mt-auto">
        <div className="space-y-0.5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 w-full px-4 py-3 text-slate-500 hover:text-rose-500 hover:bg-rose-500/5 rounded-xl transition-all group cursor-pointer"
          >
            <div className="w-6 flex justify-center group-hover:-translate-x-1 transition-transform">
              <FontAwesomeIcon icon={faSignOutAlt} />
            </div>
            {isOpen && <span className="text-[10px] font-bold uppercase tracking-wider">Keluar</span>}
          </button>
        </div>
      </div>

      {/* Profile Toggle & Section */}
      <div className="px-4 mb-4">
        <div className="p-3 bg-slate-900 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-blue-500 text-xs shadow-md">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            {isOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="text-[10px] font-bold text-white uppercase truncate">{user.nama?.split(' ')[0] || "User"}</p>
                <p className="text-[8px] font-medium text-slate-500 uppercase tracking-widest truncate">{user.role}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={toggleSidebar}
        className={`absolute hover:cursor-pointer bottom-32 -right-4 w-8 h-8 rounded-full bg-blue-600 text-white items-center justify-center text-xs shadow-xl shadow-blue-500/30 border-4 border-slate-950 transition-all hidden lg:flex ${!isOpen && "rotate-180"}`}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
    </aside>
  );
};

export default Sidebar;