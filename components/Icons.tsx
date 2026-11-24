export function IconPhone({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
export function IconMail({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" />
    </svg>
  );
}
export function IconPin({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
export function IconDrop({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.5s6.5 7 6.5 12a6.5 6.5 0 1 1-13 0c0-5 6.5-12 6.5-12z" />
    </svg>
  );
}
export function IconCheck({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
export function IconClock({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
export function IconChevron({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
export function IconArrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
export function IconMenu({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
export function IconShieldLike({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 3 6v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V6l-9-4z" />
    </svg>
  );
}
export function IconX({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ---------------- Distinct per-service icons ----------------
   Used in the illustrated card-image panels so each of the 11 services
   gets genuinely different artwork instead of a repeated generic droplet. */

export function IconSiren({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.5s6.5 7 6.5 12a6.5 6.5 0 1 1-13 0c0-5 6.5-12 6.5-12z" opacity="0.35" />
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
export function IconCloudRain({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      <line x1="8" y1="19" x2="8" y2="21" /><line x1="12" y1="19" x2="12" y2="22" /><line x1="16" y1="19" x2="16" y2="21" />
    </svg>
  );
}
export function IconHouseWave({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M6 14c1.5-1 2.5 1 4 0s2.5-1 4 0 2.5-1 4 0" />
    </svg>
  );
}
export function IconPump({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
export function IconFan({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 12c0-3 2-5 5-5s3 2 1 4-4 1-6 1z" />
      <path d="M12 12c3 0 5 2 5 5s-2 3-4 1-1-4-1-6z" />
      <path d="M12 12c0 3-2 5-5 5s-3-2-1-4 4-1 6-1z" />
      <path d="M12 12c-3 0-5-2-5-5s2-3 4-1 1 4 1 6z" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}
export function IconPipeBurst({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9h9v6H2z" />
      <path d="M11 12h5" />
      <path d="M16 9c2 0 3 1.5 3 3s-1 3-3 3" opacity="0.5" />
      <path d="M16 6l1.5 2M19 5l1 2.5M21.5 7l.5 2.5" />
    </svg>
  );
}
export function IconCeilingDrip({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="4" x2="21" y2="4" />
      <path d="M8 4v3M8 10l1 2-1 2" />
      <path d="M16 4v5" />
      <path d="M16 12s1.2 1.3 1.2 2.4a1.2 1.2 0 0 1-2.4 0C14.8 13.3 16 12 16 12z" />
    </svg>
  );
}
export function IconDrainWarning({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="14" r="7" />
      <line x1="7.5" y1="9.5" x2="16.5" y2="18.5" /><line x1="16.5" y1="9.5" x2="7.5" y2="18.5" />
      <line x1="12" y1="2" x2="12" y2="5" /><line x1="7" y1="3" x2="8.2" y2="5.5" /><line x1="17" y1="3" x2="15.8" y2="5.5" />
    </svg>
  );
}
export function IconMoldSpots({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="16.65" y1="16.65" x2="21" y2="21" />
      <circle cx="9" cy="9" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="13" cy="10.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="13" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
export function IconBuilding({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1m4 0h1m-6 4h1m4 0h1m-6 4h1m4 0h1" />
    </svg>
  );
}
export function IconDocShield({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M18 14v3.5c0 2-1.5 3-3 3.5-1.5-.5-3-1.5-3-3.5V14l3-1.2 3 1.2z" />
    </svg>
  );
}
