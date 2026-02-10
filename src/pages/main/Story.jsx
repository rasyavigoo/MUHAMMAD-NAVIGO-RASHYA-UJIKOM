import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faEye, faRocket, faCompass, faAward, faGlobe } from "@fortawesome/free-solid-svg-icons";
import storyHero from "../../assets/generated/story-hero.png";
import storyAbout from "../../assets/generated/about.png";
import storyPenthouse from "../../assets/generated/room-penthouse.png";

const Story = () => {
  return (
    <div className="bg-white min-h-screen pt-24 pb-24 px-6 md:px-12 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* HERO SECTION */}
        <div className="flex flex-col lg:flex-row gap-20 items-center mb-40">
          <div className="flex-1 animate-fadeIn">
            <div className="inline-flex items-center gap-3 bg-slate-900 text-white text-[10px] font-black px-4 py-2 rounded-full tracking-[0.3em] uppercase mb-8">
              Sejak 2026
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 uppercase italic tracking-tighter leading-[0.8] mb-12">
              Esensi <br /> <span className="text-blue-600">Kami.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed italic border-l-4 border-blue-600 pl-8 ml-2">
              "Mendefinisikan ulang arsitektur kehidupan melalui kecerdasan, kemewahan, dan konektivitas tanpa batas."
            </p>
          </div>
          <div className="w-full lg:w-[450px] h-[500px] rounded-[3rem] overflow-hidden relative animate-slideInRight shadow-3xl shadow-slate-200">
            <img
              src={storyHero}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 hover:scale-110"
              alt="arsitektur"
            />
            <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay"></div>
          </div>
        </div>

        {/* NARRATIVE SECTION */}
        <div className="grid lg:grid-cols-2 gap-20 mb-24 items-center">
          <div className="order-2 lg:order-1 flex gap-4">
            <div className="flex-1 aspect-[3/4] rounded-[3rem] overflow-hidden mt-20">
              <img src={storyAbout} className="w-full h-full object-cover grayscale" alt="interior" />
            </div>
            <div className="flex-1 aspect-[3/4] rounded-[3rem] overflow-hidden">
              <img src={storyPenthouse} className="w-full h-full object-cover grayscale" alt="exterior" />
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase italic tracking-tighter">Visi dari <br /> <span className="text-blue-600">STAYEASE.</span></h2>
            <div className="space-y-6 text-slate-400 font-medium text-base leading-relaxed text-justify">
              <p>
                Lahir dari keinginan untuk menjembatani celah antara perhotelan tradisional dan hunian modern, StayEase muncul sebagai pelopor dalam manajemen properti digital. Kami percaya bahwa menemukan hunian haruslah seanggun gaya hidup yang didukungnya.
              </p>
              <p>
                Platform kami mengatur portofolio hunian eksklusif, masing-masing dipilih secara khusus karena integritas arsitektur dan kesiapan teknologinya. Sejak saat Anda mengautentikasi kehadiran Anda, perjalanan Anda dikurasi oleh sistem yang dirancang untuk presisi dan kemewahan.
              </p>
            </div>
          </div>
        </div>

        {/* CORE VALUES BENTO */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-slate-900 p-10 sm:p-14 rounded-[2.5rem] md:rounded-[3rem] text-white relative overflow-hidden group">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-xl shadow-blue-500/30">
                  <FontAwesomeIcon icon={faCompass} />
                </div>
                <h3 className="text-3xl font-black uppercase italic tracking-tighter">Orientasi Strategis.</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]">Infrastruktur Presisi</p>
                  <p className="text-slate-400 font-medium leading-relaxed">Mengembangkan sistem reservasi real-time tanpa latensi untuk aksesibilitas global.</p>
                </div>
                <div className="space-y-4">
                  <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]">Keamanan Anggota</p>
                  <p className="text-slate-400 font-medium leading-relaxed">Menerapkan enkripsi canggih dan protokol otorisasi untuk hunian elit.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 p-10 rounded-[2.5rem] md:rounded-[3rem] text-white flex flex-col justify-between shadow-3xl shadow-blue-500/20">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
              <FontAwesomeIcon icon={faAward} />
            </div>
            <div>
              <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4">Kualitas <br /> Elit.</h3>
              <p className="text-blue-100 font-medium text-sm">Menjaga standar tak tertandingi di setiap properti dalam jaringan global kami.</p>
            </div>
          </div>

          <div className="bg-slate-50 p-10 rounded-[2.5rem] md:rounded-[3rem] border border-slate-100 flex flex-col items-center text-center space-y-8">
            <div className="w-14 h-14 bg-slate-200 rounded-2xl flex items-center justify-center text-2xl text-slate-400">
              <FontAwesomeIcon icon={faGlobe} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">Konektivitas <br /> Global.</h3>
            <p className="text-slate-400 font-medium text-[13px]">Memperluas cakrawala melampaui batas fisik untuk menciptakan ekosistem kehidupan yang terpadu.</p>
          </div>

          <div className="md:col-span-2 bg-white p-10 rounded-[2.5rem] md:rounded-[3rem] border-4 border-slate-50 flex flex-col md:flex-row items-center gap-12">
            <div className="text-6xl font-black text-slate-200 italic select-none">VISI</div>
            <div className="flex-1 space-y-4">
              <p className="text-lg text-slate-900 font-black uppercase italic tracking-tight">Menjadi ekosistem hunian paling cerdas di dunia.</p>
              <p className="text-slate-400 font-medium leading-relaxed text-sm">Kami bercita-cita untuk memadukan kenyamanan digital dengan kemewahan fisik, menciptakan hunian yang menjawab kebutuhan dunia modern.</p>
            </div>
          </div>
        </div>

        {/* DECORATIVE TEXT */}
        <div className="mt-40 text-center">
          <h4 className="text-[10px] font-black uppercase tracking-[1em] text-slate-300">StayEase Elite Residency • Keunggulan Arsitektur</h4>
        </div>
      </div>
    </div>
  );
};

export default Story;