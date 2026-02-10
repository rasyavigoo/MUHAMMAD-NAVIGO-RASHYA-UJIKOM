import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGear, faRightFromBracket, faXmark, faBars, faShieldHalved, faCrown } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    setMenuActive(!menuActive);
  };

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const activeLink = ({ isActive }) =>
    `relative flex items-center h-full transition-all duration-300 font-bold uppercase text-[10px] tracking-widest ${isActive ? "text-blue-600" : (scrolled || !isHomePage ? "text-slate-400 hover:text-slate-900" : "text-white/70 hover:text-white")
    }`;

  const navItems = [
    { path: "/", label: "Jelajahi" },
    { path: "/about", label: "Tentang Kami" },
    { path: "/rooms", label: "Kamar" },
  ];

  return (
    <nav
      className={`fixed w-full z-[9999] transition-all duration-500 ${scrolled || !isHomePage
        ? "py-3 bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-sm"
        : "py-6 bg-transparent"
        }`}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <NavLink to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 bg-slate-950 rounded-[0.85rem] flex items-center justify-center text-white text-[10px] shadow-2xl transition-all duration-500 group-hover:bg-blue-600 group-hover:rotate-12 border border-white/10">
              <FontAwesomeIcon icon={faShieldHalved} />
            </div>
            <div className="hidden sm:flex flex-col">
              <h1 className={`text-lg font-bold tracking-tight uppercase leading-none transition-colors duration-500 ${scrolled || !isHomePage ? "text-slate-900" : "text-white"}`}>
                STAYEASE<span className="text-blue-600">.</span>
              </h1>
              <span className={`text-[7px] font-bold uppercase tracking-widest mt-1.5 opacity-60 transition-colors duration-500 ${scrolled || !isHomePage ? "text-slate-400" : "text-white/60"}`}>Layanan Premium</span>
            </div>
          </NavLink>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={activeLink}>
                {({ isActive }) => (
                  <div className="relative py-1 group">
                    {item.label}
                    <span className={`absolute left-0 -bottom-1 h-0.5 bg-blue-600 transition-all duration-500 rounded-full ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                  </div>
                )}
              </NavLink>
            ))}
            {token && (
              <NavLink to="/dashboard" className={activeLink}>
                {({ isActive }) => (
                  <div className="relative py-1 group">
                    Pesanan
                    <span className={`absolute left-0 -bottom-1 h-0.5 bg-blue-600 transition-all duration-500 rounded-full ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                  </div>
                )}
              </NavLink>
            )}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-3">


            {!token ? (
              <NavLink to="/login">
                <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-slate-950 transition-all shadow-xl shadow-blue-500/20 active:scale-95 text-[10px] font-bold uppercase tracking-widest border border-blue-400/20">
                  Masuk
                </button>
              </NavLink>
            ) : (
              <div className="hidden md:flex items-center gap-3 pl-3 border-l border-slate-200 h-8">
                <div className={`w-8 h-8 rounded-full overflow-hidden border shadow-sm p-0.5 transition-all duration-500 ${scrolled || !isHomePage ? "bg-slate-100 border-slate-200" : "bg-white/10 border-white/30 backdrop-blur-md"}`}>
                  <img src={`https://i.pravatar.cc/100?u=${user?.email}`} alt="user" className="w-full h-full rounded-full bg-slate-50 object-cover" />
                </div>
                <button
                  onClick={handleLogout}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${scrolled || !isHomePage ? "text-slate-400 hover:text-rose-600 hover:bg-rose-50" : "text-white/50 hover:text-white hover:bg-white/10"}`}
                >
                  <FontAwesomeIcon icon={faRightFromBracket} className="text-xs" />
                </button>
              </div>
            )}

            {/* MOBILE MENU TOGGLE */}
            <button
              className={`md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-base border transition-all active:scale-90 ${scrolled || !isHomePage ? "bg-slate-100 text-slate-900 border-slate-200 shadow-sm" : "bg-white/10 text-white border-white/20 backdrop-blur-md"}`}
              onClick={handleClick}
            >
              <FontAwesomeIcon icon={menuActive ? faXmark : faBars} />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 bg-white z-9998 transition-all duration-500 md:hidden flex flex-col pt-32 px-10 gap-8 ${menuActive ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
          }`}
      >
        <div className="flex flex-col gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-4">Navigasi Utama</p>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="text-4xl font-bold text-slate-900 hover:text-blue-600 transition-colors uppercase tracking-tighter"
              onClick={() => setMenuActive(false)}
            >
              {item.label}
            </NavLink>
          ))}
          {token && (
            <NavLink
              to="/dashboard"
              className="text-4xl font-bold text-slate-900 hover:text-blue-600 transition-colors uppercase tracking-tighter"
              onClick={() => setMenuActive(false)}
            >
              Pesanan
            </NavLink>
          )}
        </div>

        <div className="mt-auto pb-20 flex flex-col gap-4">
          {!token ? (
            <NavLink to="/login" className="w-full" onClick={() => setMenuActive(false)}>
              <button className="w-full bg-blue-600 text-white py-6 rounded-3xl font-bold uppercase tracking-widest shadow-xl shadow-blue-500/20">Masuk Sekarang</button>
            </NavLink>
          ) : (
            <>

              <button onClick={handleLogout} className="w-full bg-rose-50 text-rose-600 py-6 rounded-3xl font-bold uppercase tracking-widest border border-rose-100">Keluar Sistem</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
