import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faArrowLeft, faHome, faMapMarkerAlt, faShieldHalved } from "@fortawesome/free-solid-svg-icons";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 font-sans overflow-hidden">
      {/* BACKGROUND DECO */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] font-black text-slate-50 select-none -z-10 tracking-tighter italic">
        404
      </div>

      <div className="max-w-xl w-full text-center relative z-10">
        {/* Animated Icon Header */}
        <div className="mb-12 flex justify-center">
          <div className="w-24 h-24 rounded-[2.5rem] bg-slate-900 flex items-center justify-center text-white text-3xl shadow-3xl shadow-slate-200 animate-float">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500" />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 uppercase italic tracking-tighter leading-[0.8]">
          Lost in <br /> <span className="text-blue-600">Space.</span>
        </h1>

        <p className="text-slate-400 font-medium text-lg mb-12 leading-relaxed max-w-sm mx-auto">
          The residency portal you are attempting to reach does not exist within our secure infrastructure.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="btn-premium bg-slate-50 text-slate-900 border border-slate-100 hover:bg-white"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Previous Node
          </button>

          <Link
            to="/"
            className="btn-premium bg-slate-950 text-white hover:bg-blue-600"
          >
            <FontAwesomeIcon icon={faHome} />
            Main Terminal
          </Link>
        </div>

        {/* Footer Note */}
        <div className="mt-20 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
            <FontAwesomeIcon icon={faShieldHalved} className="text-blue-600" /> Secure Protocol StayEase
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-200">&copy; 2026 Residency Management</p>
        </div>
      </div>
    </div>
  );
};

export default Error404;