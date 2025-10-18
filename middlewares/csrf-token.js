function addCsrfToken(req, res, next) {
    res.locals.csrfToken = req.csrfToken(); //available in views as csrfToken
    next();
}

module.exports = addCsrfToken;