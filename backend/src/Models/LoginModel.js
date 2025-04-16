const db = require("../config/db");

const findUserByEmailAndRole = async (email, role) => {
    const [rows] = await db.execute(
        "SELECT * FROM users WHERE email = ? AND user_role = ?",
        [email, role]
    );
    return rows[0];
};

module.exports = {
    findUserByEmailAndRole
};
