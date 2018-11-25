const https = require("https");
const express = require("express");
const session = require("express-session");
const Redis = require("redis");
const tlsopt = require("tlsopt");
const {STATUS_CODES} = require("http");
const cookieParser = require("cookie-parser");
const auth = require("./lib/auth");
const Storage = require("./lib/redis-storage");
const redirect = require("./lib/redirect");

const website = express();
const server = https.createServer(tlsopt.readSync(), website);
const port = process.env.LISTEN_PORT || 443;
const secret = process.env.SERVER_SECRET;
const googleIdent = process.env.GOOGLE_ID;
const googleSecret = process.env.GOOGLE_SECRET;
const redis = Redis.createClient(process.env.REDIS_ENDPOINT);
const userdb = Storage(redis, "USER:");
const docdb = Storage(redis, "DOC:");
const resave = false;
const saveUninitialized = false;

server.listen(port, () => {
    const {address, port} = server.address();
    console.log(`listening on ${address}:${port}`);
});

website.set("query parser", "simple");

website.use(cookieParser());
website.use(session({secret, resave, saveUninitialized}));
website.use(auth.middleware({googleIdent, googleSecret, userdb}));
website.use(express.static("srv", {maxage: "1d"}));

website.get(["", "/", "/home"], redirect("/home.html"));

website.get("/me", auth.authed(), (req, res) => {
    res.json(req.user);
});

website.get("/login", (req, res) => {
    res.redirect("/login/google");
});

website.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

website.use((err, req, res, next) => {
    // assume error was handled if status was set
    if (res.statusCode < 400) {
        console.error(process.env.DEBUG ? err.stack : err.message);
        res.status(500);
    }

    next();
});

website.use((req, res, next) => {
    if (res.statusCode === 200) res.status(404);

    if ([401, 403, 404, 500].includes(res.statusCode)) {
        res.sendFile(`${__dirname}/srv/${res.statusCode}.html`);
    } else {
        res.send(STATUS_CODES[res.statusCode]);
    }
});
