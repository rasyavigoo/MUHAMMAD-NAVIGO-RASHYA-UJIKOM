import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { bookingService } from "../../services/api"; // Memakai service yang sudah ada
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCheckCircle, faPrint, faHome } from "@fortawesome/free-solid-svg-icons";

const UserPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sudahBayar, setSudahBayar] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const dataPemesanan = location.state?.dataPemesanan;

  const handleSelesai = async () => {
    if (!dataPemesanan) {
      alert("Data pemesanan tidak ditemukan.");
      return navigate("/rooms");
    }

    setLoading(true);
    try {
      // Menggunakan bookingService agar URL otomatis benar (mengikuti base URL api.js kamu)
      await bookingService.create({
        room_id: dataPemesanan.room_id,
        room_count: dataPemesanan.room_count || 1,
        check_in_date: dataPemesanan.check_in_date,
        check_out_date: dataPemesanan.check_out_date,
        notes: dataPemesanan.notes || "Paid via QRIS",
        status: "pending" 
      });

      setSudahBayar(true);
      alert("Reservasi berhasil dikirim! Admin akan segera memverifikasi pembayaran Anda.");
    } catch (err) {
      console.error("Payment Error:", err);
      // Detail error lebih jelas di alert
      const errorMsg = err.response?.data?.message || "Server tidak merespon. Pastikan Backend sudah dijalankan.";
      alert("Gagal: " + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-8 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 text-center animate-fadeIn">
      <h2 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">Pembayaran</h2>
      <p className="text-slate-400 mb-8 text-xs font-bold uppercase tracking-widest">Scan QRIS Untuk Reservasi</p>

      <div className="bg-slate-50 rounded-3xl p-6 mb-8 text-left border border-slate-100 shadow-inner">
        <div className="flex justify-between mb-3">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Penyewa</span>
          <span className="font-bold text-slate-700 text-sm">{dataPemesanan?.nama_penyewa || "Tamu StayEase"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Total Harga</span>
          <span className="font-black text-blue-600 text-xl">
            Rp {Number(dataPemesanan?.total_bayar || 0).toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      {/* QRIS Section */}
      <div className="mb-8 p-6 border-2 border-dashed border-slate-200 rounded-[2rem] inline-block bg-white relative">
        <img 
          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=STAYEASE-PAY-${dataPemesanan?.room_id}`} 
          alt="QRIS" 
          className="mx-auto mb-4 rounded-xl shadow-sm"
        />
        <div className="flex items-center justify-center gap-2 bg-slate-900 text-white py-2 px-4 rounded-full mx-auto w-fit">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></div>
          <p className="text-[9px] font-black uppercase tracking-[0.2em]">QRIS Dynamic Active</p>
        </div>
      </div>

      {!sudahBayar ? (
        <button 
          onClick={handleSelesai}
          disabled={loading}
          className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all active:scale-95 disabled:opacity-50 uppercase text-xs tracking-widest"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faSpinner} spin /> Mengirim Data...
            </span>
          ) : "Konfirmasi Pembayaran"}
        </button>
      ) : (
        <div className="space-y-4 animate-slideUp">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl font-bold text-xs border border-emerald-100 flex items-center justify-center gap-3">
            <FontAwesomeIcon icon={faCheckCircle} /> RESERVASI BERHASIL DICATAT
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => window.print()} 
              className="py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-all text-[10px] uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faPrint} /> Struk
            </button>
            <button 
              onClick={() => navigate("/")}
              className="py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all text-[10px] uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faHome} /> Beranda
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPayment;