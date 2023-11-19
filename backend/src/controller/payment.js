
import Payment from '../model/payment';
import { paymentSchema } from '../schemas/payment';

export const getPayment = async (req, res) => {
    try {
        const payment = await Payment.find();
        if (!payment) {
            return res.status(404).json({
                message: "Thanh toán trống"
            });
        }
        return res.json(payment);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}



export const getOnePayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({
                message: "Thanh toán không tồn tại"
            });
        }
        return res.json(payment);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}


export const createPayment = async (req, res) => {
    try {
        const { error } = paymentSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: error.details.map((err) => err.message)
            });
        }
        const { name } = req.body;
        const existingPayment = await Payment.findOne({ name });
        if (existingPayment) {
            return res.status(400).json({
                message: "Phương thức thanh toán đã được tạo trước đó"
            });
        }
        const payment = await Payment.create(req.body);
        return res.status(201).json(payment);

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export const removePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        if (!payment) {
            return res.status(404).json({
                message: "Không tìm thấy Phương thức thanh toán để xóa"
            });
        }
        return res.json({
            message: "Xóa Phương thức thanh toán thành công",
            payment,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}


export const updatePayment = async (req, res) => {
    try {
        const { name } = req.body;
        const existingPayment = await Payment.findOne({
            name,
            _id: { $ne: req.params.id }
        });
        if (existingPayment) {
            return res.status(400).json({
                message: "Phương thức thanh toán đã được tạo trước đó"
            });
        }
        const payment = await Payment.findByIdAndUpdate(
            { _id: req.params.id },
            req.body,
            {
                new: true,
            }
        );
        if (!payment) {
            return res.json({
                message: "Cập nhật Phương thức thanh toán không thành công"
            });
        }
        return res.json({
            message: "Cập nhật Phương thức thanh toán thành công",
            payment,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}
