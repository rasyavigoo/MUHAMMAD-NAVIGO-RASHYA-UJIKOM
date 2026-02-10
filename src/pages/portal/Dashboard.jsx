import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarCheck,
  faUserTie,
  faClock,
  faCrown,
  faArrowTrendUp,
  faUserGroup,
  faBell
} from "@fortawesome/free-solid-svg-icons";

const Overview = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const stats = [
    { label: "Unit Tersedia", count: "48", icon: faBed, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Hunian Aktif", count: "15", icon: faCalendarCheck, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Staf Aktif", count: "8", icon: faUserTie, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Menunggu Check-in", count: "4", icon: faClock, color: "text-rose-600", bg: "bg-rose-50" },
  ];

  return (
    <div className="animate-fadeIn min-h-screen pb-20">
      {/* GREETING SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white shadow-lg ${i === 1 ? 'bg-blue-600' : i === 2 ? 'bg-indigo-600' : 'bg-slate-900'}`}>
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight uppercase">
            Dashboard <span className="text-blue-600">Admin</span>
          </h1>
          <p className="text-slate-400 font-medium text-sm mt-1">Pantau ringkasan aktivitas sistem secara keseluruhan.</p>
        </div>

        <div className="flex items-center gap-4">
          <button className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm">
            <FontAwesomeIcon icon={faBell} />
          </button>
          <div className="h-12 w-px bg-slate-100 mx-2"></div>
          <button className="btn-premium bg-slate-900 text-white text-xs px-6 py-3 py-4! shadow-xl shadow-slate-200">
            <FontAwesomeIcon icon={faCrown} className="text-blue-400" /> Laporan Sistem
          </button>
        </div>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group bg-white p-6 rounded-4xl shadow-xs border border-slate-100 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 hover:-translate-y-2"
          >
            <div className="flex items-center justify-between mb-8">
              <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-transform group-hover:rotate-12`}>
                <FontAwesomeIcon icon={stat.icon} />
              </div>
              <div className="text-emerald-500 text-xs font-black flex items-center gap-1">
                <FontAwesomeIcon icon={faArrowTrendUp} /> +12%
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">
                {stat.label}
              </p>
              <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
                {stat.count}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* RECENT ACTIVITY TABLE */}
        <div className="lg:col-span-2 bg-white rounded-4xl shadow-xs border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <div>
              <h2 className="font-bold text-slate-900 uppercase text-lg tracking-tight">Status Terbaru</h2>
              <p className="text-slate-400 text-[11px] font-medium">Pantau aktivitas penghuni terbaru.</p>
            </div>
            <button className="text-[10px] font-bold uppercase tracking-widest text-blue-600 hover:text-slate-900 transition-colors">Lihat Log</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-[9px] uppercase tracking-wider font-bold bg-slate-50/50">
                  <th className="px-10 py-5">Penghuni</th>
                  <th className="px-10 py-5">Unit Terpilih</th>
                  <th className="px-10 py-5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[1, 2, 3, 4].map((_, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${i % 2 === 0 ? 'bg-blue-600' : 'bg-slate-900'}`}>
                          {String.fromCharCode(80 + i)}
                        </div>
                        <span className="font-bold text-slate-800 text-sm uppercase">Penghuni {i + 1}</span>
                      </div>
                    </td>
                    <td className="px-10 py-6 text-slate-500 text-xs font-bold uppercase tracking-wide">
                      Penthouse Unit {100 + i}
                    </td>
                    <td className="px-10 py-6 text-center">
                      <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-xl text-[9px] font-bold uppercase tracking-wider">
                        Terverifikasi
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SIDE WIDGET */}
        <div className="space-y-6">
          <div className="bg-slate-950 p-8 rounded-4xl text-white relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold uppercase tracking-tight mb-6">Status Staf</h3>
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-400">
                        <FontAwesomeIcon icon={faUserGroup} />
                      </div>
                      <div>
                        <p className="text-sm font-bold uppercase">Manajer {i}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Online</p>
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-blue-600 p-8 rounded-4xl text-white shadow-2xl shadow-blue-500/20">
            <h3 className="text-lg font-bold uppercase tracking-tight mb-4">Grafik Hunian</h3>
            <div className="h-24 w-full flex items-end gap-1 px-2">
              {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                <div key={i} className="flex-1 bg-white/30 rounded-t-lg transition-all hover:bg-white cursor-pointer" style={{ height: `${h}%` }}></div>
              ))}
            </div>
            <p className="text-[10px] uppercase font-bold tracking-wider mt-6 opacity-60 text-center">Tren Hunian Mingguan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
