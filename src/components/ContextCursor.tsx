import React, { useEffect, useState } from "react";
import { useContextCursor, type ContextCursorProps } from "./useContextCursor";

const cursorStyles = `
:root {
  --main-cursor-clr: rgba(0, 0, 0, 0.3);
  --main-cursor-hover-clr: rgba(0, 0, 0, 0.15);
  --ghost-shadow: 0 7px 15px rgba(0, 0, 0, 0.14);
  
  /* Inverted colors for dark backgrounds */
  --main-cursor-clr-inverted: rgba(255, 255, 255, 0.4);
  --main-cursor-hover-clr-inverted: rgba(255, 255, 255, 0.2);
}

.c-cursor {
  position: fixed;
  z-index: 9999;
  pointer-events: none;
  border-radius: 200px;
  background-color: var(--main-cursor-clr);
  transition: background-color 0.2s ease-in-out;
  /* Add border for better visibility */
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.c-cursor_active {
  background-color: var(--main-cursor-hover-clr);
}

.c-cursor-lift_active {
  background-color: rgba(0, 0, 0, 0);
  border-color: rgba(255, 255, 255, 0.5);
}

/* Inverted cursor for dark sections */
.c-cursor-inverted {
  background-color: var(--main-cursor-clr-inverted) !important;
  border-color: rgba(0, 0, 0, 0.3) !important;
}

.c-cursor-inverted.c-cursor_active {
  background-color: var(--main-cursor-hover-clr-inverted) !important;
}

.c-cursor-inverted.c-cursor-lift_active {
  background-color: rgba(255, 255, 255, 0) !important;
  border-color: rgba(0, 0, 0, 0.5) !important;
}
`;

export const ContextCursor: React.FC<ContextCursorProps> = (props) => {
  const { radius = 20 } = props;
  const cursorRef = useContextCursor(props);
  const [isInverted, setIsInverted] = useState(false);

  useEffect(() => {
    const checkBackground = (e: MouseEvent) => {
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (!element) return;

      // Check if cursor is over dark background
      const computedStyle = window.getComputedStyle(element);
      const bgColor = computedStyle.backgroundColor;
      
      // Parse RGB values
      const rgb = bgColor.match(/\d+/g);
      if (rgb && rgb.length >= 3) {
        const [r, g, b] = rgb.map(Number);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        
        // If background is dark (brightness < 128), invert cursor
        const shouldInvert = brightness < 128;
        
        if (shouldInvert !== isInverted) {
          setIsInverted(shouldInvert);
          if (cursorRef.current) {
            if (shouldInvert) {
              cursorRef.current.classList.add("c-cursor-inverted");
            } else {
              cursorRef.current.classList.remove("c-cursor-inverted");
            }
          }
        }
      }
    };

    document.addEventListener("mousemove", checkBackground);
    return () => document.removeEventListener("mousemove", checkBackground);
  }, [isInverted, cursorRef]);

  return (
    <>
      <style>{cursorStyles}</style>
      <div
        ref={cursorRef}
        className="c-cursor"
        style={{
          transform: "translate(-200px, -200px)",
          height: `${radius}px`,
          width: `${radius}px`,
        }}
      />
    </>
  );
};
