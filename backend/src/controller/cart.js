
import Cart from "../model/cart";
import cartDetail from "../model/cartDetail";
import CartDetail from "../model/cartDetail";
import Product from "../model/product"


export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.params.id });
    const cartDetails = await cartDetail.find({ cart_id: cart._id });
    return res.status(201).json({
      message: "Lấy danh sách sản phẩm",
      products: cartDetails,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
}

export const tokenUser = async (req, res) => {
  try {
    const { token } = req.body;
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.KEY_RAR);
    console.log(decodedToken);
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
}

export const addToCart = async (req, res) => {
  try {
    const { productDetailId, user_id } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user_id: user_id });
    // console.log(quantity);

    if (!cart) {
      return res.status(400).json({
        message: "Giỏ hàng không tồn tại"
      });
    }

    const cartDetails = await CartDetail.find({ cart_id: cart._id });
  

    let check = false;
    let updatedCartDetail;

    const findProductDetail = await Product.findById(productDetailId);
    for (const detail of cartDetails) {
      if (JSON.stringify(detail.productDetailId) === JSON.stringify(findProductDetail._id)) {
        check = true;
        const quantityUpdate = detail.quantity + quantity;
        updatedCartDetail = await CartDetail.updateMany(
          { cart_id: detail.cart_id, productDetailId: detail.productDetailId },
          { quantity: quantityUpdate },
        );
        await Cart.updateMany(
          { user_id: user_id },
          { $push: { cartDetails: updatedCartDetail._id } }
        );
      }
    }

    if (!check) {
      const newCartDetail = new CartDetail({
        cart_id: cart._id,
        productDetailId: findProductDetail._id,
        quantity: quantity,
      });
      updatedCartDetail = await newCartDetail.save();
      await Cart.updateMany(
        { user_id: user_id },
        { $push: { cartDetails: updatedCartDetail._id } }
      );
    }

    return res.json({
      message: check ? "Sản phẩm đã được thêm vào giỏ hàng" : "Sản phẩm được tạo mới",
      CartDetail: updatedCartDetail,
      check,
    });

  } catch (error) {
    res.status(400).json({ message: 'Có lỗi xảy ra: ' + error.message });
  }
};

/////////////////////////////////////////////////////////////// 

export const getCartDetail = async (req, res) => {
  try {
    const cartDetails = await cartDetail.findById(req.params.id);
    if (!cartDetails) {
      return res.status(404).json({
        message: "sản phẩm không có trong giỏ hàng tồn tại"
      });
    }
    return res.json({
      message: "lấy sản phẩm giỏ hàng thành công",
      cartDetails,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
}

export const removeCartDetail = async (req, res) => {
  try {
    const cart = await cartDetail.findByIdAndDelete(req.params.id);
    if (!cart) {
      return res.status(404).json({
        message: "Không sản phẩm trong giỏ hàng để xóa"
      });
    }
    return res.json({
      message: "Xóa sản phẩm giỏ hàng thành công",
      cart,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
}

export const updateCart = async (req, res) => {
  try {
    const { name } = req.body;
    const existingCart = await cartDetail.findOne({
      name,
      _id: { $ne: req.params.id }
    });
    // if (existingCart) {
    //   return res.status(400).json({
    //     message: "thương hiệu đã được tạo trước đó"
    //   });
    // }
    const cart = await cartDetail.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );

    if (!cart) {
      return res.json({
        message: "Không có sản phẩm đó trong giỏ hàng"
      });
    }
    return res.json({
      message: "Cập nhật thương hiệu thành công",
      cart,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
}









