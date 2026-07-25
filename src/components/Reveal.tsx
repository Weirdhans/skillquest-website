'use client';

import {motion, useReducedMotion} from 'framer-motion';
import type {ReactNode} from 'react';

// Motion primitives, isolated as client leaves so the marketing pages themselves
// stay server components.
//
// Every animation here has one job:
//   Reveal  - marks where a new section begins as you scroll into it
//   Stagger - communicates reading order in the hero (headline, then sub, then CTAs)
//
// Both collapse to static under prefers-reduced-motion.

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
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : {opacity: 0, y: 24}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.25}}
      transition={{duration: 0.6, delay, ease: EASE}}
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
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : 'hidden'}
      animate="visible"
      variants={{
        hidden: {},
        visible: {transition: {staggerChildren: gap}}
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
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? {} : {opacity: 0, y: 20},
        visible: {opacity: 1, y: 0, transition: {duration: 0.65, ease: EASE}}
      }}
    >
      {children}
    </motion.div>
  );
}
