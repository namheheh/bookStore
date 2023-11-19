import { commentSchema } from "../schemas/comment";
import Comment from "../model/comment";
// import Product from "../model/product";
import jwt from "jsonwebtoken";

export const getAllComment = async (req, res) => {
  try {
    const comments = await Comment.find();
    if (!comments) {
      return res.status(404).json({
        message: "Bình luận Trống",
      });
    }
    return res.json(comments);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({
        message: "Bình luận không tồn tại",
      });
    }
    return res.json(comment);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    // if (authHeader) {
    //   const token = authHeader.split(" ")[1];

    //   jwt.verify(token, "123456", (err, user) => {
    //     if (err) {
    //       return res.sendStatus(403);
    //     }

    //     req.user = user;
    //     // next();
    //     console.log(req.user);
    //   });
    // } else {
    //   res.sendStatus(401);
    // }

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      try {
        const { content, rate, id_product } = req.body;
        const user = await verifyToken(token, "123456");
        const id_user = user._id;
        const { error } = commentSchema.validate(
          { content, rate, id_product, id_user },
          {
            abortEarly: true,
          }
        ); //  Thiết lập để kiểm tra hết tất cả các lỗi, không dừng lại ở lỗi đầu tiên
        if (error) {
          return res.status(400).json({
            message: error.details.map((err) => err.message),
          });
        }

        const comment = await Comment.create({ content, rate, id_product, id_user });
        return res.status(201).json(comment);

        // req.user = user;
      } catch (err) {
        return res.sendStatus(403);
      }
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

function verifyToken(token, secretKey) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
}

export const removeComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({
        message: "Không tìm thấy bình luận để xóa",
      });
    }
    return res.json({
      message: "Xóa bình luận thành công",
      comment,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    // const { content,rate } = req.body;
    // const existingComment = await Comment.findOne({
    //   _id: { $ne: req.params.id },
    // });
    // if (existingComment) {
    //   return res.status(400).json({
    //     message: "Danh mục đã được tạo trước đó",
    //   });
    // }
    const comment = await Comment.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (!comment) {
      return res.json({
        message: "Cập nhật bình luận không thành công",
      });
    }
    return res.json({
      message: "Cập nhật bình luận thành công",
      comment,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
