import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { roomService } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRight,
    faStar,
    faShieldHalved,
    faCrown,
    faPlay,
    faQuoteLeft,
    faMicrochip,
    faFingerprint,
    faCompass,
    faGem,
    faBolt
} from "@fortawesome/free-solid-svg-icons";

// Assets
import heroImg from "../../assets/generated/hero.png";
import aboutImg from "../../assets/generated/about.png";
import roomPenthouse from "../../assets/generated/room-penthouse.png";

const Landing = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await roomService.getAll();
                const data = Array.isArray(response.data) ? response.data : response.data.data || [];
                setRooms(data.slice(0, 3));
            } catch (err) {
                console.error("Error fetching rooms for landing:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    return (
        <div className="bg-white selection:bg-blue-600 selection:text-white font-sans overflow-x-hidden">

            {/* --- HERO SECTION --- */}
            <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
                {/* Background Image with Parallax-like effect */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImg}
                        className="w-full h-full object-cover scale-105"
                        alt="Luxury Suite"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center pt-40 pb-20">

                    <h1 className="text-4xl md:text-7xl lg:text-[7.5rem] font-bold text-white leading-none tracking-tighter mb-10">
                        ESSENCE OF <br />
                        <span className="text-indigo-400">LUXURY.</span>
                    </h1>

                    <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                        Rasakan perpaduan sempurna antara desain kontemporer dan kenyamanan tiada tara. Rumah kedua Anda menanti di StayEase.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link to="/rooms" className="group relative px-12 py-5 bg-indigo-600 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-500/20">
                            <span className="relative z-10 flex items-center gap-3">
                                Jelajahi Kamar <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>

                    </div>
                </div>


            </section>

            {/* --- PHILOSOPHY SECTION (FORMER MANIFESTO) --- */}
            <section className="py-32 relative">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="relative">
                            <div className="relative aspect-square rounded-4xl overflow-hidden shadow-3xl">
                                <img src={aboutImg} className="w-full h-full object-cover" alt="Architecture" />
                            </div>
                            <div className="absolute -bottom-10 -right-10 bg-slate-900 border border-white/10 p-10 rounded-4xl text-white hidden md:block shadow-3xl">
                                <h4 className="text-5xl font-bold tracking-tighter mb-2 text-indigo-400">12+</h4>
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Tahun Pengalaman</p>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-4 mb-8 text-indigo-600 uppercase font-bold text-[10px] tracking-[0.3em]">
                                <span className="w-10 h-px bg-indigo-600"></span> Filosofi Kami
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tighter mb-10">
                                ARSITEKTUR YANG <br /> <span className="text-indigo-600">BERBICARA.</span>
                            </h2>
                            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10 italic border-l-4 border-indigo-600 pl-8">
                                "Setiap detail dikurasi untuk menciptakan harmoni antara fungsi dan estetika, memberikan Anda pengalaman menginap yang tak terlupakan."
                            </p>
                            <p className="text-slate-500 mb-10 leading-relaxed font-medium">
                                Kami percaya bahwa hunian bukan hanya tempat berteduh, melainkan cerminan gaya hidup dan aspirasi Anda. StayEase hadir untuk mewujudkan standar baru dalam industri hospitality.
                            </p>
                            <button className="text-slate-900 font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 hover:text-indigo-600 transition-colors group">
                                Pelajari Lebih Lanjut <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FEATURED COLLECTIONS --- */}
            <section className="py-32 bg-slate-50 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-400 rounded-full blur-[200px] opacity-5 -translate-y-1/2 translate-x-1/2"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tighter uppercase mb-6">
                            Koleksi <span className="text-indigo-600">Eksklusif.</span>
                        </h2>
                        <p className="text-slate-500 font-medium text-lg">
                            Daftar pilihan kamar yang telah dikurasi secara khusus oleh tim desainer interior kami.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {rooms.map((room) => (
                            <div key={room.id} className="group bg-white rounded-[2.5rem] p-5 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-700 hover:-translate-y-4">
                                <div className="relative aspect-[4/5] rounded-4xl overflow-hidden mb-8">
                                    <img
                                        src={room.image_url || roomPenthouse}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        alt={room.type_name}
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 to-transparent opacity-60"></div>
                                    <div className="absolute top-6 left-6 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white text-[9px] font-bold uppercase tracking-widest">
                                        {room.bed_type} Bed
                                    </div>
                                    <Link to={`/booking/${room.id}`} className="absolute bottom-6 right-6 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -rotate-45 hover:rotate-0 shadow-lg shadow-indigo-500/40">
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </Link>
                                </div>
                                <div className="px-2 pb-2">
                                    <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-tight mb-3 group-hover:text-indigo-600 transition-colors">{room.type_name}</h3>
                                    <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                                        <div>
                                            <p className="text-slate-400 text-[8px] font-bold uppercase tracking-widest mb-1">Harga Mulai</p>
                                            <p className="text-indigo-600 font-bold text-xl tracking-tight">Rp {room.price_per_night?.toLocaleString()}</p>
                                        </div>
                                        <Link to={`/booking/${room.id}`} className="w-10 h-10 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                                            <FontAwesomeIcon icon={faArrowRight} className="-rotate-45" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <Link to="/rooms" className="group inline-flex items-center gap-4 px-12 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all duration-500 shadow-xl shadow-slate-200/50 active:scale-95">
                            Lihat Semua Kamar <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- BENTO SERVICES --- */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8 bg-slate-950 rounded-4xl p-12 text-white relative overflow-hidden group min-h-[400px]">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[150px] opacity-10 group-hover:opacity-30 transition-opacity"></div>
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="flex items-center gap-4 text-indigo-400">
                                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-xl backdrop-blur-md">
                                        <FontAwesomeIcon icon={faShieldHalved} />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Prioritas Keamanan</span>
                                </div>
                                <div>
                                    <h3 className="text-white text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-6 leading-none">
                                        PRIVASI <br /> TANPA BATAS.
                                    </h3>
                                    <p className="text-white/40 max-w-md font-medium leading-relaxed">
                                        Sistem enkripsi pintu digital dan pengamanan 24/7 memastikan waktu istirahat Anda tidak akan pernah terganggu.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-4 grid gap-8">
                            <div className="bg-indigo-600 rounded-4xl p-10 text-white hover:shadow-2xl hover:shadow-indigo-600/30 transition-all duration-500 shadow-xl shadow-indigo-600/10">
                                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-xl mb-8">
                                    <FontAwesomeIcon icon={faBolt} />
                                </div>
                                <h3 className="text-white text-2xl font-bold uppercase tracking-tight mb-4 leading-tight">Teknologi <br />Pintar.</h3>
                                <p className="text-white/60 text-sm font-medium leading-relaxed">Ekosistem IoT yang terintegrasi penuh untuk mengontrol hunian dalam satu genggaman.</p>
                            </div>
                            <div className="bg-slate-50 rounded-4xl p-10 border border-slate-100 hover:border-indigo-600 hover:bg-white transition-all duration-500 group shadow-sm">
                                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-xl mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    <FontAwesomeIcon icon={faGem} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-tight mb-4 leading-tight group-hover:text-indigo-600 transition-colors">Akses <br />VVIP.</h3>
                                <p className="text-slate-400 text-sm font-medium leading-relaxed">Layanan concierge pribadi siap melayani segala kebutuhan gaya hidup Anda setiap saat.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CALL TO ACTION --- */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-6">
                    <div className="bg-slate-950 rounded-4xl p-16 md:p-32 text-center relative overflow-hidden shadow-3xl border border-white/5">
                        <div className="absolute inset-0 bg-linear-to-tr from-indigo-600/20 via-transparent to-indigo-600/20 opacity-50"></div>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-full bg-indigo-600 rounded-full blur-[200px] opacity-10"></div>
                        <div className="relative z-10 max-w-4xl mx-auto">
                            <h2 className="text-4xl md:text-7xl font-bold text-white mb-10 leading-[0.9] tracking-tighter uppercase">
                                JADILAH BAGIAN DARI <br />
                                <span className="text-indigo-500 italic">MASA DEPAN.</span>
                            </h2>
                            <p className="text-white/50 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto">
                                Bergabunglah bersama ribuan penghuni yang telah menemukan standar hidup baru di StayEase. Pendaftaran eksklusif dibuka sekarang.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Link to="/rooms" className="px-14 py-6 bg-indigo-600 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-slate-900 transition-all duration-500 shadow-2xl shadow-indigo-500/20 active:scale-95">
                                    Mulai Sekarang
                                </Link>
                                <Link to="/about" className="px-14 py-6 bg-white/5 border border-white/10 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all active:scale-95">
                                    Konsultasi Gratis
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;