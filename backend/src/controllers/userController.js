const { createUserService, loginService, getUserService } = require("../services/userService");
const User = require("../models/user");

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const data = await createUserService(name, email, password);
    return res.status(200).json(data)
}

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    const data = await loginService(email, password);

    return res.status(200).json(data)
}

const getUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                EC: 1,
                EM: "Unauthorized"
            });
        }

        const user = await User.findOne({ email: req.user.email }).select("-password");

        if (!user) {
            return res.status(404).json({
                EC: 1,
                EM: "User not found"
            });
        }

        return res.status(200).json({
            EC: 0,
            data: user
        });

    } catch (err) {
        return res.status(500).json({
            EC: 2,
            EM: err.message
        });
    }
};

const getAccount = async (req, res) => {
    return res.status(200).json(req.user)
}

module.exports = {
    createUser, handleLogin, getUser, getAccount
}