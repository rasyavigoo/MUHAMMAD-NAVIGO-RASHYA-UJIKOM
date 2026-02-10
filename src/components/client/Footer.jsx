import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTwitter, faReddit, faYoutube, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faShieldHalved, faGlobe, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: faInstagram, url: "#", label: "Instagram" },
    { icon: faTwitter, url: "#", label: "Twitter" },
    { icon: faFacebook, url: "#", label: "Facebook" },
  ];

  return (
    <footer className="bg-slate-950 pt-32 pb-16 font-sans overflow-hidden border-t-4 border-blue-600">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-10 -z-10 translate-x-1/2 -translate-y-1/2"></div>

        <div className="grid lg:grid-cols-4 gap-16 mb-24">
          {/* BRAND */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xs shadow-xl shadow-blue-500/20">
                <FontAwesomeIcon icon={faShieldHalved} />
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tighter uppercase">STAYEASE<span className="text-blue-600">.</span></h1>
            </div>
            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-sm mb-12">
              Menghadirkan kenyamanan hunian modern dengan desain premium dan layanan prima di seluruh Indonesia.
            </p>
            <div className="flex gap-6">
              {socialLinks.map((link, idx) => (
                <a key={idx} href={link.url} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-500">
                  <FontAwesomeIcon icon={link.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* LINKS */}
          <div>
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-8">Navigasi</h4>
            <ul className="space-y-4">
              {[
                { label: 'Jelajahi', path: '/' },
                { label: 'Tentang Kami', path: '/about' },
                { label: 'Kamar', path: '/rooms' }
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className="text-slate-500 hover:text-blue-500 font-bold uppercase tracking-widest text-[10px] transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-4 h-[2px] bg-blue-500 transition-all duration-300"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-8">Hubungi Kami</h4>
            <div className="relative">
              <input
                type="email"
                placeholder="Email Anda"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-xs font-bold text-white placeholder:text-slate-700 outline-none focus:border-blue-600 transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 aspect-square bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all">
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
            <p className="text-[9px] text-slate-500 mt-4 uppercase tracking-widest font-bold leading-relaxed">
              Dapatkan info terbaru mengenai properti dan penawaran eksklusif.
            </p>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-10">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
              &copy; {currentYear} StayEase Management
            </p>
            <div className="hidden md:flex items-center gap-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
              <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
              Syarat & Ketentuan
              <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
              Kebijakan Privasi
            </div>
          </div>
          <div className="flex items-center gap-3 text-slate-700">
            <FontAwesomeIcon icon={faGlobe} className="text-xs" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Bekerja Seluruh Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;