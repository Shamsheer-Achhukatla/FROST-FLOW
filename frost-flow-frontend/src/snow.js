export function spawnIceParticles(){
  for(let i=0;i<15;i++){
    let flake=document.createElement("div");
    flake.className="flake";
    flake.style.left=Math.random()*100+"vw";
    flake.style.animationDuration=(2+Math.random()*3)+"s";
    document.body.appendChild(flake);
    setTimeout(()=>flake.remove(),5000);
  }
}
