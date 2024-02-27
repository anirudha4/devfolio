exports.getStrippedUser = (user) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}