export default function Footer({ data }) {
  return (
    <footer
      className="w-full py-8"
      style={{ backgroundColor: 'var(--color-primary)', color: 'rgba(255,255,255,0.6)' }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-sm font-medium text-white/80 mb-1">
          {data?.name || 'Dr. Ambairam Muthu Sivakrishna'}
        </p>
        <p className="text-xs">
          {data?.designation}, {data?.department} — {data?.institution}
        </p>
        <p className="text-xs mt-3 text-white/40">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
