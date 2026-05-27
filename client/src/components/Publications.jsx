import Section from './Section';
import { FaBookOpen, FaExternalLinkAlt } from 'react-icons/fa';

export default function Publications({ data }) {
  const journals = data?.journalPublications || [];
  const conferences = data?.conferencePublications || [];
  const review = data?.underReview;

  if (!journals.length && !conferences.length) return null;

  return (
    <Section id="publications" title="Publications" icon={<FaBookOpen />} alt>
      {/* Journal Publications */}
      <div className="mb-12">
        <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
          Journal Publications
        </h3>
        <div className="space-y-4">
          {journals.map((pub, i) => (
            <div
              key={i}
              className="rounded-xl p-5 border-l-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                backgroundColor: 'var(--color-card)',
                borderLeftColor: pub.quartile === 'Q1' ? 'var(--color-q1)' : 'var(--color-q2)',
                borderTop: '1px solid var(--color-border)',
                borderRight: '1px solid var(--color-border)',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              <div className="flex items-start gap-4">
                <span
                  className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                  style={{ backgroundColor: pub.quartile === 'Q1' ? 'var(--color-q1)' : 'var(--color-q2)' }}
                >
                  {pub.id}
                </span>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1 leading-snug" style={{ color: 'var(--color-text)' }}>
                    {pub.title}
                  </h4>
                  <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    {pub.journal} ({pub.year})
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-xs font-bold text-white"
                      style={{ backgroundColor: pub.quartile === 'Q1' ? 'var(--color-q1)' : 'var(--color-q2)' }}>
                      {pub.quartile}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-medium"
                      style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-badge-text)' }}>
                      {pub.indexing}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-medium"
                      style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-badge-text)' }}>
                      IF: {pub.impactFactor}
                    </span>
                    {pub.doi && (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-xs font-medium hover:underline"
                        style={{ color: 'var(--color-accent)' }}
                      >
                        <FaExternalLinkAlt size={10} /> DOI
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Under Review */}
      {review && (
        <div
          className="rounded-xl p-5 mb-12 border"
          style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
        >
          <h4 className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
            Under Review / Revision
          </h4>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {review.description}
          </p>
        </div>
      )}

      {/* Conference Publications */}
      <div className="mt-16 md:mt-24">
        <h3 className="text-xl md:text-2xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
          Conference Publications
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {conferences.map((pub, i) => (
            <div
              key={i}
              className="rounded-xl p-5 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                >
                  {pub.id}
                </span>
                <div>
                  <h4 className="font-semibold text-sm mb-1 leading-snug" style={{ color: 'var(--color-text)' }}>
                    {pub.title}
                  </h4>
                  <p className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                    {pub.conference}
                  </p>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 rounded text-xs font-medium"
                      style={{ backgroundColor: 'var(--color-badge-bg)', color: 'var(--color-badge-text)' }}>
                      {pub.role}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-medium"
                      style={{ backgroundColor: 'var(--color-q1)', color: 'white' }}>
                      {pub.status}
                    </span>
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
