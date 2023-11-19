import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { message as messageApi } from 'antd';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery, useGetProductsQuery } from "../../../services/product.service";
import { useGetAuthorsQuery } from "../../../services/author.service";
import { useCreateCartMutation } from "../../../services/cart.service";
import CommentProductDetail from "./CommentProductDetail";
import ProductSale from "../home/homeProduct/ProductSale";

const ProductDetail = () => {
  const { data: productData } = useGetProductsQuery();
  const { data: authorData } = useGetAuthorsQuery();
  const { _id } = useParams();
  const { data: prodetailData } = useGetProductByIdQuery(_id);

  const authortt = authorData?.find(
    (author) => author._id === prodetailData?.author_id
  );
  const { data: productDataDetail } = useGetProductsQuery();
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(prodetailData?.images[0]);



  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  useEffect(() => {
    if (productData && prodetailData && productDataDetail) {
      const productDetailsForCurrentProduct = productDataDetail.filter(
        (detail) => detail._id === prodetailData._id
      );
    }
  }, [productData, prodetailData, productDataDetail]);

  const handleQuantityChange = (event: any) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const profileUser = JSON.parse(localStorage.getItem("user")!)
  const user = profileUser?.user
  const [addCart, isLoading] = useCreateCartMutation();

  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const onSubmitCart = async (dataCart: any) => {
    if (user) {
      if (!isAddingToCart) {
        setIsAddingToCart(true);
        const filteredProducts = productDataDetail?.map(async (product) => {
          if (product?._id == _id) {
            const cartItem = {
              product_id: product._id,
              user_id: user,
              quantity: quantity,
            };
            const result = await addCart(cartItem);
            messageApi.success({
              type: "error",
              content: "Thêm sản phẩm vào trong giỏ hàng thành công 🎉🎉🎉",
              className: "custom-class",
              style: {
                margin: "10px",
                fontSize: "20px",
                lineHeight: "30px",
              },
            });
            return result;
          }
        });
        const results = await Promise.all(filteredProducts);
        setIsAddingToCart(false);
      }
    } else {
      messageApi.error({
        type: "error",
        content: "Vui lòng đăng nhập để thực hiện chức năng này !!!",
        className: "custom-class",
        style: {
          margin: "10px",
          fontSize: "20px",
          lineHeight: "30px",
        }
      })
    }
  };
  const sliderSettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  return (
    <div>
      <div className="product_image_area">
        <div className="container">
          <div className="row s_product_inner">
            <div className="col-lg-5 offset-lg-1">
              <div className="single-prd-item" >
                <img
                  className="img-fluid"
                  src={mainImage || prodetailData?.images[0]}
                  alt=""
                  style={{ border: "1px solid #000" }}
                />
              </div>
              <Slider {...sliderSettings}>
                <div className="image-carosell d-flex p-2 mt-3">
                  {prodetailData?.images?.map((item: any) => (
                    <div
                      className="single-prd-item col-3 p-2"
                      key={item}
                      onClick={() => handleThumbnailClick(item)}
                    >
                      <img
                        className="img-fluid"
                        src={item}
                        alt=""
                        style={{
                          border: "1px solid #000",
                          width: "100px",
                          height: "150px",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </Slider>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <div className="s_product_text">
                <h3>{prodetailData?.name}</h3>
                {prodetailData?.price_sale == 0 ? (
                  <div className="product-price row">
                    <strong className="col-12">
                      Giá bán: {prodetailData?.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </strong>
                  </div>
                ) : (
                  <div className="product-price row">
                    <strong className="col-12">
                      Giá bán: {prodetailData?.price_sale?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </strong>
                    <div className="d-flex">
                      <del className="price-del">
                        Giá bìa: {prodetailData?.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                      </del>
                    </div>
                  </div>
                )}
                <ul className="list">
                  <li>
                    <a className="active" href="#">
                      <span>Tác giả:</span> : {authortt?.name}
                    </a>
                    <br />
                    <a className="active" href="#">
                      <span>Nhà xuất bản:</span> : {prodetailData?.publisher}
                    </a>
                  </li>
                  <li>
                    <i>{prodetailData?.content}</i>
                  </li>
                </ul>
                <div className="product_count flex-1">
                  <label className="quantity">Số Lượng:</label>
                  <div className="quantity-input">
                    <span>
                      <button onClick={decrementQuantity}>-</button>
                    </span>
                    <input
                      min="1"
                      maxLength={10}
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-50"
                    />
                    <span>
                      <button onClick={incrementQuantity}>+</button>
                    </span>
                  </div>
                </div>
                <div className="card_area d-flex align-items-center">
                  <button
                    className="primary-btn"
                    onClick={onSubmitCart}
                    disabled={isAddingToCart}
                  >
                    {isAddingToCart ? "Loading..." : "Thêm vào giỏ hàng"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row my-4">
            <p className="col-8 my-5 fs-5">
              {prodetailData?.description}
            </p>
            <div className="col-4 border p-4" style={{ width: "350px" }}>
              <h2 style={{ fontWeight: "bold" }}>Thông tin tác giả</h2>
              <hr />
              <div className="d-flex flex-row overflow-hidden no-underline ">
                <div className="w-300 p-2">
                  <div className="d-flex justify-content-between mb-2">
                    <h2>{authortt?.name} </h2>
                    <img src={authortt?.image} width="100px" height="100px" />
                  </div>
                  <div>
                    {authortt?.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <CommentProductDetail />
        <ProductSale />
      </div>
      <div></div>
    </div>
  );
};

export default ProductDetail;
