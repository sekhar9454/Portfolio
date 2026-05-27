import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Section({ title, icon, alt = false, children }) {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  // Trigger fade-in animation on mount/route change
  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <section
      className="min-h-screen pt-24 pb-16 flex flex-col justify-center items-center w-full transition-all duration-500 ease-out"
      style={{
        backgroundColor: alt ? 'var(--color-bg-alt)' : 'var(--color-bg)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)'
      }}
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="flex items-center gap-3 mb-10">
            {icon && <span className="text-2xl" style={{ color: 'var(--color-accent)' }}>{icon}</span>}
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--color-text)' }}>
              {title}
            </h2>
            <div className="flex-1 h-px ml-4" style={{ backgroundColor: 'var(--color-border)' }} />
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
