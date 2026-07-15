type ScrollOptions = {
  updateHistory?: boolean;
  behavior?: ScrollBehavior;
};

export const scrollToSection = (
  id: string,
  { updateHistory = true, behavior = 'smooth' }: ScrollOptions = {},
) => {
  if (!id.startsWith('#') || id.length < 2) {
    return;
  }

  const target = document.querySelector(id);
  if (!target) {
    return;
  }

  target.scrollIntoView({ behavior, block: 'start' });

  if (updateHistory && window.location.hash !== id) {
    window.history.pushState(null, '', id);
  }
};
