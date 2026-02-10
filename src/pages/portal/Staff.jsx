import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie,
  faPlus,
  faSearch,
  faEdit,
  faTrash,
  faEnvelope,
  faChevronLeft,
  faChevronRight,
  faTimes,
  faSave,
  faSpinner,
  faShieldHalved,
  faBriefcase
} from "@fortawesome/free-solid-svg-icons";
import { userService } from "../../services/api";

const StaffHub = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    role: "staff",
  });

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const response = await userService.getAll();
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];

      const filtered = data.filter(u => u.role === 'staff');
      setStaffList(filtered);
    } catch (err) {
      console.error("Failed to fetch staff:", err);
      setError("Gagal mengambil data staff.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredData = staffList.filter(
    (user) =>
      user.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        nama: user.nama || "",
        email: user.email || "",
        password: "",
        role: "staff",
      });
    } else {
      setEditingUser(null);
      setFormData({
        nama: "",
        email: "",
        password: "",
        role: "staff",
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...formData, role: "staff" };
      if (editingUser) {
        if (!payload.password) delete payload.password;
        await userService.update(editingUser.id, payload);
      } else {
        await userService.create(payload);
      }
      fetchStaff();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to save:", err);
      alert("Gagal menyimpan data: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Keluarkan staff ini dari sistem?")) {
      try {
        await userService.delete(id);
        setStaffList(staffList.filter(c => c.id !== id));
      } catch (err) {
        console.error("Failed to delete:", err);
        alert("Gagal menghapus data.");
      }
    }
  };

  return (
    <div className="animate-fadeIn min-h-screen pb-20">
      {/* HEADER */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none mb-2">
            Manajemen <span className="text-blue-600">Staff.</span>
          </h1>
          <p className="text-slate-400 font-medium text-sm">
            Mari kelola tim staff khusus dan kredensial akses mereka di sini.
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <span className="absolute inset-y-0 left-5 flex items-center text-slate-300">
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <input
              type="text"
              placeholder="Cari nama atau email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-2xl text-xs font-bold uppercase tracking-widest outline-none focus:border-blue-600 transition-all shadow-sm"
            />
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:bg-blue-600 hover:shadow-blue-500/30 transition-all active:scale-95 flex items-center gap-3"
          >
            <FontAwesomeIcon icon={faPlus} /> Tambah Staff
          </button>
        </div>
      </div>

      {/* STAFF CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {currentItems.map((staff) => (
          <div key={staff.id} className="group bg-white p-8 rounded-[3rem] shadow-xs border border-slate-100 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 hover:-translate-y-2 text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-blue-600 rounded-[2rem] rotate-6 group-hover:rotate-12 transition-transform opacity-10"></div>
              <div className="relative w-full h-full rounded-[2rem] bg-blue-600 text-white flex items-center justify-center text-3xl font-black italic border border-blue-500/20 shadow-xl overflow-hidden">
                {staff.nama?.charAt(0) || "S"}
              </div>
            </div>

            <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter mb-1">{staff.nama}</h3>
            <p className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Staff</p>

            <div className="flex items-center justify-center gap-2 text-slate-400 mb-8 font-medium text-xs truncate whitespace-nowrap overflow-hidden">
              <FontAwesomeIcon icon={faEnvelope} className="text-[10px]" />
              {staff.email}
            </div>

            <div className="flex gap-2 justify-center pt-6 border-t border-slate-50">
              <button onClick={() => handleOpenModal(staff)} className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all active:scale-95">
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button onClick={() => handleDelete(staff.id)} className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all active:scale-95">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}

        {currentItems.length === 0 && (
          <div className="lg:col-span-4 py-32 text-center border-4 border-dashed border-slate-100 rounded-[4rem]">
            <FontAwesomeIcon icon={faUserTie} className="text-6xl text-slate-100 mb-6" />
            <h3 className="text-xl font-black text-slate-300 uppercase tracking-widest">Tidak Ada Staff Ditemukan</h3>
          </div>
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-9999 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
          <div className="bg-white rounded-[4rem] shadow-3xl w-full max-w-lg relative animate-fadeIn overflow-hidden">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-8 right-8 w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all z-10"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <div className="p-12">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                  <FontAwesomeIcon icon={faBriefcase} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">
                    {editingUser ? "Ubah Data Staff" : "Daftarkan Staff Baru"}
                  </h2>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Kredensial Staff</p>
                </div>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] ml-2">Nama Lengkap</label>
                  <input
                    required
                    type="text"
                    placeholder="Contoh: Budi Santoso"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-3xl text-slate-900 font-bold outline-none focus:bg-white focus:border-blue-600 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] ml-2">Email Staff</label>
                  <input
                    required
                    type="email"
                    placeholder="staff@stayease.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-3xl text-slate-900 font-bold outline-none focus:bg-white focus:border-blue-600 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em] ml-2">Kata Sandi Akses</label>
                  <input
                    required={!editingUser}
                    type="password"
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-3xl text-slate-900 font-bold outline-none focus:bg-white focus:border-blue-600 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-slate-950 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.3em] shadow-3xl shadow-slate-200 transition-all hover:bg-blue-600 hover:shadow-blue-500/40 disabled:opacity-50 flex items-center justify-center gap-4 mt-4"
                >
                  {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : (
                    <>
                      <FontAwesomeIcon icon={faSave} /> Simpan Data
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffHub;
