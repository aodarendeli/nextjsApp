'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  target: string;
  duration?: number;
}

export default function CountUp({ target, duration = 1800 }: Props) {
  const [display, setDisplay] = useState('0');
  const ref  = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = target.match(/^([^0-9]*)(\d+)([^0-9]*)$/);
    if (!match) { setDisplay(target); return; }

    const [, prefix, numStr, suffix] = match;
    const num = parseInt(numStr, 10);

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !done.current) {
        done.current = true;
        const startTime = Date.now();
        const tick = () => {
          const progress = Math.min((Date.now() - startTime) / duration, 1);
          const eased    = 1 - Math.pow(1 - progress, 3);
          setDisplay(`${prefix}${Math.round(eased * num)}${suffix}`);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      }
    }, { threshold: 0.4 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{display}</span>;
}
