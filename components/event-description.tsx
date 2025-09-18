"use client";

import { useState } from "react";

export const EventDescription = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <span
        onClick={() => setExpanded(!expanded)}
        className={
          expanded
            ? "" // sin límite → texto completo
            : "line-clamp-2 text-gray-400 text-sm"
        }
      >
        {text}
      </span>
    </div>
  );
};
