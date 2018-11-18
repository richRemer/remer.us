import resource from "./model/resource.js";
import property from "./model/property.js";
import signal from "./model/signal.js";

const face = document.getElementById("face");
const welcome = document.getElementById("welcome");
const login = document.querySelector("[data-icon='login']");
const logout = document.querySelector("[data-icon='logout']");
const user = resource("/me");
const userStatus = property(user, "status");

face.addEventListener("click", () => {
    welcome[welcome.paused ? "play" : "pause"]();
    if (welcome.paused) welcome.currentTime = 0;
});

signal(userStatus, status => {
    switch (status) {
        case 200:
            login.classList.add("hide");
            logout.classList.remove("hide");
            break;
        case 401:
            logout.classList.add("hide");
            login.classList.remove("hide");
            break;
        default:
            console.error(`unexpected status ${status}`);
    }
});
