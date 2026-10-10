import type { BlogCategory } from '@/content/blog';

const PATHS: Record<BlogCategory, JSX.Element> = {
  web: <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>,
  mobile: <><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M11 18h2" /></>,
  marketing: <path d="M3 11v2a1 1 0 001 1h2l5 4V6L6 10H4a1 1 0 00-1 1zM16 8a5 5 0 010 8M19 5a9 9 0 010 14" />,
  automation: <><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.2 4.2l2.8 2.8M17 17l2.8 2.8M1 12h4M19 12h4M4.2 19.8L7 17M17 7l2.8-2.8" /></>,
  seo: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3M8 11l2 2 4-4" /></>,
};

export default function CategoryIcon({ category, size = 24 }: { category: BlogCategory; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PATHS[category]}
    </svg>
  );
}
