import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Section({ title, icon, alt = false, children }) {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const timerRef = useRef(null);

  // Trigger fade-in animation on mount/route change
  useEffect(() => {
    timerRef.current = requestAnimationFrame(() => {
      setVisible(false);
      timerRef.current = requestAnimationFrame(() => {
        setVisible(true);
      });
    });
    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
    };
  }, [location.pathname]);

  return (
    <section
      className="min-h-screen pt-24 pb-20 flex flex-col justify-center items-center w-full transition-all duration-500 ease-out"
      style={{
        backgroundColor: alt ? 'var(--color-bg-alt)' : 'var(--color-bg)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)'
      }}
    >
      <div className="w-full max-w-6xl mx-auto px-6 lg:px-8">
        {title && (
          <div className="flex items-center gap-3 mb-12">
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
