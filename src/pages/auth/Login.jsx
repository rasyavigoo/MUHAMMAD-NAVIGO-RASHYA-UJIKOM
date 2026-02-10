import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faArrowRight,
  faSpinner,
  faCheckCircle,
  faShieldHalved,
  faChevronLeft
} from "@fortawesome/free-solid-svg-icons";
import { authService } from "../../services/api";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMsg(location.state.message);
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await authService.login(formData);
      const token = response.data.token || response.data.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        const profileRes = await authService.getProfile();
        const user = profileRes.data.data || profileRes.data;
        localStorage.setItem("user", JSON.stringify(user));

        if (user.role === "admin" || user.role === "staff") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError("Token tidak diterima dari server.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(
        err.response?.data?.message ||
        "Email atau kata sandi salah. Silakan periksa kembali.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl shadow-slate-300/50 overflow-hidden flex flex-col md:flex-row">
        {/* BRANDING SECTION */}
        <div className="md:w-[42%] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 md:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden min-h-[300px] md:min-h-[600px]">
          {/* Abstract Background Decor */}
          <div className="absolute top-[-15%] right-[-15%] w-[350px] h-[350px] bg-blue-600 rounded-full blur-[100px] opacity-20"></div>
          <div className="absolute bottom-[-8%] left-[-8%] w-[200px] h-[200px] bg-indigo-500 rounded-full blur-[80px] opacity-15"></div>
          <div className="absolute top-[40%] left-[10%] w-[150px] h-[150px] bg-blue-500 rounded-full blur-[90px] opacity-10"></div>

          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-3 group transition-all">
              <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <FontAwesomeIcon icon={faShieldHalved} className="text-base" />
              </div>
              <span className="text-white font-black text-xl tracking-tight uppercase">StayEase<span className="text-blue-400">.</span></span>
            </Link>
          </div>

          <div className="relative z-10 my-8 md:my-0">
            <div className="mb-6">
              <div className="inline-block px-4 py-1.5 bg-blue-600/20 border border-blue-500/30 rounded-full mb-6">
                <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">Portal Manajemen</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[0.9] tracking-tight mb-5">
              Selamat<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Datang Kembali</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-sm leading-relaxed">
              Masuk ke akun Anda untuk mengakses dashboard dan kelola sistem StayEase dengan mudah.
            </p>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-8 text-slate-500">
              <div className="text-[9px] font-semibold uppercase tracking-wider">© 2026 StayEase</div>
              <div className="h-1 w-1 rounded-full bg-slate-700"></div>
              <div className="text-[9px] font-semibold uppercase tracking-wider">Secure Access</div>
            </div>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-white to-slate-50/50">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
                Masuk Sistem
              </h2>
              <p className="text-slate-500 font-medium text-sm">Silakan masukkan kredensial Anda</p>
            </div>

            {successMsg && (
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white font-semibold text-sm flex items-center gap-3 shadow-lg shadow-blue-500/25 animate-fadeIn">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-base" />
                </div>
                <span>{successMsg}</span>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-gradient-to-r from-rose-600 to-rose-700 rounded-2xl text-white font-semibold text-sm flex items-center gap-3 shadow-lg shadow-rose-500/25 animate-fadeIn">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-black shrink-0">!</div>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide ml-1 block">Alamat Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 group-focus-within:bg-blue-50 flex items-center justify-center transition-colors">
                      <FontAwesomeIcon icon={faEnvelope} className="text-sm text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    </div>
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="nama@stayease.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-16 pr-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-slate-900 font-semibold text-sm placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide ml-1 block">Kata Sandi</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 group-focus-within:bg-blue-50 flex items-center justify-center transition-colors">
                      <FontAwesomeIcon icon={faLock} className="text-sm text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    </div>
                  </div>
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="Masukkan kata sandi"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-16 pr-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-slate-900 font-semibold text-sm placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-slate-900 to-slate-950 hover:from-blue-600 hover:to-blue-700 py-3.5 rounded-xl text-white font-bold text-sm uppercase tracking-wide shadow-lg shadow-slate-900/20 hover:shadow-blue-600/30 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                >
                  {isLoading ? (
                    <FontAwesomeIcon icon={faSpinner} spin className="text-lg" />
                  ) : (
                    <>
                      <span>Masuk ke Dashboard</span>
                      <FontAwesomeIcon icon={faArrowRight} className="text-sm group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <p className="text-sm text-center text-slate-600">
                Belum punya akun?{" "}
                <Link to="/register" className="text-blue-600 hover:text-blue-700 font-bold transition-colors underline decoration-2 underline-offset-2">
                  Daftar Sekarang
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
