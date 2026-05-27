export default function Footer({ data }) {
  return (
    <footer
      className="flex w-full align-middle items-center text-center"
      style={{ backgroundColor: 'var(--color-primary)', color: 'rgba(255,255,255,0.6)' }}
    >
      <div className="flex items-center  justify-center w-full mx-auto px-4">
        <div>
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
      </div>
    </footer>
  );
}
