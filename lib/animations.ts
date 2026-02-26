export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const ANIMATION_DELAY_MS = 150;
