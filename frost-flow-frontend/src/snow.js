let snowRunning = false;

export function spawnIceParticles() {
  if (typeof document === "undefined" || snowRunning) return;

  snowRunning = true;

  const createFlake = () => {
    const flake = document.createElement("div");
    flake.className = "flake";

    // random horizontal position
    flake.style.left = Math.random() * 100 + "vw";

    // random size
    const size = Math.random() * 6 + 4;
    flake.style.width = size + "px";
    flake.style.height = size + "px";

    // random fall duration
    flake.style.animationDuration = (4 + Math.random() * 6) + "s";

    // slight drift
    flake.style.opacity = Math.random();

    document.body.appendChild(flake);

    setTimeout(() => {
      flake.remove();
    }, 10000);
  };

  // create flakes periodically (gentle snowfall)
  setInterval(createFlake, 400);
}