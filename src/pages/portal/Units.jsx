import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faPlus,
  faSearch,
  faEdit,
  faTrash,
  faCheckCircle,
  faUtensils,
  faMinusCircle,
  faChevronLeft,
  faChevronRight,
  faTimes,
  faSave,
  faSpinner,
  faFan,
  faWind,
  faImage,
  faListUl
} from "@fortawesome/free-solid-svg-icons";
import { roomService } from "../../services/api";
import roomFallback from "../../assets/generated/room-penthouse.png";

const UnitHub = () => {
  // 1. STATE UTAMA
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = user.role === "admin" || user.role === "staff";

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    type_name: "",
    description: "",
    price_per_night: 0,
    bed_type: "single",
    has_ac: false,
    has_fan: false,
    total_rooms: 0,
    image_url: "",
  });

  // Fetch Data
  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await roomService.getAll();
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];
      setRooms(data);
    } catch (err) {
      console.error("Failed to fetch rooms:", err);
      setError("Gagal mengambil data kamar dari server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredData = rooms.filter(
    (room) =>
      room.type_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(room.id).toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleOpenModal = (room = null) => {
    if (room) {
      setEditingRoom(room);
      setFormData({
        type_name: room.type_name || "",
        description: room.description || "",
        price_per_night: room.price_per_night || 0,
        bed_type: room.bed_type || "single",
        has_ac: room.has_ac || false,
        has_fan: room.has_fan || false,
        total_rooms: room.total_rooms || 0,
        image_url: room.image_url || "",
      });
    } else {
      setEditingRoom(null);
      setFormData({
        type_name: "",
        description: "",
        price_per_night: 0,
        bed_type: "single",
        has_ac: false,
        has_fan: false,
        total_rooms: 0,
        image_url: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingRoom) {
        await roomService.update(editingRoom.id, formData);
        fetchRooms();
      } else {
        await roomService.create(formData);
        fetchRooms();
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to save:", err);
      alert("Gagal menyimpan data: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Hapus tipe kamar ini dari sistem?")) {
      try {
        await roomService.delete(id);
        setRooms(rooms.filter((i) => i.id !== id));
        if (currentItems.length === 1 && currentPage > 1) setCurrentPage(currentPage - 1);
      } catch (err) {
        console.error("Failed to delete:", err);
        alert("Gagal menghapus data.");
      }
    }
  };

  if (loading && rooms.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <FontAwesomeIcon icon={faSpinner} spin size="4x" className="text-blue-600 mb-6" />
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Memuat Data Kamar...</p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn min-h-screen pb-20">
      {/* HEADER */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 uppercase tracking-tight leading-none mb-2">
            Manajemen <span className="text-blue-600">Kamar.</span>
          </h1>
          <p className="text-slate-400 font-medium text-sm">
            Kelola daftar tipe kamar dan ketersediaan unit.
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <span className="absolute inset-y-0 left-5 flex items-center text-slate-300">
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <input
              type="text"
              placeholder="Cari tipe..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-2xl text-xs font-bold uppercase tracking-wider outline-none focus:border-blue-600 transition-all shadow-sm"
            />
          </div>
          {isAdmin && (
            <button
              onClick={() => handleOpenModal()}
              className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-xl shadow-slate-200 hover:bg-blue-600 hover:shadow-blue-500/30 transition-all active:scale-95 flex items-center gap-3"
            >
              <FontAwesomeIcon icon={faPlus} /> Tambah Kamar
            </button>
          )}
        </div>
      </div>

      {/* GRID DISPLAY */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {currentItems.map((room) => (
          <div key={room.id} className="group bg-white rounded-4xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-2xl transition-all duration-500 flex flex-col">
            <div className="relative aspect-video overflow-hidden">
              <img
                src={room.image_url || roomFallback}
                alt={room.type_name}
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
              />
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <span className="bg-slate-950 text-white text-[9px] font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider">{room.bed_type} Bed</span>
                {room.has_ac ? (
                  <span className="bg-blue-600 text-white text-[9px] font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider">Fasilitas AC</span>
                ) : room.has_fan ? (
                  <span className="bg-indigo-600 text-white text-[9px] font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider">Fasilitas Kipas</span>
                ) : null}
              </div>
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-white font-bold text-slate-900 text-sm">
                Rp {room.price_per_night?.toLocaleString()} <span className="text-[9px] opacity-40 font-normal">/ Malam</span>
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight mb-4">{room.type_name}</h3>
                <p className="text-slate-400 text-[11px] font-medium leading-relaxed mb-6 line-clamp-3">"{room.description}"</p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-[10px] font-bold text-slate-400">
                    {room.total_rooms}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Unit Tersedia</span>
                </div>

                {isAdmin && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModal(room)}
                      className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all active:scale-95"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDelete(room.id)}
                      className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all active:scale-95"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {currentItems.length === 0 && (
          <div className="lg:col-span-3 py-24 text-center border-4 border-dashed border-slate-100 rounded-[2.5rem]">
            <FontAwesomeIcon icon={faBed} className="text-5xl text-slate-100 mb-6" />
            <h3 className="text-lg font-bold text-slate-300 uppercase tracking-wider">Kamar Tidak Ditemukan</h3>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 disabled:opacity-30 hover:border-blue-600 hover:text-blue-600 transition-all font-black"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-14 h-14 rounded-2xl font-black text-xs uppercase transition-all ${currentPage === i + 1 ? "bg-slate-900 text-white shadow-xl shadow-slate-200" : "bg-white text-slate-400 border border-slate-100 hover:bg-slate-50"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 disabled:opacity-30 hover:border-blue-600 hover:text-blue-600 transition-all font-black"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}

      {/* MODAL FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-[9999] flex items-center justify-center p-6 border-slate-100 overflow-y-auto">
          <div className="bg-white rounded-[2.5rem] shadow-3xl w-full max-w-4xl relative animate-fadeIn">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-10 right-10 w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all z-10"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <div className="grid md:grid-cols-5 h-full max-h-[85vh]">
              {/* Modal Sidebar */}
              <div className="md:col-span-2 bg-slate-950 p-10 text-white flex flex-col justify-between rounded-l-[2.5rem]">
                <div>
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-8 shadow-2xl shadow-blue-500/50">
                    <FontAwesomeIcon icon={editingRoom ? faEdit : faPlus} />
                  </div>
                  <h2 className="text-3xl font-bold uppercase tracking-tight leading-none mb-6">
                    {editingRoom ? "Ubah <br/>Kamar." : "Tambah <br/>Kamar."}
                  </h2>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">
                    Konfigurasi spesifikasi untuk tipe kamar StayEase.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="p-5 bg-white/5 rounded-3xl border border-white/10 flex items-center gap-4">
                    <FontAwesomeIcon icon={faImage} className="text-blue-400" />
                    <div className="text-[9px] font-bold uppercase tracking-wider text-white/50">Foto Kamar Diperlukan</div>
                  </div>
                  <div className="p-5 bg-white/5 rounded-3xl border border-white/10 flex items-center gap-4">
                    <FontAwesomeIcon icon={faListUl} className="text-amber-400" />
                    <div className="text-[9px] font-bold uppercase tracking-wider text-white/50">Data Harus Akurat</div>
                  </div>
                </div>
              </div>

              {/* Modal Form Content */}
              <div className="md:col-span-3 p-10 overflow-y-auto custom-scrollbar">
                <form onSubmit={handleSave} className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-900 uppercase tracking-wider ml-2">Nama Tipe Kamar</label>
                    <input
                      required
                      type="text"
                      placeholder="Contoh: Presidential Suite"
                      value={formData.type_name}
                      onChange={(e) => setFormData({ ...formData, type_name: e.target.value })}
                      className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-3xl text-slate-900 font-bold outline-none focus:bg-white focus:border-blue-600 transition-all font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-900 uppercase tracking-wider ml-2">Harga / Malam</label>
                      <input
                        required
                        type="number"
                        value={formData.price_per_night}
                        onChange={(e) => setFormData({ ...formData, price_per_night: parseInt(e.target.value) || 0 })}
                        className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-3xl text-slate-900 font-bold outline-none focus:bg-white focus:border-blue-600 transition-all font-sans"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-900 uppercase tracking-wider ml-2">Jumlah Unit</label>
                      <input
                        required
                        type="number"
                        value={formData.total_rooms}
                        onChange={(e) => setFormData({ ...formData, total_rooms: parseInt(e.target.value) || 0 })}
                        className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-3xl text-slate-900 font-bold outline-none focus:bg-white focus:border-blue-600 transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-900 uppercase tracking-wider ml-2">Tipe Tempat Tidur</label>
                      <select
                        value={formData.bed_type}
                        onChange={(e) => setFormData({ ...formData, bed_type: e.target.value })}
                        className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-3xl text-slate-900 font-bold outline-none focus:bg-white focus:border-blue-600 transition-all h-[64px] font-sans"
                      >
                        <option value="single">Single</option>
                        <option value="double">Double</option>
                        <option value="queen">Queen</option>
                        <option value="king">King</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-900 uppercase tracking-wider ml-2">Fasilitas Kamar</label>
                      <div className="flex gap-6 pt-3">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={formData.has_ac}
                            onChange={(e) => setFormData({ ...formData, has_ac: e.target.checked })}
                            className="accent-blue-600 w-5 h-5 rounded-lg"
                          />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-blue-600 transition-colors">AC</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={formData.has_fan}
                            onChange={(e) => setFormData({ ...formData, has_fan: e.target.checked })}
                            className="accent-amber-500 w-5 h-5"
                          />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-amber-500 transition-colors">Kipas Angin</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-900 uppercase tracking-wider ml-2">Link Foto Kamar</label>
                    <input
                      type="text"
                      placeholder="https://image-url.com/kamar.jpg"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-3xl text-slate-900 font-bold outline-none focus:bg-white focus:border-blue-600 transition-all text-xs font-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-900 uppercase tracking-wider ml-2">Deskripsi Kamar</label>
                    <textarea
                      rows="3"
                      placeholder="Masukkan deskripsi singkat tipe kamar..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-3xl text-slate-900 font-bold outline-none focus:bg-white focus:border-blue-600 transition-all resize-none font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-slate-950 text-white py-6 rounded-3xl font-bold text-xs uppercase tracking-wider shadow-3xl shadow-slate-200 transition-all hover:bg-blue-600 hover:shadow-blue-500/40 disabled:opacity-50 flex items-center justify-center gap-4"
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
        </div>
      )}
    </div>
  );
};

export default UnitHub;
