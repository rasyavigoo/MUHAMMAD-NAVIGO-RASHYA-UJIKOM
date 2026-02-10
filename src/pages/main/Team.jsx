import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { DataKordinator } from "../../data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldHalved, faGlobe, faMicrochip } from '@fortawesome/free-solid-svg-icons';

const Team = () => {
    return (
        <div className="bg-slate-950 py-20 md:py-32 min-h-screen font-sans overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* DECORATIVE BACKGROUND ELEMENTS */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600 rounded-full blur-[200px] opacity-10 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[180px] opacity-10 pointer-events-none"></div>

                {/* HEADER */}
                <div className="text-center mb-32 animate-fadeIn relative z-10">
                    <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-blue-400 text-[10px] font-black px-4 py-2 rounded-full tracking-[0.4em] uppercase mb-8">
                        The Human Protocol
                    </div>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-[0.8] mb-10">
                        Elite <br /> <span className="text-blue-600">Handlers.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed italic font-medium">
                        "Architecting your residency through personalized intelligence and unwavering dedication. Meet the guardians of StayEase."
                    </p>
                </div>

                <div className="relative group/swiper">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={40}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        navigation={true}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        modules={[Pagination, Navigation, Autoplay]}
                        className="mySwiper overflow-visible!"
                    >
                        {DataKordinator.map((data) => (
                            <SwiperSlide className="relative group cursor-grab active:cursor-grabbing pb-16" key={data.id}>
                                <div className="relative aspect-[4/6] overflow-hidden rounded-4xl md:rounded-[3rem] border border-white/10 shadow-3xl shadow-slate-950 transition-all duration-1000 group-hover:border-blue-500/30 group-hover:-translate-y-4">
                                    <img
                                        src={data.img}
                                        alt={data.nama}
                                        className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                                    />

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 transition-opacity"></div>

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 w-full p-8 sm:p-12 transform transition-all duration-700 opacity-90 group-hover:opacity-100">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="h-[1px] flex-1 bg-white/10 group-hover:bg-blue-600 transition-colors"></div>
                                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-blue-400 border border-white/10">
                                                <FontAwesomeIcon icon={faShieldHalved} className="text-xs" />
                                            </div>
                                        </div>
                                        <h3 className="text-4xl font-black text-white mb-2 uppercase italic tracking-tighter leading-none">
                                            {data.nama}
                                        </h3>
                                        <p className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
                                            {data.job}
                                        </p>
                                        <div className="flex gap-4 pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-1000 delay-300">
                                            <div className="flex items-center gap-2 text-slate-500 text-[9px] font-black uppercase tracking-widest">
                                                <FontAwesomeIcon icon={faGlobe} className="text-blue-500" /> Authorized
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-500 text-[9px] font-black uppercase tracking-widest">
                                                <FontAwesomeIcon icon={faMicrochip} className="text-blue-500" /> ID Verified
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* BOTTOM STATS */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: 'Avg Coordination', val: '24/7' },
                        { label: 'Security Protocols', val: 'Level 5' },
                        { label: 'Member Satisfaction', val: '99.9%' },
                        { label: 'Active Handles', val: '08' }
                    ].map((stat, i) => (
                        <div key={i} className="text-center p-8 bg-white/5 rounded-3xl border border-white/5">
                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
                            <p className="text-3xl font-black text-white uppercase italic tracking-tighter">{stat.val}</p>
                        </div>
                    ))}
                </div>

                {/* DECORATIVE QUOTE */}
                <div className="mt-24 text-center relative">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -z-10"></div>
                    <span className="bg-slate-950 px-8 text-[9px] font-black text-slate-600 uppercase tracking-[1em]">The Future of Elite Residency</span>
                </div>
            </div>
        </div>
    );
};

export default Team;
