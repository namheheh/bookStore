import User from "../model/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { signinSchema, userSchema } from "../schemas/user";
import Role from "../model/role";
import Cart from "../model/cart";

export const signUp = async (req, res) => {
    try {
        const { image, userName, fullName, gender, address, tel, email, password } = req.body;
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
        const memberRole = await Role.findOne({ name: "Member" });
        const user = await User.create({
            image,
            userName,
            fullName,
            gender,
            email,
            password: hashedPassword,
            role_id: memberRole.id,
            tel,
            address,
        });
        const cart = await Cart.create({
            user_id: user._id,
        })
        return res.status(201).json({
            message: "Đăng ký thành công",
            user: user._id,
            cart,

        });
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
};


export const findUserCart = async (req, res) => {
    try {
        const cartID = req.params;
        const userCart = await Cart.findById(cartID)
        if (!userCart) {
            return res.status(404).json({
                message: "Không tìm thấy giỏ hàng cho người dùng này",
            });
        }
        return res.status(200).json({
            message: "Tìm thấy giỏ hàng của người dùng",
            userCart,
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
};

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = signinSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(404).json({
                message: errors,
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "Tài khoản không tồn tại ",
            });
        }
        const isMath = await bcrypt.compare(password, user.password);
        if (!isMath) {
            return res.status(404).json({
                message: "sai mật khẩu",
            });
        }
        const cart = await Cart.findOne({user_id: user._id})
        user.password = undefined;
        const expiresInInSeconds = 30 * 24 * 60 * 60;
        const token = jwt.sign({ _id: user._id }, process.env.KEY_RAR, { expiresIn: expiresInInSeconds });
        return res.status(201).json({
            message: "Đăng nhập thành công ",
            accessToKen: token,
            user: user._id,
            cart: cart.products
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
};

// export const Profile = async (req, res) => {
    
//     const token = req.headers.authorization; 
    
//     const secretKey = 'your_secret_key_here';

//     try {
//         if (!token) {
//             return res.status(401).json({ message: 'Không có token được cung cấp.' });
//         }

//         const decoded = jwt.verify(token, secretKey);

//         const userInfo = {
//             _id: decoded._id,
            
//         };

//         res.status(200).json(userInfo);
//     } catch (error) {
//         console.error('Lỗi giải mã token:', error.message);
//         res.status(401).json({ message: 'Token không hợp lệ.' });
//     }
// };


