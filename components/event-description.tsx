"use client";

import { useState } from "react";

export const EventDescription = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <span
        className={
          expanded
            ? "" // sin límite → texto completo
            : "line-clamp-2 text-gray-400 text-sm"
        }
      >
        {text}
      </span>
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
        className="text-cyan-400 text-xs mt-1 hover:underline"
      >
        {expanded ? "-" : "+"}
      </button>
    </div>
  );
};
