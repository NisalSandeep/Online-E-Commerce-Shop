function handleError(error, req, res, next) { // whenever the other middlwares or things fail this will be called
    console.error(error);

    if(error.code === 404) {
        return res.status(404).render('shared/404'); 
    }
    res.status(500).render('shared/500');
}

module.exports = handleError;