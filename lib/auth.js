const {Router} = require("express");
const passport = require("passport");
const {Strategy} = require("passport-google-oauth20");

const users = new Map();

/**
 * Create middleware to authenticate users using Google OAuth.
 * @param {object} options
 * @param {string} options.googleIdent
 * @param {string} options.googleSecret
 * @param {AsyncStorage} options.userdb
 * @returns {function}
 */
function middleware({googleIdent, googleSecret, userdb}) {
    const router = Router();

    passport.use(new Strategy({
        clientID: googleIdent,
        clientSecret: googleSecret,
        callbackURL: "https://remer.us/auth/google"
    }, (access, refresh, profile, done) => {
        const {id} = profile;
        const name = profile.name.givenName;
        const byline = profile.displayName;
        const user = {id, name, byline, oauth: profile};

        userdb.setItem(id, user).then(() => done(null, user));
    }));

    passport.deserializeUser((id, done) => {
        userdb.getItem(id).then(user => done(null, user));
    });

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    router.use(passport.initialize());
    router.use(passport.session());

    router.get("/login/google", passport.authenticate("google", {
        scope: ["profile"]
    }));

    router.get("/auth/google", passport.authenticate("google", {
        failureRedirect: "/login",
        session: true
    }), (req, res) => {
        res.redirect("/");
    });

    return router;
}

/**
 * Create middleware to reject requests for unauthenticated users.
 * @returns {function}
 */
function authed() {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401);
            res.set("WWW-Authenticate", "Bearer");
            next("route");
        } else {
            next();
        }
    }
}

module.exports = {middleware, authed};
