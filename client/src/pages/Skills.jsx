import Section from '../components/Section';
import { FaCode, FaBrain, FaShieldAlt, FaTools, FaDesktop } from 'react-icons/fa';

const iconMap = {
  'Programming': <FaCode />,
  'ML & Deep Learning': <FaBrain />,
  'Cybersecurity': <FaShieldAlt />,
  'Tools': <FaTools />,
  'Platforms': <FaDesktop />,
};

export default function Skills({ data }) {
  if (!data?.technicalSkills?.length) return null;

  return (
    <Section id="skills" title="Technical Skills" icon={<FaCode />}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.technicalSkills.map((cat, i) => (
          <div
            key={i}
            className="rounded-xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xl" style={{ color: 'var(--color-accent)' }}>
                {iconMap[cat.category] || <FaTools />}
              </span>
              <h3 className="font-bold" style={{ color: 'var(--color-text)' }}>{cat.category}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, j) => (
                <span
                  key={j}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-105"
                  style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-badge-text)' }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Professional Memberships */}
      {data.professionalMembership?.length > 0 && (
        <div className="mt-16">
          <h3 className="text-xl font-bold mb-8" style={{ color: 'var(--color-text)' }}>Professional Memberships</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {data.professionalMembership.map((m, i) => (
              <div
                key={i}
                className="rounded-xl p-6 border text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
              >
                <div
                  className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-lg font-extrabold text-white"
                  style={{ background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))` }}
                >
                  {m.organization}
                </div>
                <p className="text-xs font-mono mb-2" style={{ color: 'var(--color-text-secondary)' }}>ID: {m.id}</p>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{m.details}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
