import Section from './Section';
import { FaEnvelope, FaPhone, FaOrcid, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';

export default function Contact({ data }) {
  if (!data) return null;

  const items = [
    { icon: <FaEnvelope />, label: 'Email', value: data.email, href: `mailto:${data.email}` },
    { icon: <FaPhone />, label: 'Phone', value: data.phone, href: `tel:${data.phone}` },
    { icon: <FaOrcid />, label: 'ORCID', value: data.orcid, href: `https://orcid.org/${data.orcid}` },
    { icon: <FaMapMarkerAlt />, label: 'Address', value: data.address },
  ];

  return (
    <Section id="contact" title="Contact" icon={<FaEnvelope />} alt>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-xl p-6 border text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
            style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
          >
            <div
              className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center text-xl transition-all group-hover:scale-110"
              style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-accent)' }}
            >
              {item.icon}
            </div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-secondary)' }}>
              {item.label}
            </h4>
            {item.href ? (
              <a
                href={item.href}
                target={item.label === 'ORCID' ? '_blank' : undefined}
                rel="noreferrer"
                className="text-sm font-medium hover:underline break-all"
                style={{ color: 'var(--color-accent)' }}
              >
                {item.value}
              </a>
            ) : (
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>{item.value}</p>
            )}
          </div>
        ))}
      </div>

      {/* Languages */}
      {data.languages?.length > 0 && (
        <div className="mt-12 text-center">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-5" style={{ color: 'var(--color-text-secondary)' }}>
            Languages
          </h3>
          <div className="flex justify-center gap-3 flex-wrap">
            {data.languages.map((lang, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full text-sm font-medium border"
                style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
              >
                <FaGlobe className="inline mr-1.5" size={12} /> {lang}
              </span>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
