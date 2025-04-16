const { registerUser } = require("../Services/RegisterService");

const registerController = async (req, res) => {
    try {
        const result = await registerUser(req.body);
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        if (error.message.includes("already registered")) {
            res.status(409).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Registration failed. " + error.message });
        }
    }
};

module.exports = {registerController};
