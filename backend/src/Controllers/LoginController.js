const { loginUser } = require("../Services/LoginService");

const loginController = async (req, res) => {
    try {
        const { email, password, user_role } = req.body;
        const result = await loginUser({ email, password, user_role });

        res.status(200).json({
            message: "Login successful",
            token: result.token,
            user: {
                id: result.user.user_id,
                name: result.user.name,
                email: result.user.email,
                role: result.user.user_role
            }
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = loginController;
