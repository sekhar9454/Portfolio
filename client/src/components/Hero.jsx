import { FaEnvelope, FaPhone, FaOrcid, FaMapMarkerAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Hero({ data }) {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!data) return null;

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center overflow-hidden pt-16 transition-all duration-500 ease-out"
      style={{
        background: `linear-gradient(135deg, var(--color-hero-gradient-start), var(--color-hero-gradient-end))`,
        opacity: visible ? 1 : 0,
      }}
    >
      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-48 md:w-72 h-48 md:h-72 rounded-full opacity-10" style={{ backgroundColor: 'var(--color-accent)' }} />
      <div className="absolute bottom-10 left-10 w-64 md:w-96 h-64 md:h-96 rounded-full opacity-5" style={{ backgroundColor: 'var(--color-accent-light)' }} />
      <div className="absolute top-1/2 left-1/3 w-32 md:w-48 h-32 md:h-48 rounded-full opacity-5" style={{ backgroundColor: 'white' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-8 md:py-0">
        <div className="flex flex-col md:grid md:grid-cols-3 gap-8 md:gap-10 items-center">
          {/* Profile Image */}
          <div className="flex justify-center animate-fade-in-up">
            <div
              className="w-40 h-40 md:w-64 md:h-64 rounded-full border-4 overflow-hidden shadow-2xl flex items-center justify-center text-4xl md:text-6xl font-bold"
              style={{
                borderColor: 'var(--color-accent)',
                background: `linear-gradient(135deg, var(--color-primary-light), var(--color-accent))`,
                color: 'white'
              }}
            >
              <img src="img.jpg" alt="ProfilePhoto" className='size-full'/>
              {/* {data.name?.split(' ').map(n => [0]).join('').slice(0, 3)} */}
            </div>
          </div>

          {/* Info */}
          <div className="md:col-span-2 text-white text-center md:text-left animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-2xl md:text-5xl font-extrabold mb-2 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              {data.name}
            </h1>
            <p className="text-base md:text-xl font-medium text-white/80 mb-1">
              {data.designation}, {data.department}
            </p>
            <p className="text-sm md:text-base text-white/60 mb-4 md:mb-6">{data.institution}</p>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 mb-6 md:mb-8">
              <a
                href={`mailto:${data.email}`}
                className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all hover:scale-105"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', backdropFilter: 'blur(8px)' }}
              >
                <FaEnvelope size={12} /> <span className="hidden sm:inline">{data.email}</span><span className="sm:hidden">Email</span>
              </a>
              <a
                href={`tel:${data.phone}`}
                className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all hover:scale-105"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', backdropFilter: 'blur(8px)' }}
              >
                <FaPhone size={12} /> <span className="hidden sm:inline">{data.phone}</span><span className="sm:hidden">Phone</span>
              </a>
              <a
                href={`https://orcid.org/${data.orcid}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all hover:scale-105"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', backdropFilter: 'blur(8px)' }}
              >
                <FaOrcid size={12} /> ORCID
              </a>
            </div>

            {/* Bio */}
            <p className="text-white/80 leading-relaxed mb-6 md:mb-8 max-w-3xl text-xs md:text-base">
              {data.bio}
            </p>

            {/* Research Interests */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-3">Research Interests</h3>
              <div className="flex flex-wrap justify-center md:justify-start gap-1.5 md:gap-2">
                {data.researchInterests?.map((interest, i) => (
                  <span
                    key={i}
                    className="px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105"
                    style={{
                      backgroundColor: 'var(--color-badge-bg)',
                      color: 'var(--color-badge-text)',
                    }}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
