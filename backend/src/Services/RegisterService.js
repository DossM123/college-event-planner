const { insertUser, findUserByEmail } = require("../Models/RegisterModel");
const bcrypt = require("bcrypt");

const registerUser = async ({ name, email, phone, year_of_study, user_password, user_role }) => {
    // Check if email already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser.length > 0) {
        throw new Error("User already registered with this email.");
    }

    const hashedPassword = await bcrypt.hash(user_password, 10);
    return insertUser({ name, email, phone, year_of_study, user_password: hashedPassword, user_role });
};
module.exports = { registerUser };