import Section from './Section';
import { FaGraduationCap } from 'react-icons/fa';

export default function Education({ data }) {
  if (!data?.education?.length) return null;

  return (
    <Section id="education" title="Education" icon={<FaGraduationCap />} alt>
      {/* Desktop: Table view */}
      <div className="hidden md:block overflow-x-auto rounded-xl border" style={{ borderColor: 'var(--color-border)' }}>
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
              <th className="px-6 py-4 text-left text-sm font-semibold">Program</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Institution</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">CGPA / %</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Year</th>
            </tr>
          </thead>
          <tbody>
            {data.education.map((edu, i) => (
              <tr
                key={i}
                className="transition-all duration-200"
                style={{
                  backgroundColor: i % 2 === 0 ? 'var(--color-card)' : 'var(--color-bg-alt)',
                  borderBottom: '1px solid var(--color-border)'
                }}
              >
                <td className="px-6 py-5 font-semibold text-sm" style={{ color: 'var(--color-text)' }}>
                  {edu.program}
                </td>
                <td className="px-6 py-5 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {edu.institution}
                </td>
                <td className="px-6 py-5 text-center">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-badge-text)' }}
                  >
                    {edu.score}
                  </span>
                </td>
                <td className="px-6 py-5 text-center text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                  {edu.year}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: Card view */}
      <div className="md:hidden space-y-4">
        {data.education.map((edu, i) => (
          <div
            key={i}
            className="rounded-xl p-5 border transition-all"
            style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <h4 className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{edu.program}</h4>
              <span className="text-xs font-medium whitespace-nowrap" style={{ color: 'var(--color-text-secondary)' }}>{edu.year}</span>
            </div>
            <p className="text-xs mb-3" style={{ color: 'var(--color-text-secondary)' }}>{edu.institution}</p>
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-bold"
              style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-badge-text)' }}
            >
              {edu.score}
            </span>
          </div>
        ))}
      </div>

      {/* Theses */}
      {data.theses?.length > 0 && (
        <div className="mt-16">
          <h3 className="text-lg md:text-2xl font-bold mb-8" style={{ color: 'var(--color-text)' }}>
            Academic Theses & Dissertations
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data.theses.map((thesis, i) => (
              <div
                key={i}
                className="rounded-xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
                  >
                    {thesis.degree}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{thesis.period}</span>
                </div>
                <h4 className="font-semibold text-sm md:text-base mb-3" style={{ color: 'var(--color-text)' }}>{thesis.title}</h4>
                <p className="text-xs md:text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{thesis.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
