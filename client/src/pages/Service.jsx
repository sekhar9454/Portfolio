import Section from '../components/Section';
import { FaUserTie, FaChalkboardTeacher } from 'react-icons/fa';

export default function Service({ data }) {
  const service = data?.professionalService || [];
  const workshops = data?.workshops || [];
  const admin = data?.administrativeActivities || [];

  if (!service.length && !workshops.length && !admin.length) return null;

  return (
    <Section id="service" title="Professional Service & Activities" icon={<FaUserTie />}>
      {/* Reviewer Roles */}
      {service.length > 0 && (
        <div className="mb-16">
          <h3 className="text-lg font-bold mb-8" style={{ color: 'var(--color-text)' }}>Reviewer & Committee Roles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {service.map((s, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl p-5 border transition-all hover:shadow-md"
                style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
              >
                <span className="mt-0.5 text-sm" style={{ color: 'var(--color-accent)' }}>✦</span>
                <div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded mr-3 inline-block mb-2"
                    style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-badge-text)' }}>
                    {s.role}
                  </span>
                  <span className="text-sm font-medium block" style={{ color: 'var(--color-text)' }}>{s.venue}</span>
                  <p className="text-xs mt-1.5" style={{ color: 'var(--color-text-secondary)' }}>{s.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Workshops */}
      {workshops.length > 0 && (
        <div className="mb-16">
          <h3 className="text-lg font-bold mb-8 flex items-center gap-3" style={{ color: 'var(--color-text)' }}>
            <FaChalkboardTeacher style={{ color: 'var(--color-accent)' }} /> Workshops & FDPs
          </h3>
          <div className="space-y-4">
            {workshops.map((w, i) => (
              <div
                key={i}
                className="rounded-xl p-5 transition-all hover:shadow-md"
                style={{
                  backgroundColor: 'var(--color-card)',
                  borderLeft: `3px solid var(--color-accent)`,
                  borderTop: '1px solid var(--color-border)',
                  borderRight: '1px solid var(--color-border)',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{w.title}</h4>
                    <p className="text-xs mt-1.5" style={{ color: 'var(--color-text-secondary)' }}>{w.organizer}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <span className="px-2.5 py-1 rounded text-xs font-semibold"
                      style={{ backgroundColor: w.role.includes('Organizer') || w.role.includes('Resource') ? 'var(--color-q1)' : 'var(--color-badge-bg)', color: w.role.includes('Organizer') || w.role.includes('Resource') ? 'white' : 'var(--color-badge-text)' }}>
                      {w.role}
                    </span>
                    <span className="px-2.5 py-1 rounded text-xs" style={{ backgroundColor: 'var(--color-bg-alt)', color: 'var(--color-text-secondary)' }}>
                      {w.period}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Administrative */}
      {admin.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-8" style={{ color: 'var(--color-text)' }}>Administrative Activities</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {admin.map((a, i) => (
              <div
                key={i}
                className="rounded-xl p-6 border transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
              >
                <h4 className="font-bold text-sm mb-2" style={{ color: 'var(--color-text)' }}>{a.role}</h4>
                <p className="text-xs font-medium mb-3" style={{ color: 'var(--color-accent)' }}>{a.institution}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
