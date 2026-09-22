'use client';

import {motion} from 'framer-motion';
import type {ReactNode} from 'react';
import {usePrefersReducedMotion} from '@/lib/use-prefers-reduced-motion';

// Motion primitives, isolated as client leaves so the marketing pages themselves
// stay server components.
//
// Every animation here has one job:
//   Reveal  - marks where a new section begins as you scroll into it
//   Stagger - communicates reading order in the hero (headline, then sub, then CTAs)
//
// Both collapse to static under prefers-reduced-motion.
//
// The hidden start state is always rendered, because it is what the server
// sent: switching `initial` on the reduced-motion preference made the client's
// first render disagree with the SSR markup. Reduced motion instead makes the
// transition instant, so nothing moves.

const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{opacity: 0, y: 24}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.25}}
      transition={reduce ? {duration: 0} : {duration: 0.6, delay, ease: EASE}}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  gap = 0.08
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  const reduce = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {transition: {staggerChildren: reduce ? 0 : gap}}
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: {opacity: 0, y: 20},
        visible: {
          opacity: 1,
          y: 0,
          transition: reduce ? {duration: 0} : {duration: 0.65, ease: EASE}
        }
      }}
    >
      {children}
    </motion.div>
  );
}
