import { useEffect } from "react";

export default function WaveBackground() {
  useEffect(() => {
    const handleMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      document.body.style.background = `
        radial-gradient(
          circle at ${x * 100}% ${y * 100}%,
          #0f2027,
          #203a43,
          #2c5364
        )
      `;
    };

    window.addEventListener("mousemove", handleMove);

    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return null;
}