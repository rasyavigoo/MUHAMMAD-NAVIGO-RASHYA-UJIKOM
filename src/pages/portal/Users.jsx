import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faPlus,
  faSearch,
  faEdit,
  faTrash,
  faUserTag,
  faEnvelope,
  faChevronLeft,
  faChevronRight,
  faTimes,
  faSave,
  faSpinner,
  faIdCard,
  faShieldHalved,
  faUserShield
} from "@fortawesome/free-solid-svg-icons";
import { userService } from "../../services/api";

const UserHub = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    role: "user",
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAll();
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Gagal mengambil data user dari server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredData = users.filter(
    (user) =>
      user.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(user.id).toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        nama: user.nama || "",
        email: user.email || "",
        password: "",
        role: user.role || "user",
      });
    } else {
      setEditingUser(null);
      setFormData({
        nama: "",
        email: "",
        password: "",
        role: "user",
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingUser) {
        const payload = { ...formData };
        if (!payload.password) delete payload.password;
        await userService.update(editingUser.id, payload);
        fetchUsers();
      } else {
        await userService.create(formData);
        fetchUsers();
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to save user:", err);
      alert("Gagal menyimpan data: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await userService.delete(id);
        setUsers(users.filter((u) => u.id !== id));
      } catch (err) {
        console.error("Failed to delete user:", err);
        alert("Gagal menghapus data.");
      }
    }
  };

  const getRoleBadge = (role) => {
    const roles = {
      admin: { bg: "bg-rose-50", text: "text-rose-600", icon: faUserShield, label: "Admin" },
      staff: { bg: "bg-amber-50", text: "text-amber-600", icon: faIdCard, label: "Staff" },
      user: { bg: "bg-blue-50", text: "text-blue-600", icon: faUsers, label: "Pengguna" },
    };
    const config = roles[role] || roles.user;
    return (
      <span className={`${config.bg} ${config.text} px-2 md:px-4 py-1 rounded-lg md:rounded-xl text-[8px] md:text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5 md:gap-2 w-fit mx-auto`}>
        <FontAwesomeIcon icon={config.icon} className="text-[7px] md:text-sm" /> {config.label}
      </span>
    );
  };

  return (
    <div className="animate-fadeIn min-h-screen pb-20">
      {/* HEADER */}
      <div className="mb-8 md:mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 md:gap-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 uppercase tracking-tight leading-none mb-2">
            Data <span className="text-blue-600">Pengguna.</span>
          </h1>
          <p className="text-slate-400 font-medium text-xs md:text-sm">
            Kelola informasi dan hak akses pengguna sistem.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <div className="relative w-full sm:w-64 lg:w-72">
            <span className="absolute inset-y-0 left-4 flex items-center text-slate-300">
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <input
              type="text"
              placeholder="Cari pengguna..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-100 rounded-xl text-[10px] font-bold uppercase tracking-wider outline-none focus:border-blue-600 transition-all shadow-sm"
            />
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="w-full sm:w-auto bg-slate-950 text-white px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-wider shadow-lg shadow-slate-200 hover:bg-blue-600 hover:shadow-blue-500/30 transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <FontAwesomeIcon icon={faPlus} /> Tambah Akun
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl md:rounded-4xl shadow-xs border border-slate-100 overflow-hidden">
        {/* MOBILE LIST VIEW (Visible on small screens) */}
        <div className="sm:hidden divide-y divide-slate-50">
          {loading && users.length === 0 ? (
            <div className="py-20 text-center text-slate-300 italic text-xs uppercase tracking-wider">Memuat data pengguna...</div>
          ) : (
            currentItems.map((user) => (
              <div key={user.id} className="p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-black italic border border-blue-500/20 shadow-lg shrink-0">
                    {user.nama?.charAt(0) || "U"}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-bold text-slate-800 text-[11px] uppercase truncate">{user.nama}</p>
                    <p className="text-[9px] text-slate-400 font-medium truncate lowercase">{user.email}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  {getRoleBadge(user.role)}
                  <div className="flex gap-3 pr-1">
                    <button onClick={() => handleOpenModal(user)} className="text-blue-500 hover:text-blue-700 transition-colors">
                      <FontAwesomeIcon icon={faEdit} className="text-[10px]" />
                    </button>
                    <button onClick={() => handleDelete(user.id)} className="text-rose-500 hover:text-rose-700 transition-colors">
                      <FontAwesomeIcon icon={faTrash} className="text-[10px]" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* DESKTOP TABLE VIEW (Hidden on mobile) */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[9px] uppercase tracking-wider font-bold bg-slate-50/50">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Pengguna</th>
                <th className="px-6 py-4 hidden md:table-cell">Email</th>
                <th className="px-6 py-4 text-center">Role</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading && users.length === 0 ? (
                <tr><td colSpan="5" className="py-32 text-center text-slate-300 italic">Memuat data pengguna...</td></tr>
              ) : (
                currentItems.map((user) => (
                  <tr key={user.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono text-[10px] text-slate-300">#{user.id.toString().padStart(4, '0')}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-[11px] font-black italic border border-blue-500/20 shadow-md shrink-0">
                          {user.nama?.charAt(0) || "U"}
                        </div>
                        <span className="font-bold text-slate-800 text-[13px] uppercase truncate max-w-[150px] lg:max-w-none">{user.nama}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold lowercase truncate max-w-[200px]">
                        <FontAwesomeIcon icon={faEnvelope} className="text-blue-500" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleOpenModal(user)} className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button onClick={() => handleDelete(user.id)} className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="p-6 md:p-10 flex flex-col sm:flex-row justify-between items-center bg-slate-50/20 border-t border-slate-50 gap-4">
        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 italic text-center sm:text-left">Total Registrasi: {users.length} Pengguna</p>
        <div className="flex gap-2">
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 disabled:opacity-30" disabled={currentPage === 1}>
            <FontAwesomeIcon icon={faChevronLeft} className="text-xs md:text-sm" />
          </button>
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 disabled:opacity-30" disabled={currentPage === totalPages || totalPages === 0}>
            <FontAwesomeIcon icon={faChevronRight} className="text-xs md:text-sm" />
          </button>
        </div>
      </div>
      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-9999 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
          <div className="bg-white rounded-[2.5rem] shadow-3xl w-full max-w-lg relative animate-fadeIn overflow-hidden">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-8 right-8 w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all z-10"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <div className="p-12">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <FontAwesomeIcon icon={faShieldHalved} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">
                    {editingUser ? "Ubah Data" : "Tambah Baru"}
                  </h2>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Data Akun</p>
                </div>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-900 uppercase tracking-wider ml-2">Nama Lengkap</label>
                  <input
                    required
                    type="text"
                    placeholder="Contoh: John Doe"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-3xl text-slate-900 font-bold outline-none focus:bg-white focus:border-blue-600 transition-all font-sans"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-900 uppercase tracking-wider ml-2">Email</label>
                  <input
                    required
                    type="email"
                    placeholder="email@stayease.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-3xl text-slate-900 font-bold outline-none focus:bg-white focus:border-blue-600 transition-all font-sans"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-900 uppercase tracking-wider ml-2">Kata Sandi</label>
                  <input
                    required={!editingUser}
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-3xl text-slate-900 font-bold outline-none focus:bg-white focus:border-blue-600 transition-all font-sans"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-900 uppercase tracking-wider ml-2">Level Akses</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-3xl text-slate-900 font-bold outline-none focus:bg-white focus:border-blue-600 transition-all uppercase tracking-wider text-[10px]"
                  >
                    <option value="user">Pengguna</option>
                    <option value="staff">Staff</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-slate-950 text-white py-6 rounded-3xl font-bold text-xs uppercase tracking-wider shadow-3xl shadow-slate-200 transition-all hover:bg-blue-600 hover:shadow-blue-500/40 disabled:opacity-50 flex items-center justify-center gap-4 mt-4"
                >
                  {loading ? (
                    <FontAwesomeIcon icon={faSpinner} spin />
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faSave} /> Simpan Perubahan
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

export default UserHub;
