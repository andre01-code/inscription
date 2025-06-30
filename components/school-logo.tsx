interface SchoolLogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "full" | "icon"
}

export function SchoolLogo({ className = "", size = "md", variant = "full" }: SchoolLogoProps) {
  const sizes = {
    sm: { width: 40, height: 40 },
    md: { width: 60, height: 60 },
    lg: { width: 100, height: 100 },
    xl: { width: 150, height: 150 },
  }

  const { width, height } = sizes[size]

  return (
    <div className={`inline-flex items-center ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <circle cx="100" cy="100" r="95" fill="#0F172A" />
        <path
          d="M100 190C149.706 190 190 149.706 190 100C190 50.2944 149.706 10 100 10C50.2944 10 10 50.2944 10 100C10 149.706 50.2944 190 100 190Z"
          stroke="#C2410C"
          strokeWidth="3"
        />

        {/* Violin body */}
        <path
          d="M120 150C120 150 140 130 140 100C140 70 120 50 120 50L80 50C80 50 60 70 60 100C60 130 80 150 80 150L120 150Z"
          fill="#1E293B"
          stroke="#C2410C"
          strokeWidth="2"
        />

        {/* Violin neck */}
        <rect x="95" y="30" width="10" height="30" fill="#D1A054" />

        {/* Violin strings */}
        <line x1="85" y1="55" x2="85" y2="145" stroke="#E2E8F0" strokeWidth="1" />
        <line x1="100" y1="55" x2="100" y2="145" stroke="#E2E8F0" strokeWidth="1" />
        <line x1="115" y1="55" x2="115" y2="145" stroke="#E2E8F0" strokeWidth="1" />

        {/* Violin f-holes */}
        <path d="M80 90C80 90 75 95 75 100C75 105 80 110 80 110" stroke="#C2410C" strokeWidth="1.5" />
        <path d="M120 90C120 90 125 95 125 100C125 105 120 110 120 110" stroke="#C2410C" strokeWidth="1.5" />

        {/* Smoke effect */}
        <path
          d="M70 80C70 80 60 70 65 60C70 50 80 55 80 55C80 55 85 45 95 50C105 55 100 65 100 65C100 65 110 60 115 70C120 80 110 85 110 85"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeDasharray="2 2"
          opacity="0.7"
        />
        <path
          d="M130 90C130 90 140 85 138 75C136 65 125 70 125 70C125 70 128 60 120 55C112 50 105 60 105 60"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeDasharray="2 2"
          opacity="0.7"
        />
      </svg>

      {variant === "full" && (
        <div className="ml-3 text-left">
          <div className="text-lg font-bold text-gray-900 leading-tight">École Supérieure</div>
          <div className="text-sm text-gray-600">du Gabon</div>
        </div>
      )}
    </div>
  )
}
