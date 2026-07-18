type NavigatorWithPerformanceHints = Navigator & {
  deviceMemory?: number;
  connection?: {
    saveData?: boolean;
  };
};

export const initializePerformanceMode = () => {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;
  const navigatorWithHints = window.navigator as NavigatorWithPerformanceHints;
  const userAgent = navigatorWithHints.userAgent;
  const effectsOverride = new URLSearchParams(window.location.search).get('effects');
  const isAppleDevice = /Macintosh|Mac OS X|iPad|iPhone|iPod/i.test(userAgent);
  const isSafari =
    /Safari/i.test(userAgent) &&
    !/Chrome|Chromium|CriOS|Edg|OPR|Android/i.test(userAgent);
  const hasLimitedCpu =
    typeof navigatorWithHints.hardwareConcurrency === 'number' &&
    navigatorWithHints.hardwareConcurrency <= 6;
  const hasLimitedMemory =
    typeof navigatorWithHints.deviceMemory === 'number' &&
    navigatorWithHints.deviceMemory <= 4;
  const savesData = navigatorWithHints.connection?.saveData === true;
  const shouldUseLiteEffects =
    effectsOverride === 'lite' ||
    (effectsOverride !== 'full' &&
      (isAppleDevice || isSafari || hasLimitedCpu || hasLimitedMemory || savesData));

  root.classList.toggle('performance-lite', shouldUseLiteEffects);
};

export const isPerformanceLite = () =>
  typeof document !== 'undefined' &&
  document.documentElement.classList.contains('performance-lite');
