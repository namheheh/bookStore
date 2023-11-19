import { userSchema } from "../schemas/user";
import User from "../model/user";
import bcrypt from "bcryptjs";
import Cart from "../model/cart";
import Role from "../model/role";


export const getAllUsers = async (req, res) => {
    try {
        const user = await User.find();
        if (!user || user.length === 0) {
            return res.status(404).json({
                message: "Không có tài khoản nào trong cơ sở dữ liệu"
            });
        }
        return res.json(user);
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}

export const getOneUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: "Không tìm thấy tài khoản nào"
            });
        }
        return res.json(user);
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}

export const createStaff = async (req, res) => {
    try {
        const { image, userName, fullName, gender, address, tel, email, password, aboutme } = req.body;
        const { error } = userSchema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(404).json({
                message: errors,
            });
        }
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(200).json({
                message: "Email đã tồn tại",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const staffRole = await Role.findOne({ name: "Staff" });
        const user = await User.create({
            image,
            userName,
            fullName,
            gender,
            email,
            password: hashedPassword,
            role_id: staffRole.id,
            tel,
            address,
            aboutme,
        });
        const cart = await Cart.create({
            user_id: user._id,
        })
        return res.status(201).json({
            message: "Đăng ký thành công",
            user, cart
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
}

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        // const { error } = userSchema.validate(req.body, { abortEarly: false });
        // if (error) {
        //     return res.status(400).json({
        //         message: error.details.map((err) => err.message)
        //     });
        // }
        const { email, password } = req.body;
        const existingUser = await User.findOne({
            email,
            _id: { $ne: id }
        });
        if (existingUser) {
            return res.status(400).json({
                message: "User đã tồn tại"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUserData = {
            email,
            password: hashedPassword,
        };
        const user = await User.findByIdAndUpdate(
            id,
            // updatedUserData,
            req.body,
            {
                new: true,
            }
        );
        if (!user) {
            return res.json({
                message: "Cập nhật User không thành công"
            });
        }
        return res.json({
            message: "Cập nhật User thành công",
            user,
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        const removeCart = await Cart.findOneAndDelete({ user_id: req.params.id })
        if (!user) {
            return res.status(404).json({
                message: "Không tìm thấy user để xóa"
            });
        }
        return res.json({
            message: "Xóa user thành công",
            user,
            message: "Xóa cart thành công",
            removeCart
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}