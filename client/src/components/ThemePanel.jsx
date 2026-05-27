import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaPalette, FaTimes } from 'react-icons/fa';

export default function ThemePanel() {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Panel */}
      <div
        className={`absolute bottom-16 right-0 rounded-2xl p-4 shadow-2xl border transition-all duration-300 ${
          open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-4 pointer-events-none'
        }`}
        style={{
          backgroundColor: 'var(--color-card)',
          borderColor: 'var(--color-border)',
          minWidth: '200px'
        }}
      >
        <p className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
          Choose Theme
        </p>
        <div className="flex flex-col gap-2">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                theme === t.id ? 'ring-2 ring-offset-2' : 'hover:opacity-80'
              }`}
              style={{
                backgroundColor: theme === t.id ? t.color + '15' : 'transparent',
                ringColor: t.color
              }}
            >
              <span
                className="w-6 h-6 rounded-full border-2 border-white shadow-md flex-shrink-0"
                style={{ backgroundColor: t.color }}
              />
              <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                {t.name}
              </span>
              {theme === t.id && (
                <span className="ml-auto text-xs" style={{ color: 'var(--color-accent)' }}>✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
        style={{
          background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))`,
          color: 'white'
        }}
      >
        {open ? <FaTimes size={20} /> : <FaPalette size={20} />}
      </button>
    </div>
  );
}
