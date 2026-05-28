import Section from './Section';
import { FaTrophy, FaMedal, FaAward, FaCertificate, FaVolleyballBall } from 'react-icons/fa';

const awardIcons = {
  'Gold Medal': <FaMedal />,
  'Institute Gold Medal': <FaMedal />,
  'University Gold Medal': <FaMedal />,
  'Pratibha Award': <FaAward />,
  'Best Paper Award': <FaTrophy />,
  'GATE Qualified (2015)': <FaCertificate />,
  'UGC-NET Qualified': <FaCertificate />,
};

export default function Awards({ data }) {
  if (!data?.awards?.length) return null;

  return (
    <Section id="awards" title="Awards & Achievements" icon={<FaTrophy />} alt>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.awards.map((award, i) => (
          <div
            key={i}
            className="rounded-xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
            style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-5 transition-all group-hover:scale-110"
              style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-accent)' }}
            >
              {awardIcons[award.title] || <FaTrophy />}
            </div>
            <h4 className="font-bold mb-3" style={{ color: 'var(--color-text)' }}>{award.title}</h4>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{award.description}</p>
          </div>
        ))}
      </div>

      {/* Informals / Sports */}
      {data.informals?.length > 0 && (
        <div className="mt-16">
          <h3 className="text-xl md:text-2xl font-bold mb-8 flex items-center gap-3" style={{ color: 'var(--color-text)' }}>
            <FaVolleyballBall style={{ color: 'var(--color-accent)' }} /> Sports & Informals
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {data.informals.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-xl p-5 border transition-all hover:shadow-md"
                style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
              >
                <span className="text-2xl" style={{ color: 'var(--color-accent)' }}>🏐</span>
                <div>
                  <h4 className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{item.title}</h4>
                  <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
