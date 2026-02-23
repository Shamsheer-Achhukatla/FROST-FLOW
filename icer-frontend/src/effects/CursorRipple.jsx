import { useEffect } from "react";

export default function CursorRipple() {
  useEffect(() => {
    const cursor = document.createElement("div");

    cursor.style.position = "fixed";
    cursor.style.width = "2px";
    cursor.style.height = "5px";
    cursor.style.borderRadius = "5%";
    cursor.style.pointerEvents = "none";
    cursor.style.background = "rgba(0,255,255,0.25)";
    cursor.style.boxShadow = "0 0 2px cyan";
    cursor.style.transform = "translate(-50%, -50%)";
    cursor.style.transition = "transform 0.08s ease-out";
    cursor.style.zIndex = "9999";

    document.body.appendChild(cursor);

    const move = (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      document.body.removeChild(cursor);
    };
  }, []);

  return null;
}