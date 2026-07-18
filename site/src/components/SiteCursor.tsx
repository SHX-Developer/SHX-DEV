import { useEffect, useRef } from 'react';

const interactiveSelector = [
  'a',
  'button',
  '[role="button"]',
  '.card',
  '.project-preview',
  '.hero-showcase',
  'img',
].join(', ');

export const SiteCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const glow = glowRef.current;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    if (!cursor || !glow || !finePointer.matches) return;

    const root = document.documentElement;
    root.classList.add('has-site-cursor');

    const handlePointerMove = (event: PointerEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      glow.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursor.classList.add('is-visible');
      glow.classList.add('is-visible');

      const target = event.target instanceof Element ? event.target : null;
      cursor.classList.toggle('is-active', Boolean(target?.closest(interactiveSelector)));
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) {
        cursor.classList.remove('is-visible', 'is-active');
        glow.classList.remove('is-visible');
      }
    };

    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerout', handlePointerOut, { passive: true });

    return () => {
      root.classList.remove('has-site-cursor');
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerout', handlePointerOut);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="site-cursor-glow" aria-hidden="true" />
      <div ref={cursorRef} className="site-cursor" aria-hidden="true" />
    </>
  );
};
