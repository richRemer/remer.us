const face = document.getElementById("face");
const welcome = document.getElementById("welcome");
const login = document.querySelector("[data-icon='login']");
const logout = document.querySelector("[data-icon='logout']");

face.addEventListener("click", () => {
    welcome[welcome.paused ? "play" : "pause"]();
    if (welcome.paused) welcome.currentTime = 0;
});

fetch("/me").then(res => {
    if (res.status === 200) {
        logout.classList.remove("hide");
    } else if (res.status === 401) {
        login.classList.remove("hide");
    } else {
        console.error(`unexpected status ${res.status}`);
    }
}).catch(console.error);
