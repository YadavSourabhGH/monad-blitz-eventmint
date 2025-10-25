export const Logo = ({ className = "w-12 h-12" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shield Shape - Solid Purple */}
      <path
        d="M200 50 L320 100 L320 220 Q320 300 200 350 Q80 300 80 220 L80 100 Z"
        fill="#7C3AED"
        opacity="0.95"
      />
      
      {/* Geometric Pattern Overlay - Cyan accents */}
      <path
        d="M200 50 L260 75 L200 100 L140 75 Z"
        fill="#00D4FF"
        opacity="0.3"
      />
      <path
        d="M260 75 L320 100 L260 150 Z"
        fill="#00D4FF"
        opacity="0.2"
      />
      <path
        d="M140 75 L80 100 L140 150 Z"
        fill="#00D4FF"
        opacity="0.2"
      />
      
      {/* Ticket Icon - White */}
      <g transform="translate(200, 120)">
        <rect
          x="-40"
          y="-20"
          width="80"
          height="40"
          rx="6"
          fill="#FFFFFF"
        />
        <rect x="-35" y="-15" width="20" height="30" fill="#7C3AED" opacity="0.2" />
        <rect x="15" y="-15" width="20" height="30" fill="#7C3AED" opacity="0.2" />
        <line x1="-10" y1="-20" x2="-10" y2="20" stroke="#7C3AED" strokeWidth="2" strokeDasharray="4 4" />
        <line x1="10" y1="-20" x2="10" y2="20" stroke="#7C3AED" strokeWidth="2" strokeDasharray="4 4" />
      </g>
      
      {/* EM Letters - White */}
      <text
        x="200"
        y="200"
        fontSize="80"
        fontWeight="bold"
        fill="white"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
      >
        EM
      </text>
      
      {/* Connection Nodes at Bottom - Cyan */}
      <g transform="translate(200, 300)">
        {/* Left nodes */}
        <circle cx="-60" cy="0" r="6" fill="#00D4FF" />
        <circle cx="-40" cy="15" r="5" fill="#00D4FF" />
        <circle cx="-20" cy="25" r="4" fill="#00D4FF" />
        
        {/* Center node */}
        <circle cx="0" cy="30" r="7" fill="#00D4FF" />
        
        {/* Right nodes */}
        <circle cx="20" cy="25" r="4" fill="#00D4FF" />
        <circle cx="40" cy="15" r="5" fill="#00D4FF" />
        <circle cx="60" cy="0" r="6" fill="#00D4FF" />
        
        {/* Connection lines - Cyan */}
        <line x1="-60" y1="0" x2="0" y2="30" stroke="#00D4FF" strokeWidth="2" opacity="0.5" />
        <line x1="-40" y1="15" x2="0" y2="30" stroke="#00D4FF" strokeWidth="2" opacity="0.5" />
        <line x1="-20" y1="25" x2="0" y2="30" stroke="#00D4FF" strokeWidth="2" opacity="0.5" />
        <line x1="20" y1="25" x2="0" y2="30" stroke="#00D4FF" strokeWidth="2" opacity="0.5" />
        <line x1="40" y1="15" x2="0" y2="30" stroke="#00D4FF" strokeWidth="2" opacity="0.5" />
        <line x1="60" y1="0" x2="0" y2="30" stroke="#00D4FF" strokeWidth="2" opacity="0.5" />
      </g>
    </svg>
  );
};
