import Role from "../model/role"

export const getAllRole = async (req, res) => {
    try {
        const role = await Role.find();
        if (!role || role.length === 0) {
            return res.status(404).json({
                message: "Không có tài khoản nào trong cơ sở dữ liệu"
            });
        }
        return res.json(role);
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}

export const getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) {
            return res.status(404).json({
                message: "Không tìm thấy role"
            });
        }
        return res.json(role);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}


export const createRole = async (req, res) => {
    try {
        const { name } = req.body;
        const existingRole = await Role.findOne({ name });
        if (existingRole) {
            return res.status(400).json({
                message: "Role đã được tạo trước đó"
            });
        }
        const role = await Role.create(req.body);
        return res.status(201).json(role);
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}

export const updateRole = async (req, res) => {
    try {
        const id = req.params.id;
        const { name } = req.body;

        const existingRole = await Role.findOne({
            name,
            _id: { $ne: id }
        });
        if (existingRole) {
            return res.status(400).json({
                message: "Role đã tồn tại"
            });
        }
        const role = await Role.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
            }
        );
        if (!role) {
            return res.json({
                message: "Cập nhật Role không thành công"
            });
        }
        return res.json({
            message: "Cập nhật Role thành công",
            role,
        });
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        })
    }
}

export const removeRole = async (req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id);
        if (!role) {
            return res.status(404).json({
                message: "Không tìm thấy role để xóa"
            });
        }
        return res.json({
            message: "Xóa role thành công",
            role,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}