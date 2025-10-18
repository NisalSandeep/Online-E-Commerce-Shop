const User = require('../models/user.model');
const authUtil = require('../util/authentication');
const validation = require('../util/validation');
const sessionFlash = require('../util/session-flash');


function getSignup(req, res, next) {
    let sessionData = sessionFlash.getSessionData(req);

    if(!sessionData){
        sessionData = {
            email: '',
            confirmEmail: '',
            password: '',
            fullname: '',
            street: '',
            postal: '',
            city: ''
        }
    }

    res.render('customer/auth/signup', {inputData: sessionData}); //Relative path to views folder (ejs configured in app.js)
}

async function signup(req, res, next) {
    const enteredData = {
        email: req.body.email,
        confirmEmail: req.body['confirm-email'],
        password: req.body.password,
        fullname: req.body.fullname,
        street: req.body.street,
        postal: req.body.postal,
        city: req.body.city
    }


    if (
        !validation.userDetailsArevalid(
            req.body.email,
            req.body.password,
            req.body.fullname,
            req.body.street,
            req.body.postal,
            req.body.city
        ) || !validation.emailIsConfirmed(req.body.email, req.body['confirm-email'])
    ) {
        sessionFlash.flashDataToSession(req, {
            errorMessage: 'Please check your input. Password must be at least 6 characters long and postal code must be 5 characters long.',
            ...enteredData
        }, function () {
            res.redirect('/signup');
        })
        return;

    }
    const user = new User(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.postal,
        req.body.city
    );

    try {
        const existsAlready = await user.existsAlready();

        if (existsAlready) {
            sessionFlash.flashDataToSession(req, {
                errorMessage: 'User exists already! Try logging in instead.',
                ...enteredData

            }, function () {
                res.redirect('/signup');
            })

            return;
        }
        await user.signup();
    } catch (err) {
        next(err); // Default error handler in app.js will handle it
        return;
    }

    sessionFlash.flashDataToSession(req, {
        successMessage: 'Account created successfully! Please login to continue.'
    }, function () {
        res.redirect('/login');
    });
}


function getLogin(req, res, next) {
    let sessionData = sessionFlash.getSessionData(req);

    if(!sessionData){
        sessionData = {
            email: '',
            password: ''
        }
    }

    res.render('customer/auth/login', {inputData: sessionData});
}

async function login(req, res) {
    const user = new User(req.body.email, req.body.password);

    let exisitingUser;

    try {
        exisitingUser = await user.getUserWithSameEmail();
    } catch (err) {
        next(err);
        return;
    }
    const sessionErrorData = {

        errorMessage: 'Invalid email or password.',
        email: user.email,
        password: user.password

    };

    if (!exisitingUser) {
        sessionFlash.flashDataToSession(req, sessionErrorData, function () {
            res.redirect('/login');
        })

        return;
    }

    const passwordIsCorrect = await user.hashMatchingPassword(exisitingUser.password);

    if (!passwordIsCorrect) {
        sessionFlash.flashDataToSession(req, sessionErrorData, function () {
            res.redirect('/login');
        })
        return;
    }

    authUtil.createUserSession(req, exisitingUser, function () {
        res.redirect('/')
    });




}

function logout(req, res) {
    authUtil.destroyUserAuthSession(req);
    res.redirect('/login');
}

module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    signup: signup,
    login: login,
    logout: logout
};