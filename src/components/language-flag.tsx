export function LanguageFlag({ country }: { country: "br" | "pt" | "us" | "gb" }) {
  return (
    <svg viewBox="0 0 30 20" className="language-flag" aria-hidden="true" focusable="false">
      {country === "br" ? (
        <>
          <path fill="#009739" d="M0 0h30v20H0z" />
          <path fill="#ffdf00" d="m15 2 12 8-12 8L3 10z" />
          <circle cx="15" cy="10" r="5" fill="#012169" />
          <path d="M10.3 8.5q5-1 9.2 3" fill="none" stroke="#fff" strokeWidth="1" />
        </>
      ) : country === "pt" ? (
        <>
          <path fill="#da291c" d="M0 0h30v20H0z" />
          <path fill="#046a38" d="M0 0h12v20H0z" />
          <circle cx="12" cy="10" r="4.5" fill="none" stroke="#ffcd00" strokeWidth="1.2" />
          <path fill="#fff" stroke="#da291c" strokeWidth="1.2" d="M9.5 6.5h5v5q-2.5 4-5 0z" />
          <path fill="#003399" d="M11 8h2v3h-2z" />
        </>
      ) : country === "us" ? (
        <>
          <path fill="#fff" d="M0 0h30v20H0z" />
          {Array.from({ length: 7 }, (_, index) => <path key={index} fill="#b31942" d={`M0 ${index * 40 / 13}h30v${20 / 13}H0z`} />)}
          <path fill="#0a3161" d="M0 0h12v10.77H0z" />
          {Array.from({ length: 9 }, (_, row) => Array.from({ length: row % 2 ? 5 : 6 }, (_, col) => (
            <circle key={`${row}-${col}`} cx={1 + col * 2 + (row % 2)} cy={1 + row * 1.1} r="0.35" fill="#fff" />
          )))}
        </>
      ) : (
        <>
          <path fill="#012169" d="M0 0h30v20H0z" />
          <path stroke="#fff" strokeWidth="4" d="m0 0 30 20M30 0 0 20" />
          <path stroke="#c8102e" strokeWidth="1.5" d="m0 0 30 20M30 0 0 20" />
          <path stroke="#fff" strokeWidth="6" d="M15 0v20M0 10h30" />
          <path stroke="#c8102e" strokeWidth="3.5" d="M15 0v20M0 10h30" />
        </>
      )}
    </svg>
  );
}
