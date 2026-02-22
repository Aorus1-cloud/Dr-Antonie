import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

// ---- Types ----
export interface ContextCursorProps {
  radius?: number;
  transitionSpeed?: number;
  parallaxIndex?: number;
  hoverPadding?: number;
}

export type CursorMode = "default" | "noPadding" | "noParallax" | "lift";

const DATA_ATTR = "data-ccursor";

// ---- Utilities ----
function getMoveIndex(
  mousePos: number,
  elPosition: number,
  elDimension: number,
  speed: number
): number {
  return (mousePos - elPosition - elDimension / 2) / speed;
}

function getStyleProp(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name);
}

function elHasMode(el: HTMLElement, mode: string): boolean {
  const val = el.getAttribute(DATA_ATTR);
  if (!val) return false;
  return val.split(" ").includes(mode);
}

// ---- Hook ----
export function useContextCursor(props: ContextCursorProps = {}) {
  const {
    radius = 20,
    transitionSpeed = 0.2,
    parallaxIndex = 10,
    hoverPadding = 6,
  } = props;

  const cursorRef = useRef<HTMLDivElement | null>(null);
  const isHovered = useRef(false);
  const cursorTarget = useRef<HTMLElement | null>(null);

  const parallaxCursor = parallaxIndex;
  const parallaxTarget = parallaxIndex * 1.5;

  // ---- Mouse move handler ----
  const moveCursor = useCallback(
    (e: MouseEvent) => {
      const cursor = cursorRef.current;
      if (!cursor) return;

      if (!isHovered.current) {
        gsap.to(cursor, {
          duration: transitionSpeed,
          x: e.clientX - radius / 2,
          y: e.clientY - radius / 2,
        });
      } else {
        const target = cursorTarget.current;
        if (!target) return;

        const rect = target.getBoundingClientRect();

        // Extract border radius as number (remove 'px' unit)
        const borderRadiusStr = window.getComputedStyle(target).borderRadius;
        const borderRadius = Number(borderRadiusStr.slice(0, -2)) || 0;

        if (elHasMode(target, "lift")) {
          // LIFT mode — float the target, blur the cursor
          gsap.to(target, {
            duration: transitionSpeed,
            x: getMoveIndex(e.clientX, rect.left, target.clientWidth, parallaxTarget),
            y: getMoveIndex(e.clientY, rect.top, target.clientHeight, parallaxTarget),
            scale: 1.1,
            boxShadow: getStyleProp("--ghost-shadow"),
          });
          gsap.to(cursor, {
            duration: transitionSpeed,
            filter: "blur(8px)",
            borderRadius: borderRadius,  // Apply the same border radius to cursor
            x:
              rect.left +
              (e.clientX - rect.left - target.clientWidth / 2) / parallaxCursor,
            y:
              rect.top +
              (e.clientY - rect.top - target.clientHeight / 2) / parallaxCursor,
            // Removed glare effect
          });
        } else {
          // DEFAULT (parallax / snap) mode
          const noPad = elHasMode(target, "noPadding");
          const noPar = elHasMode(target, "noParallax");
          const pad = noPad ? 0 : hoverPadding;

          gsap.to(cursor, {
            duration: transitionSpeed,
            x:
              rect.left -
              pad +
              (noPar
                ? 0
                : (e.clientX - rect.left - target.clientWidth / 2) /
                parallaxCursor),
            y:
              rect.top -
              pad +
              (noPar
                ? 0
                : (e.clientY - rect.top - target.clientHeight / 2) /
                parallaxCursor),
            // Multiply border radius by 1.5 when adding padding (original behavior)
            borderRadius: borderRadius * (noPad ? 1 : 1.5),
            width: target.clientWidth + pad * 2,
            height: target.clientHeight + pad * 2,
          });

          if (!noPar) {
            gsap.to(target, {
              duration: transitionSpeed,
              x: -getMoveIndex(e.clientX, rect.left, target.clientWidth, parallaxTarget),
              y: -getMoveIndex(e.clientY, rect.top, target.clientHeight, parallaxTarget),
            });
          }
        }
      }
    },
    [radius, transitionSpeed, parallaxCursor, parallaxTarget, hoverPadding]
  );

  // ---- Mouse over handler (uses event delegation) ----
  const handleMouseOver = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursor = cursorRef.current;

      const interactive = target.closest(`[${DATA_ATTR}]`) as HTMLElement;

      if (!cursor || !interactive) return;

      isHovered.current = true;
      cursorTarget.current = interactive;

      // DEBUG: Log what we're reading
      const computedStyle = window.getComputedStyle(interactive);
      const borderRadiusStr = computedStyle.borderRadius;
      console.log('Element:', interactive);
      console.log('Border radius string:', borderRadiusStr);
      console.log('Classes:', interactive.className);

      const borderRadius = Number(borderRadiusStr.slice(0, -2)) || 0;
      console.log('Border radius number:', borderRadius);

      if (elHasMode(interactive, "lift")) {
        cursor.classList.add("c-cursor-lift_active");
        gsap.to(cursor, {
          duration: transitionSpeed,
          borderRadius: borderRadius,
          width: interactive.clientWidth,
          height: interactive.clientHeight,
          scale: 1.1,
        });
        console.log('Applied to cursor:', borderRadius);
      } else {
        cursor.classList.add("c-cursor_active");
      }
    },
    [transitionSpeed]
  );

  // ---- Mouse out handler ----
  const handleMouseOut = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursor = cursorRef.current;

      const interactive = target.closest(`[${DATA_ATTR}]`) as HTMLElement;

      if (!cursor || !interactive) return;

      isHovered.current = false;
      cursor.classList.remove("c-cursor_active", "c-cursor-lift_active");

      gsap.to(cursor, {
        duration: transitionSpeed,
        x: e.clientX - radius / 2,
        y: e.clientY - radius / 2,
        width: radius,
        height: radius,
        borderRadius: "100px",
        scale: 1,
        backgroundImage: "none",
        filter: "blur(0px)",
      });

      if (cursorTarget.current) {
        gsap.to(cursorTarget.current, {
          duration: transitionSpeed,
          x: 0,
          y: 0,
          scale: 1,
          boxShadow: "0 7px 15px rgba(0,0,0,0.0)",
        });
      }
    },
    [radius, transitionSpeed]
  );

  // ---- Scroll handler — reset cursor ----
  const handleScroll = useCallback(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    isHovered.current = false;
    cursor.classList.remove("c-cursor_active", "c-cursor-lift_active");

    gsap.to(cursor, {
      duration: transitionSpeed,
      width: radius,
      height: radius,
      borderRadius: "100px",
      scale: 1,
      backgroundImage: "none",
      filter: "blur(0px)",
    });

    if (cursorTarget.current) {
      gsap.to(cursorTarget.current, {
        duration: transitionSpeed,
        x: 0,
        y: 0,
        scale: 1,
        boxShadow: "0 7px 15px rgba(0,0,0,0.0)",
      });
    }
  }, [radius, transitionSpeed]);

  // ---- Attach / detach global listeners ----
  useEffect(() => {
    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("wheel", handleScroll, { passive: true });
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("wheel", handleScroll);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [moveCursor, handleMouseOver, handleMouseOut, handleScroll]);

  return cursorRef;
}
