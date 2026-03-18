import { motion } from 'motion/react';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" />
        <circle cx="16" cy="12" r="4" fill="currentColor" />
        <path
          d="M10 20 Q16 24 22 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M12 16 L14 15 M18 15 L20 16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </motion.svg>
      <span className="tracking-tight" style={{ letterSpacing: '0.05em' }}>
        COSMETICLAB
      </span>
    </div>
  );
}
