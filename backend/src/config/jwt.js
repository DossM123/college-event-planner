require('dotenv').config();

module.exports = {
    jwtSecret: process.env.jwtSecret,
    jwtExpiresIn: process.env.jwtExpiresIn,
};
