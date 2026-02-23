import { useEffect } from "react";

export default function WaterRipple() {
  useEffect(() => {
    const createRipple = (e) => {
      const ripple = document.createElement("div");

      ripple.style.position = "fixed";
      ripple.style.left = e.clientX + "px";
      ripple.style.top = e.clientY + "px";
      ripple.style.width = "20px";
      ripple.style.height = "20px";
      ripple.style.border = "2px solid cyan";
      ripple.style.borderRadius = "50%";
      ripple.style.transform = "translate(-50%, -50%)";
      ripple.style.pointerEvents = "none";
      ripple.style.opacity = "0.8";
      ripple.style.zIndex = "9999";
      ripple.style.animation = "waterRipple 0.8s ease-out forwards";

      document.body.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 800);
    };

    window.addEventListener("click", createRipple);

    return () => {
      window.removeEventListener("click", createRipple);
    };
  }, []);

  return null;
}