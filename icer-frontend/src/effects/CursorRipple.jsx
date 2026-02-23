import { useEffect } from "react";

export default function CursorRipple() {
  useEffect(() => {
    const ripple = document.createElement("div");

    ripple.style.position = "fixed";
    ripple.style.width = "60px";
    ripple.style.height = "60px";
    ripple.style.borderRadius = "50%";
    ripple.style.pointerEvents = "none";
    ripple.style.background = "rgba(0,255,255,0.4)";
    ripple.style.boxShadow = "0 0 40px cyan, 0 0 80px #00ffff";
    ripple.style.transform = "translate(-50%, -50%)";
    ripple.style.transition = "transform 0.05s ease-out";
    ripple.style.zIndex = "9999";
    ripple.style.mixBlendMode = "screen";

    document.body.appendChild(ripple);

    const move = (e) => {
      ripple.style.left = e.clientX + "px";
      ripple.style.top = e.clientY + "px";
    };

    const jelly = () => {
      const wrapper = document.getElementById("app-wrapper");
      if (!wrapper) return;

      wrapper.classList.add("jelly");

      setTimeout(() => {
        wrapper.classList.remove("jelly");
      }, 1400);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("click", jelly);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", jelly);
      document.body.removeChild(ripple);
    };
  }, []);

  return null;
}