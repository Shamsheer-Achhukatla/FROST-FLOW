import { useEffect } from "react";

export default function Snowfall() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.id = "snow-canvas";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let snowflakes = [];

    for (let i = 0; i < 150; i++) {
      snowflakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 4 + 1,
        d: Math.random() + 1
      });
    }

    function drawSnow() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "white";
      ctx.beginPath();

      for (let i = 0; i < snowflakes.length; i++) {
        let f = snowflakes[i];
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
      }

      ctx.fill();
      moveSnow();
    }

    let angle = 0;

    function moveSnow() {
      angle += 0.01;
      for (let i = 0; i < snowflakes.length; i++) {
        let f = snowflakes[i];
        f.y += Math.pow(f.d, 2) + 1;
        f.x += Math.sin(angle) * 2;

        if (f.y > height) {
          snowflakes[i] = {
            x: Math.random() * width,
            y: 0,
            r: f.r,
            d: f.d
          };
        }
      }
    }

    const interval = setInterval(drawSnow, 33);

    return () => {
      clearInterval(interval);
      document.body.removeChild(canvas);
    };
  }, []);

  return null;
}