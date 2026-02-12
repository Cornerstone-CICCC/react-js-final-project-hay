"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLoggedIn = void 0;
//Check to see if the user is already logged in
const checkLoggedIn = (req, res, next) => {
    if (!req.session || !req.session.isLoggedIn || !req.session.email) {
        res.status(401).json({
            message: "You are not allowed to access this.",
        });
        return;
    }
    next();
};
exports.checkLoggedIn = checkLoggedIn;
