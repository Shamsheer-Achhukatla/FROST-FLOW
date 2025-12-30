export function spawnIceParticles(){
  if (typeof document === "undefined") return; // <-- stops Vercel build error

  for(let i=0;i<15;i++){
    const flake = document.createElement("div");
    flake.className = "flake";
    flake.style.left = Math.random()*100+"vw";
    flake.style.animationDuration = (2+Math.random()*3)+"s";
    document.body.appendChild(flake);
    setTimeout(()=>flake.remove(),5000);
  }
}
