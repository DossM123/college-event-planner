const db = require("../config/db");

const findUserByEmail = async (email) => {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    return rows;
};

const insertUser = async ({ name, email, phone, year_of_study, user_password, user_role }) => {
    const [result] = await db.execute(
        `INSERT INTO users (name, email, phone, year_of_study, user_password, user_role)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [name, email, phone, year_of_study, user_password, user_role]
    );
    return result;
};

module.exports = {
    insertUser,
    findUserByEmail,
};
