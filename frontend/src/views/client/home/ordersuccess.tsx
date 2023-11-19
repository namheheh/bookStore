import { useEffect, useState } from 'react';
import { useFetchOneUserQuery } from '../../../services/user.service';
import { useFetchOneCartQuery } from '../../../services/cart.service';
import { useGetProductsQuery } from '../../../services/product.service';

const Ordersuccess = () => {
    const profileUser = JSON.parse(localStorage.getItem("user")!);
    const idUs = profileUser?.user;
    const [cartDetail, setCartDetail] = useState([]);
    const { data: usersOne } = useFetchOneUserQuery(idUs)
    const { data: cartUser, } = useFetchOneCartQuery(idUs);
    const { data: ProductDetailUser } = useGetProductsQuery();
    const { data: Product } = useGetProductsQuery();

    useEffect(() => {
        if (cartUser && ProductDetailUser) {
            const cartDetailIds = cartUser?.products.map((item: any) => item.productDetailId);
            const matchingIds = cartDetailIds?.filter((id: any) => ProductDetailUser.some((product) => product._id === id));
            const productIds = ProductDetailUser?.map((item) => item._id);
            const filteredProducts = Product?.filter((product: any) => productIds.includes(product?._id));
            const matchingProductDetailUser = ProductDetailUser?.filter((item) => matchingIds.includes(item._id));
            const modifiedProductDetails = matchingProductDetailUser?.map((item: any) => {
                const matchingProduct = filteredProducts?.find((product) => product._id === item._id);
                if (matchingProduct) {
                    const price = matchingProduct.price;
                    const quantity = cartUser.products.find((product: any) => product.productDetailId === item._id).quantity;
                    return {
                        ...item,
                        name: matchingProduct.name,
                        image: matchingProduct.images[0],
                        price: price,
                        quantity: quantity,
                        total: price * quantity,
                    };
                } else {
                    return item;
                }
            });
            setCartDetail(modifiedProductDetails);
        }
    }, [cartUser, ProductDetailUser]);
    const totalSum = cartDetail.reduce((accumulator, item: any) => accumulator + item.total, 0);
    return (
        <div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h2>Đặt hàng thành công!</h2>
                <p>Cảm ơn bạn đã mua sắm. Chúng tôi sẽ xử lý đơn hàng của bạn ngay lập tức.</p>
            </div>
            <section className="checkout_area section_gap">
                <div className="container">
                    <div className="billing_details">
                        <div className='row'>
                            <div className="col-lg-4">
                                <h3>Thông tin liên lạc</h3>
                                <div className="row contact_form"  >
                                    <div className="col-md-12 form-group p_star">
                                        <input hidden type="text" className="form-control" id="last" name="user_id" value={usersOne?._id} />
                                        <span className="placeholder" ></span>
                                    </div>
                                    <div className="col-md-12 form-group p_star">
                                        <label htmlFor="">Họ và tên</label>
                                        <input type="text" className="form-control" id="last" name="fullName" value={usersOne?.fullName} />
                                        <span className="placeholder" ></span>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <label htmlFor="">Email</label>
                                        <input type="text" className="form-control" id="email" name="email" placeholder="Địa chỉ email" value={usersOne?.email} />
                                    </div>
                                    <div className="col-md-12 form-group p_star">
                                        <label htmlFor="">Số điện thoại</label>
                                        <input type="text" className="form-control" id="number" placeholder='Số điện thoại' name="tel" value={usersOne?.tel} />
                                        <span className="placeholder" ></span>
                                    </div>

                                    <div className="col-md-12 form-group p_star">
                                        <label htmlFor="">Địa chỉ</label>
                                        <input type="text" className="form-control" id="address" placeholder='Địa chỉ giao hàng' name="address" value={usersOne?.address} />
                                        <span className="placeholder" ></span>
                                    </div>
                                    {/* <div className="col-md-12 form-group">
                                    <div className="creat_account">
                                        <input type="checkbox" id="f-option2" name="selector" />
                                        <label htmlFor={"f-option2"}>Create an account?</label>
                                    </div>
                                </div> */}
                                    <div className="col-md-12 form-group">
                                        <div className="creat_account">
                                            <label htmlFor="">Ghi chú</label>
                                        </div>
                                        <input className="form-control" name="Note" id="Note" placeholder="#giao giờ hàng chính"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="order_box">
                                    <h2>Thông tin đơn hàng</h2>
                                    <tr>
                                        <th scope="col">Hình Ảnh</th>
                                        <th scope="col">| Tên Sản Phẩm</th>
                                        <th scope="col">| Kích Cỡ</th>
                                        <th scope="col">| Màu Sắc</th>
                                        <th scope="col">| Số Lượng</th>
                                        <th scope="col">| Giá</th>
                                        <th scope="col">| Tạm Tính</th>
                                    </tr>
                                    {cartDetail?.map((item: any) => (
                                        <tr key={item?._id} style={{ height: "100px" }} >
                                            <td style={{ width: "100px" }}>
                                                <img
                                                    width={'100px'}
                                                    height={'100px'}
                                                    src={item?.image}
                                                    alt="" />
                                            </td>
                                            <td style={{ width: "200px" }}>
                                                <h6>{item?.name}</h6>
                                            </td>


                                            <td style={{ width: "100px", textAlign: "center" }}>
                                                <h5>{item?.quantity}</h5>
                                            </td>
                                            <td style={{ width: "100px" }}>
                                                <h5>{item?.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h5>
                                            </td>
                                            <td style={{ width: "100px" }}>
                                                <h5>{item?.total?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h5>
                                            </td>

                                        </tr>
                                    ))}


                                    <div className="payment_item">

                                        <div className="payment_item active">
                                            <div className='row mt-3'>
                                                <label htmlFor="" className='col-8 m-2'>Tổng Thanh Toán</label>
                                                <h5 className='col-3 text-danger w-25 total-checkout'>{totalSum.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div >
                            </div>

                        </div>
                    </div >
                </div >
            </section>

        </div>
    );
};

export default Ordersuccess;
