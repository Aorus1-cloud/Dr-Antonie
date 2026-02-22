import React from "react";
import { useContextCursor, type ContextCursorProps } from "./useContextCursor";

const cursorStyles = `
:root {
  --main-cursor-clr: rgba(0, 0, 0, 0.2);
  --main-cursor-hover-clr: rgba(0, 0, 0, 0.07);
  --ghost-shadow: 0 7px 15px rgba(0, 0, 0, 0.14);
}

.c-cursor {
  position: fixed;
  z-index: 9999;
  pointer-events: none;
  border-radius: 200px;
  background-color: var(--main-cursor-clr);
  transition: background-color 0.2s ease-in-out;
}

.c-cursor_active {
  background-color: var(--main-cursor-hover-clr);
}

.c-cursor-lift_active {
  background-color: rgba(0, 0, 0, 0);
}
`;

export const ContextCursor: React.FC<ContextCursorProps> = (props) => {
  const { radius = 20 } = props;
  const cursorRef = useContextCursor(props);

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
