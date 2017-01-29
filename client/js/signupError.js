function getErrorMessage(message) {
    if (message.match(/invalid email address/)) {
        return "It looks like your email address is invalid. Please try again!"
    } 
    if (message.match(/\`name\` is required/)) {
        return "Please make sure you've entered your name!"
    }
    if (message.match(/MissingUsernameError/)) {
        return "Please make sure you've entered your email address!"
    }
    if (message.match(/MissingPasswordError/)) {
        return "Please make sure you've entered your password!"
    }
    if (message.match(/MissingPasswordError/)) {
        return "Please make sure you've entered your password!"
    }
    if (message.match(/UserExistsError/)) {
        return "Looks like you're already registered. Try logging in!"
    }
    return "Unknown error."
}

export default getErrorMessage;