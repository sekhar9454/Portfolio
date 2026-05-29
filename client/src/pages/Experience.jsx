import Section from '../components/Section';
import { FaBriefcase } from 'react-icons/fa';

export default function Experience({ data }) {
  if (!data?.experience?.length) return null;

  return (
    <Section id="experience" title="Teaching Experience" icon={<FaBriefcase />}>
      <div className="relative">
        {/* Timeline line - hidden on mobile */}
        <div className="absolute left-[11px] top-0 bottom-0 w-0.5 hidden md:block" style={{ backgroundColor: 'var(--color-accent)' }} />

        <div className="space-y-6">
          {data.experience.map((exp, i) => (
            <div key={i} className="flex relative">
              {/* Timeline dot - hidden on mobile */}
              <div className="hidden md:flex flex-col pt-7 pr-8 z-10 relative">
                <div
                  className="w-[22px] h-[22px] rounded-full border-4 flex-shrink-0"
                  style={{
                    backgroundColor: 'var(--color-card)',
                    borderColor: 'var(--color-accent)'
                  }}
                />
              </div>

              <div
                className="flex-1 rounded-xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
              >
                {/* Accent top bar on mobile instead of timeline */}
                <div className="h-1 rounded-t-xl -mt-6 -mx-6 mb-5 md:hidden" style={{ background: `linear-gradient(90deg, var(--color-primary), var(--color-accent))` }} />

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-base md:text-lg font-bold" style={{ color: 'var(--color-text)' }}>{exp.role}</h3>
                    <p className="text-sm font-medium mt-1" style={{ color: 'var(--color-accent)' }}>{exp.institution}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{exp.department}</p>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap self-start"
                    style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-badge-text)' }}
                  >
                    {exp.period}
                  </span>
                </div>

                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                    Courses Handled
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.courses?.map((course, j) => (
                      <span
                        key={j}
                        className="px-3 py-1.5 rounded-md text-xs font-medium border"
                        style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)', backgroundColor: 'var(--color-bg-alt)' }}
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
