/** Original decorative artwork (no photos) used until real images are uploaded. */

export function Skyline({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 800 360" fill="currentColor" aria-hidden>
      {/* left minaret */}
      <rect x="92" y="96" width="26" height="264" />
      <rect x="86" y="150" width="38" height="10" />
      <rect x="86" y="230" width="38" height="10" />
      <path d="M92 96 Q105 60 118 96 Z" />
      <rect x="103.5" y="40" width="3" height="30" />
      {/* right minaret */}
      <rect x="682" y="96" width="26" height="264" />
      <rect x="676" y="150" width="38" height="10" />
      <rect x="676" y="230" width="38" height="10" />
      <path d="M682 96 Q695 60 708 96 Z" />
      <rect x="693.5" y="40" width="3" height="30" />
      {/* main hall */}
      <rect x="170" y="240" width="460" height="120" />
      <path d="M260 240 C260 140, 540 140, 540 240 Z" />
      <rect x="396" y="110" width="8" height="40" />
      <circle cx="400" cy="104" r="8" />
      {/* side domes */}
      <path d="M180 240 C180 196, 250 196, 250 240 Z" />
      <path d="M550 240 C550 196, 620 196, 620 240 Z" />
      {/* arches cut-outs drawn as lighter overlay */}
      <g fill="rgba(0,0,0,.25)">
        <path d="M220 360 V300 Q240 272 260 300 V360 Z" />
        <path d="M300 360 V296 Q325 262 350 296 V360 Z" />
        <path d="M375 360 V290 Q400 252 425 290 V360 Z" />
        <path d="M450 360 V296 Q475 262 500 296 V360 Z" />
        <path d="M540 360 V300 Q560 272 580 300 V360 Z" />
      </g>
    </svg>
  );
}

export function SeasonArt({ theme }: { theme?: "autumn" | "winter" | "spring" | "night" }) {
  switch (theme) {
    case "autumn":
      return (
        <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden>
          {[[40, 30, "#c4621c"], [90, 18, "#e08a2e"], [150, 34, "#b4471a"], [220, 20, "#d9772b"], [280, 36, "#c4621c"], [60, 80, "#e9a34c"], [260, 92, "#d06a22"], [190, 70, "#f0b65d"]].map(([x, y, c], i) => (
            <ellipse key={i} cx={x as number} cy={y as number} rx="16" ry="9" fill={c as string} opacity=".75" transform={`rotate(${(i * 37) % 90 - 45} ${x} ${y})`} />
          ))}
          <path d="M0 150 Q80 128 160 146 T320 140 V180 H0 Z" fill="#fff" opacity=".55" />
        </svg>
      );
    case "winter":
      return (
        <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden>
          {[30, 70, 115, 200, 250, 295].map((x, i) => (
            <path key={x} d={`M${x} ${60 + (i % 2) * 14} l-22 70 h44 Z`} fill="#3f6e60" opacity={0.25 + (i % 3) * 0.12} />
          ))}
          <rect x="0" y="120" width="320" height="60" fill="#fff" opacity=".6" />
        </svg>
      );
    case "spring":
      return (
        <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <path d="M0 20 Q90 50 170 30 T320 46" stroke="#7a5a44" strokeWidth="3" fill="none" opacity=".5" />
          {[[40, 30], [80, 42], [120, 38], [170, 30], [210, 34], [250, 42], [290, 40], [60, 60], [230, 64]].map(([x, y], i) => (
            <g key={i} opacity=".85">
              {[0, 72, 144, 216, 288].map((r) => (
                <ellipse key={r} cx={x} cy={y - 6} rx="4" ry="7" fill="#f2a3b5" transform={`rotate(${r} ${x} ${y})`} />
              ))}
              <circle cx={x} cy={y} r="2.5" fill="#e8b64a" />
            </g>
          ))}
          <path d="M0 150 Q100 132 180 148 T320 142 V180 H0 Z" fill="#fff" opacity=".6" />
        </svg>
      );
    case "night":
      return (
        <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <circle cx="248" cy="52" r="26" fill="#f3e2b0" />
          <circle cx="260" cy="44" r="24" fill="#16364d" />
          {[[40, 30], [90, 60], [140, 24], [190, 70], [60, 100], [300, 110], [120, 120]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 2 ? 1.6 : 2.2} fill="#fff" opacity=".8" />
          ))}
          <path d="M0 150 Q100 132 180 148 T320 142 V180 H0 Z" fill="#fff" opacity=".12" />
        </svg>
      );
    default:
      return null;
  }
}
