import { useEffect, useRef } from "react";
import "./CursorFollower.css";

export default function CursorFollower() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;

    let animationFrame;

    const showCursor = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const hideCursor = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.transform = `
        translate3d(${mouseX}px, ${mouseY}px, 0)
        translate(-50%, -50%)
      `;

      showCursor();
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      ring.style.transform = `
        translate3d(${ringX}px, ${ringY}px, 0)
        translate(-50%, -50%)
      `;

      animationFrame = requestAnimationFrame(animateRing);
    };

    window.addEventListener("mousemove", handleMouseMove);

    document.documentElement.addEventListener(
      "mouseleave",
      hideCursor
    );

    document.documentElement.addEventListener(
      "mouseenter",
      showCursor
    );

    window.addEventListener("blur", hideCursor);

    animateRing();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      document.documentElement.removeEventListener(
        "mouseleave",
        hideCursor
      );

      document.documentElement.removeEventListener(
        "mouseenter",
        showCursor
      );

      window.removeEventListener("blur", hideCursor);

      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}