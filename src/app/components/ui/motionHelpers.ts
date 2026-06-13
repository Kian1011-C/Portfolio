/**
 * Shared Motion (Framer Motion) helpers for the portfolio.
 * The cubic-bezier ease [0.16, 1, 0.3, 1] must be cast as a tuple
 * to satisfy motion/react's Easing type.
 */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fadeUpTransition = (delay = 0) => ({
  duration: 0.6,
  delay,
  ease: EASE_OUT,
});

export const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: EASE_OUT,
    },
  }),
};
