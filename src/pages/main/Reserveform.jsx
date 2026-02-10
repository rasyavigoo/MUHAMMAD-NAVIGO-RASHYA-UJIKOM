import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { roomService } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faCheckCircle,
  faSpinner,
  faArrowLeft,
  faBed,
  faUsers,
  faShieldHalved,
  faInfoCircle,
  faChevronRight,
  faClock,
  faCrown
} from "@fortawesome/free-solid-svg-icons";
import roomFallback from "../../assets/generated/room-penthouse.png";

const Reserve = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    check_in_date: "",
    check_out_date: "",
    room_count: 1,
    notes: "",
  });

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Silakan masuk terlebih dahulu untuk melakukan pemesanan.");
      navigate("/login");
      return;
    }

    const fetchRoom = async () => {
      try {
        const response = await roomService.getById(id);
        const data = response.data.data || response.data;
        setRoom(data);
      } catch (err) {
        console.error("Error fetching room:", err);
        alert("Kamar tidak ditemukan dalam sistem.");
        navigate("/rooms");
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id, navigate]);

  // MENGHITUNG TOTAL HARGA OTOMATIS
  useEffect(() => {
    if (room && formData.check_in_date && formData.check_out_date) {
      const start = new Date(formData.check_in_date);
      const end = new Date(formData.check_out_date);
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        setTotalPrice(diffDays * room.price_per_night * formData.room_count);
      } else {
        setTotalPrice(0);
      }
    }
  }, [formData, room]);

  // LOGIKA KIRIM DATA KE HALAMAN PEMBAYARAN
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (totalPrice <= 0) {
      alert("Mohon pilih tanggal check-in dan check-out yang valid.");
      return;
    }

    setSubmitting(true);

    // Ambil nama user dari localStorage (asumsi disimpan saat login)
    const userName = localStorage.getItem("user_name") || "Tamu StayEase";

    // Bungkus data untuk dikirim ke UserPayment.jsx
    const dataPemesanan = {
      room_id: id,
      room_count: parseInt(formData.room_count),
      check_in_date: formData.check_in_date,
      check_out_date: formData.check_out_date,
      notes: formData.notes,
      total_bayar: totalPrice,
      nama_penyewa: userName
    };

    // Pindah ke halaman pembayaran dengan membawa data
    navigate("/pay", { state: { dataPemesanan } });
    setSubmitting(false);
  };

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <FontAwesomeIcon icon={faSpinner} spin size="4x" className="text-blue-600 mb-6" />
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans">Memeriksa Ketersediaan Kamar...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-24 pb-24 px-4 sm:px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16">

          {/* LEFT: FORM SECTION */}
          <div className="flex-1 animate-fadeIn">
            <div className="mb-12">
              <button
                onClick={() => navigate(-1)}
                className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-blue-600 transition-colors mb-6"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Galeri
              </button>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 uppercase tracking-tight leading-none mb-6">
                Pesan <br /> <span className="text-blue-600">Kamar.</span>
              </h1>
              <p className="text-slate-400 font-medium text-sm max-w-md leading-relaxed">
                Silakan lengkapi formulir. Anda akan diarahkan ke halaman pembayaran setelah klik tombol di bawah.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-900 uppercase tracking-wider ml-2 flex items-center gap-2">
                    <FontAwesomeIcon icon={faClock} className="text-blue-600" /> Tanggal Check-In
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 sm:p-5 font-bold uppercase text-xs tracking-wider text-slate-900 focus:bg-white focus:border-blue-600 transition-all outline-none"
                    value={formData.check_in_date}
                    onChange={(e) => setFormData({ ...formData, check_in_date: e.target.value })}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-900 uppercase tracking-wider ml-2 flex items-center gap-2">
                    <FontAwesomeIcon icon={faClock} className="text-blue-600" /> Tanggal Check-Out
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 sm:p-5 font-bold uppercase text-xs tracking-wider text-slate-900 focus:bg-white focus:border-blue-600 transition-all outline-none"
                    value={formData.check_out_date}
                    onChange={(e) => setFormData({ ...formData, check_out_date: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-900 uppercase tracking-wider ml-2">Jumlah Unit</label>
                  <input
                    type="number"
                    min="1"
                    max={10}
                    required
                    className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 sm:p-5 font-bold text-slate-900 focus:bg-white focus:border-blue-600 transition-all outline-none"
                    value={formData.room_count}
                    onChange={(e) => setFormData({ ...formData, room_count: e.target.value })}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-900 uppercase tracking-wider ml-2">Catatan Tambahan</label>
                  <input
                    type="text"
                    placeholder="Contoh: Permintaan khusus, dll..."
                    className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-4 sm:p-5 font-bold text-slate-900 focus:bg-white focus:border-blue-600 transition-all outline-none"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>
              </div>

              <div className="pt-10">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-slate-950 text-white w-full py-8 text-sm tracking-wider uppercase shadow-3xl shadow-slate-200 group relative overflow-hidden rounded-2xl"
                >
                  <span className="relative z-10 flex items-center justify-center gap-4">
                    {submitting ? <FontAwesomeIcon icon={faSpinner} spin /> : (
                      <>
                        Lanjut ke Pembayaran <FontAwesomeIcon icon={faChevronRight} className="group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: UNIT PREVIEW SECTION */}
          <div className="w-full lg:w-[420px] animate-slideInRight">
            <div className="sticky top-40 bg-slate-950 rounded-[3rem] text-white p-6 sm:p-10 overflow-hidden shadow-3xl shadow-slate-200">
              <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                    <FontAwesomeIcon icon={faCrown} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Ringkasan Pemesanan</span>
                </div>

                {room && (
                  <div className="space-y-10">
                    <div className="aspect-video w-full rounded-4xl overflow-hidden">
                      <img src={room.image_url || roomFallback} alt="unit" className="w-full h-full object-cover" />
                    </div>

                    <div>
                      <h3 className="text-3xl text-slate-300 font-bold uppercase tracking-tight mb-2">{room.type_name}</h3>
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Tipe Kamar: {room.bed_type}</p>
                    </div>

                    <div className="space-y-6 pt-10 border-t border-white/5">
                      <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-400">
                        <span>Harga / Malam</span>
                        <span>Rp {room.price_per_night?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-400">
                        <span>Durasi Inap</span>
                        <span>
                          {totalPrice > 0 ? (totalPrice / (room.price_per_night * formData.room_count)) : 0} Malam
                        </span>
                      </div>
                      <div className="h-px bg-white/5 mx-2"></div>
                      <div className="flex justify-between items-end">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Total Pembayaran</div>
                        <div className="text-4xl font-bold text-blue-600 tracking-tight">Rp {totalPrice.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="p-6 bg-white/5 rounded-4xl border border-white/10 flex items-start gap-4">
                      <FontAwesomeIcon icon={faShieldHalved} className="text-blue-500 mt-1" />
                      <div className="text-[9px] font-medium leading-relaxed text-slate-400">
                        Keamanan & Privasi Terjamin. Pembayaran menggunakan QRIS otomatis akan diverifikasi oleh Admin.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reserve;