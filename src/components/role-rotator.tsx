"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";

export function RoleRotator({ roles }: { roles: readonly string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2800);
    return () => clearInterval(id);
  }, [roles.length]);

  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      {/* Invisible longest role reserves the width so layout never jumps. */}
      <span className="invisible col-start-1 row-start-1" aria-hidden>
        {roles.reduce((a, b) => (b.length > a.length ? b : a))}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={roles[index]}
          className="col-start-1 row-start-1 text-fg"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {roles[index]}
        </m.span>
      </AnimatePresence>
      <span className="sr-only">{roles.join(", ")}</span>
    </span>
  );
}
