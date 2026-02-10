import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHistory,
  faSearch,
  faFilter,
  faFileDownload,
  faCheckCircle,
  faTimesCircle,
  faClock,
  faUserCircle,
  faChevronLeft,
  faChevronRight,
  faSpinner,
  faSignInAlt,
  faSignOutAlt,
  faCalendarAlt,
  faGlobe
} from "@fortawesome/free-solid-svg-icons";
import { bookingService } from "../../services/api";

const BookingHub = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State untuk pencarian

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingService.getAll();
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];

      const mapped = data.map((b) => ({
        id: b.id,
        user: b.User?.nama || b.nama_penyewa || "User-" + b.user_id,
        room: b.Room?.type_name || "Room-" + b.room_id,
        checkIn: b.check_in_date
          ? new Date(b.check_in_date).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })
          : "-",
        checkOut: b.check_out_date
          ? new Date(b.check_out_date).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })
          : "-",
        status: b.status,
      }));

      setBookings(mapped);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // LOGIKA PENCARIAN
  const filteredBookings = bookings.filter(booking => 
    booking.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

  const stats = [
    { label: "Total Reservasi", count: bookings.length, icon: faHistory, color: "text-slate-900", bg: "bg-slate-100" },
    { label: "Selesai", count: bookings.filter(h => ["checked_out", "completed"].includes(h.status)).length, icon: faCheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Check-In", count: bookings.filter(h => h.status === "checked_in").length, icon: faGlobe, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Menunggu", count: bookings.filter(h => h.status === "pending").length, icon: faClock, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  const handleAction = async (action, id) => {
    if (!window.confirm(`Lakukan tindakan ini pada data reservasi?`)) return;
    try {
      setLoading(true);
      if (action === 'approve') await bookingService.approve(id);
      if (action === 'reject') {
        const reason = prompt("Alasan penolakan:");
        if (!reason) return;
        await bookingService.reject(id, { notes: reason });
      }
      if (action === 'checkIn') await bookingService.checkIn(id);
      if (action === 'checkOut') await bookingService.checkOut(id);
      await fetchBookings();
    } catch (err) {
      console.error(`${action} failed:`, err);
      alert(`Gagal memproses data reservasi.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn min-h-screen pb-20">
      {/* HEADER */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 uppercase tracking-tight leading-none mb-2">
            Daftar <span className="text-blue-600">Reservasi.</span>
          </h1>
          <p className="text-slate-400 font-medium text-sm">
            Pantau dan proses seluruh reservasi yang sudah dibayar.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-72">
            <span className="absolute inset-y-0 left-5 flex items-center text-slate-300">
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <input
              type="text"
              placeholder="Cari nama pelanggan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-2xl text-xs font-bold uppercase tracking-wider outline-none focus:border-blue-600 transition-all shadow-sm"
            />
          </div>
          <button onClick={() => window.print()} className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 transition-all active:scale-95 flex items-center gap-3">
            <FontAwesomeIcon icon={faFileDownload} /> Unduh Data
          </button>
        </div>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-4xl shadow-xs border border-slate-100 flex items-center gap-6">
            <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm`}>
              <FontAwesomeIcon icon={stat.icon} />
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{stat.count}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-4xl shadow-xs border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/20">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <FontAwesomeIcon icon={faCalendarAlt} />
            </div>
            <h2 className="font-bold text-slate-900 uppercase text-lg tracking-tight">Riwayat Reservasi</h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-400 text-[9px] uppercase tracking-wider font-bold bg-slate-50/50">
                <th className="px-8 py-4">ID Referensi</th>
                <th className="px-8 py-4">Pelanggan</th>
                <th className="px-8 py-4">Tipe Kamar</th>
                <th className="px-8 py-4 text-center">Jadwal</th>
                <th className="px-8 py-4 text-center">Status</th>
                <th className="px-8 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading && currentItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-32 text-center">
                    <FontAwesomeIcon icon={faSpinner} spin size="2x" className="text-blue-600 mb-4" />
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Memuat Data Reservasi...</p>
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-20 text-center text-slate-400 font-bold uppercase text-xs">Data Tidak Ditemukan</td>
                </tr>
              ) : (
                currentItems.map((row) => (
                  <tr key={row.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-4 font-mono text-[10px] font-black text-slate-400 tracking-tighter">
                      RES-{row.id.toString().padStart(6, '0')}
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
                          <FontAwesomeIcon icon={faUserCircle} />
                        </div>
                        <span className="font-bold text-slate-800 text-[11px] uppercase tracking-tight">{row.user}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4 font-bold text-slate-500 text-[10px] uppercase tracking-wide">
                      {row.room}
                    </td>
                    <td className="px-8 py-4 text-center">
                      <div className="inline-flex flex-col gap-1 items-center">
                        <span className="text-[9px] font-bold text-slate-900 uppercase bg-blue-50 px-2 py-0.5 rounded-lg">{row.checkIn}</span>
                        <span className="text-[8px] font-bold text-slate-300 uppercase">sampai</span>
                        <span className="text-[9px] font-bold text-slate-900 uppercase bg-blue-50 px-2 py-0.5 rounded-lg">{row.checkOut}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-center">
                      <span
                        className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider shadow-sm ${
                          row.status === "checked_out" ? "bg-slate-100 text-slate-500" :
                          row.status === "checked_in" ? "bg-blue-600 text-white shadow-blue-500/20" :
                          row.status === "approved" ? "bg-emerald-500 text-white shadow-emerald-500/20" :
                          row.status === "pending" ? "bg-amber-500 text-white shadow-amber-500/20" :
                          "bg-rose-100 text-rose-600"
                        }`}
                      >
                        {row.status === "pending" ? "Menunggu" :
                          row.status === "approved" ? "Disetujui" :
                          row.status === "rejected" ? "Ditolak" :
                          row.status === "checked_in" ? "Check-In" :
                          row.status === "checked_out" ? "Selesai" : row.status}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                        {row.status === "pending" && (
                          <>
                            <button onClick={() => handleAction('approve', row.id)} className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all">
                              <FontAwesomeIcon icon={faCheckCircle} />
                            </button>
                            <button onClick={() => handleAction('reject', row.id)} className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all">
                              <FontAwesomeIcon icon={faTimesCircle} />
                            </button>
                          </>
                        )}
                        {row.status === "approved" && (
                          <button onClick={() => handleAction('checkIn', row.id)} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[9px] font-bold uppercase tracking-wider flex items-center gap-2">
                            <FontAwesomeIcon icon={faSignInAlt} /> Check-In
                          </button>
                        )}
                        {row.status === "checked_in" && (
                          <button onClick={() => handleAction('checkOut', row.id)} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[9px] font-bold uppercase tracking-wider flex items-center gap-2">
                            <FontAwesomeIcon icon={faSignOutAlt} /> Check-Out
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="p-10 flex justify-between items-center bg-slate-50/20 border-t border-slate-50">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Arsip Reservasi • Halaman {currentPage}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-400 disabled:opacity-30 hover:text-blue-600 transition-all font-black"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-400 disabled:opacity-30 hover:text-blue-600 transition-all font-black"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHub;