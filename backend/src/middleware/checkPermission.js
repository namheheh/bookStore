import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/user";
import Role from "../model/role";
dotenv.config();

export const checkPermission = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const token = req.headers.authorization.split(" ")[1];


        jwt.verify(token, process.env.KEY_RAR, async (error, payload) => {
            if (error) {
                if (error.name === "JsonWebTokenError") {
                    return res.status(401).json({
                        message: "Token không hợp lệ",
                    });
                }
                if (error.name == "TokenExpiredError") {
                    return res.status(401).json({
                        message: "Token hết hạn",
                    });
                }
            }

            const user = await User.findById(payload._id);
            const { name: Role_name } = await Role.findById(user.role_id)

            if (!user) {
                return res.status(401).json({
                    message: "Unauthorized",
                });
            }
            if (Role_name !== "Admin") {
                return res.status(401).json({
                    message: "Bạn không có quyền",
                });
            }

            req.user = user;
            next();
        });
    } catch (error) { }

};

