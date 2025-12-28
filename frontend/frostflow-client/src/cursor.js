document.addEventListener("mousemove", (e) => {
  const bubble = document.createElement("div");
  bubble.className = "cursor-bubble";
  bubble.style.left = e.pageX + "px";
  bubble.style.top = e.pageY + "px";
  document.body.appendChild(bubble);
  setTimeout(() => bubble.remove(), 400);
});
