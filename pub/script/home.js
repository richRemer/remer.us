import apply from "./fn/apply.js";
import {one as selectOne} from "./dom/select.js";
import click from "./dom/click.js";
import resource from "./model/resource.js";
import property from "./model/property.js";
import signal from "./model/signal.js";
import hide from "./view/hide.js";
import show from "./view/show.js";
import stopToggle from "./view/media/stop-toggle.js";

const select = apply(selectOne, 2)(document);
const loggedIn = property(resource("/me"), "success");

click(select("#face"), stopToggle(select("#welcome")));

signal(loggedIn, hide(select("[data-icon='login']")));
signal(loggedIn, show(select("[data-icon='logout']")));
