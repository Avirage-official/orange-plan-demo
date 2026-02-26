'use client';

import { useEffect, useRef, useState } from 'react';

interface Stat {
  label: string;
  value: number;
  suffix: string;
}

const stats: Stat[] = [
  { label: 'of invoices processed within 1 business day', value: 98.2, suffix: '%' },
  { label: 'of payments made same-day', value: 99.8, suffix: '%' },
  { label: 'payment retries', value: 0, suffix: '' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateValue(value, suffix);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value, suffix]);

  function animateValue(target: number, sfx: string) {
    const duration = 1500;
    const start = performance.now();
    const isZero = target === 0;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      if (isZero) {
        setDisplay('0');
      } else {
        const current = eased * target;
        setDisplay(
          Number.isInteger(target)
            ? Math.round(current).toString()
            : current.toFixed(1)
        );
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplay(isZero ? '0' : Number.isInteger(target) ? target.toString() : target.toFixed(1));
      }
    }

    requestAnimationFrame(tick);
  }

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-gray-900 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
          Trusted Performance
        </h2>
        <p className="mt-2 text-center text-gray-400">
          Key metrics that demonstrate reliability
        </p>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-extrabold text-orange-400 sm:text-5xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-3 text-sm text-gray-300 leading-relaxed">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
