import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faLock,
    faUser,
    faArrowRight,
    faSpinner,
    faShieldHalved,
    faChevronLeft
} from "@fortawesome/free-solid-svg-icons";
import { authService } from "../../services/api";

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nama: "",
        email: "",
        password: "",
        role: "user",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            await authService.register(formData);
            navigate("/login", { state: { message: "Pendaftaran berhasil. Silakan masuk dengan akun Anda." } });
        } catch (err) {
            console.error("Registration failed:", err);
            setError(
                err.response?.data?.message ||
                "Application failed. Please check your details and try again.",
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl shadow-slate-300/50 overflow-hidden flex flex-col md:flex-row-reverse">
                {/* BRANDING SECTION */}
                <div className="md:w-[42%] bg-gradient-to-br from-blue-600 via-blue-700 to-blue-600 p-8 md:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden min-h-[300px] md:min-h-[600px]">
                    {/* Abstract Background Decor */}
                    <div className="absolute top-[-15%] left-[-15%] w-[350px] h-[350px] bg-slate-950 rounded-full blur-[100px] opacity-20"></div>
                    <div className="absolute bottom-[-8%] right-[-8%] w-[200px] h-[200px] bg-white rounded-full blur-[80px] opacity-15"></div>
                    <div className="absolute top-[40%] right-[10%] w-[150px] h-[150px] bg-slate-900 rounded-full blur-[90px] opacity-10"></div>

                    <div className="relative z-10 flex justify-end">
                        <Link to="/" className="inline-flex items-center gap-3 group transition-all">
                            <span className="text-white font-black text-xl tracking-tight uppercase">StayEase<span className="text-slate-900">.</span></span>
                            <div className="w-11 h-11 rounded-xl bg-slate-950 flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                                <FontAwesomeIcon icon={faShieldHalved} className="text-base" />
                            </div>
                        </Link>
                    </div>

                    <div className="relative z-10 text-right my-8 md:my-0">
                        <div className="mb-6 flex justify-end">
                            <div className="inline-block px-4 py-1.5 bg-white/20 border border-white/30 rounded-full mb-6">
                                <span className="text-white text-xs font-bold uppercase tracking-wider">Pendaftaran Akun</span>
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[0.9] tracking-tight mb-5">
                            Bergabung<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-950">Bersama Kami</span>
                        </h1>
                        <p className="text-blue-100 text-sm md:text-base max-w-sm leading-relaxed ml-auto">
                            Daftar sekarang dan nikmati kemudahan mengelola hunian Anda dengan sistem StayEase.
                        </p>
                    </div>

                    <div className="relative z-10 flex justify-end">
                        <div className="flex items-center gap-8 text-blue-200">
                            <div className="text-[9px] font-semibold uppercase tracking-wider">© 2026 StayEase</div>
                            <div className="h-1 w-1 rounded-full bg-blue-300"></div>
                            <div className="text-[9px] font-semibold uppercase tracking-wider">Secure Registration</div>
                        </div>
                    </div>
                </div>

                {/* FORM SECTION */}
                <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-white to-slate-50/50">
                    <div className="w-full max-w-md mx-auto">
                        <div className="mb-8">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
                                Daftar Akun
                            </h2>
                            <p className="text-slate-500 font-medium text-sm">Buat akun baru untuk memulai</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-gradient-to-r from-rose-600 to-rose-700 rounded-2xl text-white font-semibold text-sm flex items-center gap-3 shadow-lg shadow-rose-500/25 animate-fadeIn">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-black shrink-0">!</div>
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide ml-1 block">Nama Lengkap</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <div className="w-9 h-9 rounded-xl bg-slate-100 group-focus-within:bg-blue-50 flex items-center justify-center transition-colors">
                                            <FontAwesomeIcon icon={faUser} className="text-sm text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        name="nama"
                                        required
                                        placeholder="Nama lengkap Anda"
                                        value={formData.nama}
                                        onChange={handleChange}
                                        className="w-full pl-16 pr-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-slate-900 font-semibold text-sm placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                                    />
                                </div>
                            </div>

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
                                        placeholder="Buat kata sandi yang kuat"
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
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 py-3.5 rounded-xl text-white font-bold text-sm uppercase tracking-wide shadow-lg shadow-blue-600/30 hover:shadow-blue-700/40 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                                >
                                    {isLoading ? (
                                        <FontAwesomeIcon icon={faSpinner} spin className="text-lg" />
                                    ) : (
                                        <>
                                            <span>Daftar Sekarang</span>
                                            <FontAwesomeIcon icon={faArrowRight} className="text-sm group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 pt-6 border-t border-slate-200">
                            <p className="text-sm text-center text-slate-600">
                                Sudah punya akun?{" "}
                                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-bold transition-colors underline decoration-2 underline-offset-2">
                                    Masuk di Sini
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
