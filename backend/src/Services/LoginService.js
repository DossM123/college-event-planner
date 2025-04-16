const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByEmailAndRole } = require("../Models/LoginModel");
const { jwtSecret, jwtExpiresIn } = require("../config/jwt");

const loginUser = async ({ email, password, user_role }) => {
    const user = await findUserByEmailAndRole(email, user_role);

    if (!user) {
        throw new Error("User not found or role mismatch");
    }

    const passwordMatch = await bcrypt.compare(password, user.user_password);
    if (!passwordMatch) {
        throw new Error("Invalid password");
    }

    const token = jwt.sign(
        { user_id: user.user_id, role: user.user_role },
        jwtSecret,
        { expiresIn: jwtExpiresIn }
    );

    return { token, user };
};

module.exports = {loginUser};
