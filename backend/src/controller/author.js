
import { authorSchema } from '../schemas/Author';
import Author from '../model/author';
export const getAllAuthors = async (req, res) => {
    try {
        const author = await Author.find();
        if (!author) {
            return res.status(404).json({
                message: "thể loai trống"
            });
        }
        return res.json(author);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export const getAuthor = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) {
            return res.status(404).json({
                message: "thể loai không tồn tại"
            });
        }
        return res.json(author);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}


export const createAuthor = async (req, res) => {
    try {
        const { error } = authorSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: error.details.map((err) => err.message)
            });
        }
        const { name } = req.body;
        const existingAuthor = await Author.findOne({ name });
        if (existingAuthor) {
            return res.status(400).json({
                message: "thể loai đã được tạo trước đó"
            });
        }
        const author = await Author.create(req.body);
        return res.status(201).json(author);

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export const removeAuthor = async (req, res) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);
        if (!author) {
            return res.status(404).json({
                message: "Không tìm thấy thể loai để xóa"
            });
        }
        return res.json({
            message: "Xóa thể loai thành công",
            author,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}


export const updateAuthor = async (req, res) => {
    try {
        const { name } = req.body;
        const existingAuthor = await Author.findOne({
            name,
            _id: { $ne: req.params.id }
        });
        if (existingAuthor) {
            return res.status(400).json({
                message: "thể loai đã được tạo trước đó"
            });
        }
        const author = await Author.findByIdAndUpdate(
            { _id: req.params.id },
            req.body,
            {
                new: true,
            }
        );
        if (!author) {
            return res.json({
                message: "Cập nhật thể loai không thành công"
            });
        }
        return res.json({
            message: "Cập nhật thể loai thành công",
            author,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}
