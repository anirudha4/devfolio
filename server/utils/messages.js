exports.AUTH_MESSAGES = {
    REQUIRED: 'Please fill all fields',
    REGISTERED: 'User registered successfully',
    USER_ALREADY_EXISTS: (email) => `User with email ${email} already exists`,
    INVALID_TOKEN: 'Invalid token',
    INVALID_EMAIL: 'Invalid Email',
    INVALID_PASSWORD: 'Invalid password',
    INVALID_EMAIL_OR_PASSWORD: 'Invalid email or password',
    USER_LOGGED_IN: name => `Welcome again! ${name}`,
    USER_NOT_FOUND: 'User not found',
    NO_TOKEN_PRESENT_IN_REQUEST_HEADERS: 'No token found in request headers',
    USER_NOT_ADMIN: 'Unauthorized route access. No admin rights',
    USER_NOT_VERIFIED: 'User not verified, Please verify your email',
    USER_FOUND: 'Session Restored.',
}

exports.PORTFOLIO_MESSAGES = {
    REQUIRED: 'Please fill all fields',
    CREATE_SUCCESS: 'Portfolio created successfully',
}
exports.PROJECT_MESSAGES = {
    REQUIRED: 'Please fill all fields',
    CREATE_SUCCESS: 'Project created successfully',
}
exports.EXPERIENCE_MESSAGES = {
    REQUIRED: 'Please fill all fields',
    CREATE_SUCCESS: 'Experience created successfully',
}