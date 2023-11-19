import Checkout from "../model/checkout";
import CartDetail from "../model/cartDetail";
import Cart from "../model/cart";
export const createCheckout = async (req, res) => {
    const {
        products, user_id, dateCreate, total, address, status, Note, fullName, email, tel, voucherCode, shipping, payment_id, PaymentAmount
    } = req.body;
    try {
        const checkoutItem = new Checkout({
            products,
            total,
            user_id,
            dateCreate,
            address,
            status,
            Note,
            fullName,
            email,
            tel,
            voucherCode,
            shipping,
            payment_id,
            PaymentAmount
        });

        const savedCheckoutItem = await checkoutItem.save();

        if (savedCheckoutItem) {
            const findCart = await Cart.findOne({ user_id });
            const idCartDetail = findCart._id;
            await CartDetail.deleteMany({ cart_id: idCartDetail });
            res.status(201).json(savedCheckoutItem);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


export const getCheckout = async (req, res) => {
    try {
        const checkout = await Checkout.find();
        if (!checkout) {
            return res.status(404).json({
                message: "Thủ tục thanh toán trống"
            });
        }
        return res.json(checkout);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export const getOneCheckout = async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({
                message: "Thủ tục thanh toán không tồn tại"
            });
        }
        return res.json(checkout);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export const removeCheckout = async (req, res) => {
    try {
        const checkout = await Checkout.findByIdAndDelete(req.params.id);
        if (!checkout) {
            return res.status(404).json({
                message: "Không tìm thấy Thủ tục thanh toán để xóa"
            });
        }
        return res.json({
            message: "Xóa Thủ tục thanh toán thành công",
            checkout,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}


export const updateCheckout = async (req, res) => {
    try {
        const id = req.params.id;
        const checkout = await Checkout.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
            }
        );
        if (!checkout) {
            return res.json({
                message: "Cập nhật checkout không thành công"
            });
        }
        return res.json({
            message: "Cập nhật checkout thành công",
            checkout,
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}