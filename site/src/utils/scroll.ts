export const scrollToSection = (id: string) => {
  if (!id.startsWith('#') || id.length < 2) {
    return;
  }

  const target = document.querySelector(id);
  if (!target) {
    return;
  }

  const y = target.getBoundingClientRect().top + window.scrollY - 70;
  window.scrollTo({ top: y, behavior: 'smooth' });
};
