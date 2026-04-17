const WHATSAPP_NUMBER = "";
const WHATSAPP_MESSAGE =
  "Quero receber minhas prévias do Nuance Studio e entender os pacotes.";

const whatsappLinks = document.querySelectorAll("[data-whatsapp-link]");

const getWhatsappHref = (fallbackTarget) => {
  const normalizedNumber = WHATSAPP_NUMBER.replace(/\D/g, "");

  if (!normalizedNumber) {
    return fallbackTarget;
  }

  return `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
};

whatsappLinks.forEach((link) => {
  const fallbackTarget = link.getAttribute("href") || "#top";
  const whatsappHref = getWhatsappHref(fallbackTarget);

  link.setAttribute("href", whatsappHref);

  if (whatsappHref.startsWith("https://")) {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noreferrer");
  }
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const parallaxItems = document.querySelectorAll("[data-parallax-speed]");

if (!prefersReducedMotion && parallaxItems.length > 0) {
  let ticking = false;

  const updateParallax = () => {
    const scrollY = window.scrollY;

    parallaxItems.forEach((item) => {
      const speed = Number(item.getAttribute("data-parallax-speed")) || 0;
      const offset = Math.round(scrollY * speed);

      item.style.transform = `translate3d(0, ${offset}px, 0)`;
    });

    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(updateParallax);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  updateParallax();
}
