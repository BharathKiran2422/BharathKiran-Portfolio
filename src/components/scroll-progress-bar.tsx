
'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * A scroll progress bar that appears at the top of the page.
 * It visually indicates the user's scroll position on the current page.
 * @returns {JSX.Element} A motion div representing the progress bar.
 */
const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgressBar;
