const face = document.getElementById("face");
const welcome = document.getElementById("welcome");

face.addEventListener("click", () => {
    welcome[welcome.paused ? "play" : "pause"]();
    if (welcome.paused) welcome.currentTime = 0;
});
