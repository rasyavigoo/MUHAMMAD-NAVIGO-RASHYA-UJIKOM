import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentHub = () => {
  const [nama, setNama] = useState("");
  const [bayar, setBayar] = useState("");
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:3000/payments";

  const fetchPayments = async () => {
    try {
      const res = await axios.get(API_URL);
      if (res.data.success) setPayments(res.data.data);
    } catch (err) {
      console.error("Gagal load data");
    }
  };

  useEffect(() => { fetchPayments(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(API_URL, {
        booking_id: 1, 
        nama_penyewa: nama,
        total_bayar: bayar
      });
      setNama(""); setBayar("");
      fetchPayments();
    } catch (err) {
      alert("Gagal simpan!");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}`);
      fetchPayments();
    } catch (err) {
      alert("Gagal update!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-4 uppercase tracking-wider">Generate Pembayaran Baru</h2>
        <form onSubmit={handleAdd} className="flex flex-wrap gap-4">
          <input 
            type="text" placeholder="Nama Penyewa" 
            className="flex-1 min-w-[200px] px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={nama} onChange={(e) => setNama(e.target.value)} required 
          />
          <input 
            type="number" placeholder="Total Bayar (Rp)" 
            className="flex-1 min-w-[200px] px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={bayar} onChange={(e) => setBayar(e.target.value)} required 
          />
          <button 
            type="submit" disabled={loading}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
          >
            {loading ? "PROSES..." : "BUAT TAGIHAN"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Penyewa</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nominal</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {payments.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-bold text-slate-700">{p.nama_penyewa}</td>
                <td className="px-6 py-4 text-sm text-slate-600 font-medium">Rp {Number(p.total_bayar).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${p.status === 'Sukses' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  {p.status === 'Pending' && (
                    <button 
                      onClick={() => handleConfirm(p.id)}
                      className="text-[10px] font-bold bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all shadow-md"
                    >
                      KONFIRMASI
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHub;