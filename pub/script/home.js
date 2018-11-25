import resource from "./model/resource.js";
import property from "./model/property.js";
import signal from "./model/signal.js";
import hide from "./view/hide.js";
import show from "./view/show.js";

const face = document.getElementById("face");
const welcome = document.getElementById("welcome");
const login = document.querySelector("[data-icon='login']");
const logout = document.querySelector("[data-icon='logout']");
const user = resource("/me");
const loggedIn = property(user, "success");

face.addEventListener("click", () => {
    welcome[welcome.paused ? "play" : "pause"]();
    if (welcome.paused) welcome.currentTime = 0;
});

signal(loggedIn, hide(login));
signal(loggedIn, show(logout));
