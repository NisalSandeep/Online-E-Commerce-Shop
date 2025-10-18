function handleError(error, req, res, next) { // whenever the other middlwares or things fail this will be called
    console.error(error);
    res.status(500).render('shared/500');
}

module.exports = handleError;