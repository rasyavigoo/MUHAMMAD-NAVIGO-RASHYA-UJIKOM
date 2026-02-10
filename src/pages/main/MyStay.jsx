import { useState, useEffect } from "react";
import { bookingService, authService } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarAlt,
  faCheckCircle,
  faSpinner,
  faClock,
  faTimesCircle,
  faArrowRight,
  faShieldHalved,
  faMapMarkerAlt,
  faCrown
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import roomFallback from "../../assets/generated/room-penthouse.png";

const MyStay = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await authService.getProfile();
        const userData = profileRes.data.data || profileRes.data;
        setUser(userData);

        const bookingRes = await bookingService.getAll();
        const allBookings = bookingRes.data.data || bookingRes.data;

        const myBookings = allBookings.filter(
          (b) => b.user_id === userData.id || (b.User && b.User.id === userData.id),
        );

        setBookings(myBookings);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <FontAwesomeIcon icon={faSpinner} spin size="4x" className="text-blue-600 mb-8" />
        <p className="font-bold text-[10px] uppercase tracking-wider text-slate-400">Menyiapkan Pengalaman Anda...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 md:pt-32 pb-24 px-4 sm:px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* HERO SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-12">
          <div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-slate-900 uppercase tracking-tight leading-[0.8]">
              Selamat Datang <br /> <span className="text-blue-600">{user?.nama?.split(' ')[0]}.</span>
            </h1>
            <p className="text-slate-400 font-medium text-base sm:text-lg mt-8 max-w-lg leading-relaxed">
              Ringkasan riwayat pemesanan dan jadwal kedatangan Anda di StayEase.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-slate-50 overflow-hidden mb-6 shadow-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-black italic">
              {user?.nama?.charAt(0) || "U"}
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Pemesanan</p>
            <p className="text-4xl font-bold text-slate-900">{bookings.length}</p>
          </div>
        </div>

        {/* BOOKINGS LIST */}
        <div className="space-y-12">
          {bookings.length === 0 ? (
            <div className="py-20 md:py-40 text-center border-[6px] border-dashed border-slate-50 rounded-4xl md:rounded-[5rem]">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-10 text-slate-200">
                <FontAwesomeIcon icon={faBed} size="2x" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 uppercase tracking-tight mb-4">
                Tidak Ada Pesanan Aktif
              </h3>
              <p className="text-slate-400 font-medium mb-12">
                Riwayat pemesanan Anda masih kosong. Cari kamar impian Anda sekarang.
              </p>
              <Link to="/rooms" className="btn-premium bg-slate-900 text-white inline-flex mx-auto">
                Lihat Kamar <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8">
              {bookings.map((item) => (
                <div key={item.id} className="group bg-slate-50 p-6 sm:p-8 md:p-10 rounded-4xl md:rounded-4xl border border-slate-100 transition-all duration-700 hover:bg-white hover:shadow-3xl hover:shadow-blue-500/5 flex flex-col lg:flex-row items-center gap-8 md:gap-12">
                  <div className="w-full lg:w-80 aspect-[4/3] rounded-4xl overflow-hidden shrink-0 relative">
                    <img
                      src={item.Room?.image_url || roomFallback}
                      alt="unit"
                      className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[9px] font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider shadow-lg">ID: #{item.id}</span>
                    </div>
                  </div>

                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start mb-10">
                      <div>
                        <h3 className="text-2xl md:text-4xl font-bold text-slate-900 uppercase tracking-tight leading-tight mb-3 group-hover:text-blue-600 transition-colors">
                          {item.room_name || item.Room?.type_name || "Pesanan StayEase"}
                        </h3>
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-600" />
                          Kamar Pilihan StayEase
                        </div>
                      </div>
                      <span className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl ${item.status === "approved" ? "bg-emerald-500 text-white shadow-emerald-500/20" :
                        item.status === "pending" ? "bg-amber-500 text-white shadow-amber-500/20" :
                          item.status === "checked_in" ? "bg-blue-600 text-white shadow-blue-500/20" :
                            item.status === "checked_out" ? "bg-slate-900 text-white shadow-slate-900/20" :
                              item.status === "rejected" ? "bg-rose-500 text-white shadow-rose-500/20" : "bg-slate-400 text-white"
                        }`}>
                        {item.status === "pending" ? "Menunggu" :
                          item.status === "approved" ? "Disetujui" :
                            item.status === "rejected" ? "Ditolak" :
                              item.status === "checked_in" ? "Check-In" :
                                item.status === "checked_out" ? "Selesai" : item.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-y border-slate-200/50">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Kedatangan</p>
                        <p className="text-lg font-bold text-slate-900 uppercase">{item.check_in_date ? new Date(item.check_in_date).toLocaleDateString("id-ID", { day: 'numeric', month: 'short' }) : "-"}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Kepulangan</p>
                        <p className="text-lg font-bold text-slate-900 uppercase">{item.check_out_date ? new Date(item.check_out_date).toLocaleDateString("id-ID", { day: 'numeric', month: 'short' }) : "-"}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Unit</p>
                        <p className="text-lg font-bold text-slate-900 uppercase">1 Kamar</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Status Bayar</p>
                        <p className="text-lg font-bold text-blue-600 uppercase">Lengkap</p>
                      </div>
                    </div>

                    <div className="pt-10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                          <FontAwesomeIcon icon={faCrown} />
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Layanan Eksklusif <br /> StayEase Tersedia</p>
                      </div>
                      <button className="text-slate-900 font-bold uppercase tracking-wider text-[10px] hover:text-blue-600 transition-colors flex items-center gap-3">
                        Detail transaksi <FontAwesomeIcon icon={faArrowRight} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* DECORATIVE FOOTER */}
        <div className="mt-32 pt-20 border-t border-slate-100 text-center">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Manajemen Penginapan StayEase • Sejak 2026</p>
        </div>
      </div>
    </div>
  );
};

export default MyStay;
