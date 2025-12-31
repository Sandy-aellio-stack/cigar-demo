import { useEffect, useRef } from "react";

const CigarCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("ontouchstart" in window) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let x = 0, y = 0;
    let tx = 0, ty = 0;
    let raf: number;

    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    document.addEventListener("mousemove", move);

    const loop = () => {
      x += (tx - x) * 0.15;
      y += (ty - y) * 0.15;

      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;

      raf = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      document.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed z-[9999] w-20 h-10 bg-no-repeat bg-contain"
      style={{
        backgroundImage: "url('/cursor/cigar.png')",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default CigarCursor;
