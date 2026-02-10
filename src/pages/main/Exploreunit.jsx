import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { roomService } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faBed,
  faWind,
  faFan,
  faStar,
  faArrowRight,
  faCrown
} from "@fortawesome/free-solid-svg-icons";
import fallbackRoom from "../../assets/generated/room-penthouse.png";

const Explore = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await roomService.getAll();
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];

        const mappedItems = data.map((room) => ({
          id: room.id,
          typeName: room.type_name,
          img:
            room.image_url && room.image_url.startsWith("http")
              ? room.image_url
              : fallbackRoom,
          price: room.price_per_night,
          bedType: room.bed_type,
          hasAc: room.has_ac,
          hasFan: room.has_fan,
          totalRooms: room.total_rooms,
          rating: (Math.random() * (5 - 4.5) + 4.5).toFixed(1) // Simulate ratings for aesthetic
        }));
        setRooms(mappedItems);
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setError("Gagal memuat daftar kamar.");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="text-center">
      <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-blue-600 mb-4" />
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Menyiapkan kamar terbaik untuk Anda...</p>
    </div>
  </div>

  return (
    <div className="room-list bg-white py-12 md:py-32 min-h-screen overflow-x-hidden">
      <div className="container mx-auto px-6">
        {/* HEADER */}
        <div className="max-w-4xl mx-auto text-center mb-32 animate-fadeIn">
          <div className="flex justify-center mb-8">
            <span className="bg-blue-600/10 text-blue-600 px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider border border-blue-100 flex items-center gap-2">
              <FontAwesomeIcon icon={faCrown} /> Koleksi Premium
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-[0.9] uppercase">
            Kamar <br /> <span className="text-blue-600">Pilihan.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Jelajahi pilihan kamar terbaik kami. Setiap unit dirancang untuk memberikan pengalaman menginap yang istimewa.
          </p>
        </div>

        {/* GRID UNIT */}
        {error ? (
          <div className="text-center bg-red-50 p-10 rounded-[2.5rem] text-red-600 font-black uppercase tracking-widest border border-red-100 max-w-md mx-auto">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="group relative"
              >
                {/* IMAGE COMPONENT */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-4xl md:rounded-[3rem] shadow-3xl shadow-slate-200 transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-blue-500/10">
                  <img
                    src={room.img}
                    alt={room.typeName}
                    className="w-full h-full object-cover grayscale opacity-80 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                  />

                  {/* Rating Tag */}
                  <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 px-3 py-1.5 rounded-2xl flex items-center gap-2 text-white shadow-lg">
                    <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-xs" />
                    <span className="font-bold text-xs">{room.rating}</span>
                  </div>

                  {/* Bed Info Overlay */}
                  <div className="absolute top-8 left-8 bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-blue-500/40">
                    {room.bedType} BED
                  </div>

                  {/* Pricing Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent transition-opacity group-hover:opacity-90"></div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h2 className="text-3xl font-bold text-white mb-2 tracking-tight uppercase leading-none">
                      {room.typeName}
                    </h2>

                    <div className="flex items-center gap-4 mb-8">
                      <div className="flex items-center gap-2 text-white/60 text-[10px] font-bold uppercase tracking-widest">
                        <FontAwesomeIcon icon={room.hasAc ? faWind : faFan} className="text-blue-400" />
                        {room.hasAc ? "AC Tersedia" : room.hasFan ? "Kipas Angin" : "Ventilasi Alam"}
                      </div>
                      <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
                      <div className="text-white/60 text-[10px] font-bold uppercase tracking-wider">
                        Rp {room.price?.toLocaleString()} <span className="text-[8px] opacity-50">/ Malam</span>
                      </div>
                    </div>

                    {room.totalRooms > 0 ? (
                      <Link
                        to={`/booking/${room.id}`}
                        className="inline-flex items-center justify-center gap-3 bg-white text-slate-950 w-full py-5 rounded-2xl font-bold text-xs uppercase tracking-wider transform active:scale-95 transition-all hover:bg-blue-600 hover:text-white"
                      >
                        Pesan Sekarang <FontAwesomeIcon icon={faArrowRight} />
                      </Link>
                    ) : (
                      <div className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-white/50 text-center font-bold text-xs uppercase tracking-wider">
                        Sudah Terisi
                      </div>
                    )}
                  </div>
                </div>

                {/* Ambient Shadow Effect */}
                <div className="absolute -bottom-10 left-10 right-10 h-20 bg-blue-600/0 group-hover:bg-blue-600/10 blur-[50px] transition-all duration-700 -z-10"></div>
              </div>
            ))}
          </div>
        )}
      </div>


    </div>
  );
};

export default Explore;
