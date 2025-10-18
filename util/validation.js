function userDetailsArevalid(email, password, name, street, postal, city) {
    if (email && email.includes('@') &&
        password && password.trim().length >= 6 &&
        name && name.trim() !== '' &&
        !street || street.trim() !== '' &&
        !postal || postal.trim() !== '' &&
        !city || city.trim() !== ''
    ) {
        return true;
    }
    return false;
}

function emailIsConfirmed(email, confirmEmail) {
    return email === confirmEmail;
}


module.exports = {
    userDetailsArevalid: userDetailsArevalid,
    emailIsConfirmed: emailIsConfirmed
};

