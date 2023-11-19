import { useEffect, useState } from 'react'
import { useFetchOneCartQuery } from '../../../services/cart.service';
import { useGetProductsQuery } from '../../../services/product.service';
import { useFetchOneUserQuery } from '../../../services/user.service';
import { useCreateCheckoutMutation } from "../../../services/checkout.service";
import { useGetPaymentQuery } from '../../../services/payment.service';
import { useNavigate } from 'react-router-dom';

const CheckOut = () => {
    const profileUser = JSON.parse(localStorage.getItem("user")!);
    const idUs = profileUser?.user;
    const [cartDetail, setCartDetail] = useState([]);
    const { data: usersOne } = useFetchOneUserQuery(idUs)
    const { data: cartUser, } = useFetchOneCartQuery(idUs);
    const { data: ProductDetailUser } = useGetProductsQuery();
    const { data: paymentQuery } = useGetPaymentQuery();
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
            console.log(modifiedProductDetails)
            setCartDetail(modifiedProductDetails);
        }


    }, [cartUser, ProductDetailUser]);






    const [isAddingToCheckout, setIsAddingToCheckout] = useState(false);
    const [addCheckout] = useCreateCheckoutMutation();
    const totalSum = cartDetail.reduce((accumulator, item: any) => accumulator + item.total, 0);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const handlePaymentSelect = (paymentId: any) => {
        setSelectedPayment(paymentId);
    };
    const navigation = useNavigate()
    const handleOnClick = async () => {
        const form = document.querySelector('#form_checkout') as HTMLFormElement | null;
        if (form) {
            const formData = new FormData(form);
            const data: { [key: string]: string } = {};
            formData.forEach((value, key) => {
                const inputElement = form.querySelector(`[name="${key}"]`);
                if (inputElement && inputElement instanceof HTMLInputElement) {
                    const name = inputElement.getAttribute('name');
                    if (name) {
                        data[name] = value.toString();
                    }
                }
            });

            try {
                const date = new Date()
                const newData = { ...data, products: cartDetail, payment_id: selectedPayment, shipping: "", total: totalSum, dateCreate: date, status: 'Đang xác nhận đơn hàng' };
                localStorage.setItem('currentOrder', JSON.stringify(newData));

                await addCheckout(newData);
                navigation("/ordersuccess")
            } catch (error) {
                console.error('Lỗi khi tạo checkout:', error);
            }
        }
    };

    return (
        <div><section className="checkout_area section_gap">
            <div className="container">
                <div className="billing_details">
                    <form className="row" id='form_checkout' noValidate>
                        <div className="col-lg-4">
                            <h3>Billing Details</h3>
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
                                <h2>Your Order</h2>
                                <tr>
                                    <th scope="col">Hình Ảnh</th>
                                    <th scope="col">| Tên Sản Phẩm</th>
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
                                                src={item?.images[0]}
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

                                <tr>
                                    <td style={{ width: "150px", color: "black" }}>Tổng thanh toán</td>
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                    <td> </td>
                                    <td style={{ color: "black", fontSize: "20px" }}>{totalSum?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                </tr>
                                <div className="payment_item">
                                    <div className="radion_btn">
                                        <input type="radio" id="f-option5" name="selector" />
                                        <label htmlFor="f-option5">Check payments</label>
                                        <div className="check"></div>
                                    </div>
                                    <p>Please send a check to Store Name, Store Street, Store Town, Store State / County,
                                        Store Postcode.</p>

                                    <div className="payment_item active">
                                        <form className='row mt-3'>
                                            <label htmlFor="" className='col-8 m-2'>Tổng Thanh Toán</label>
                                            <input type="text" disabled className='col-2 text-danger w-25 total-checkout' name='total' value={totalSum?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} />
                                        </form>
                                    </div>

                                    <div className="row">
                                        <div className="payment_item active col-5 m-2">
                                            <div>
                                                <select
                                                    onChange={(e) => handlePaymentSelect(e.target.value)}
                                                    name="payment_id"
                                                    className='form-select'
                                                >
                                                    {paymentQuery?.map((item) => (
                                                        <option key={item._id} value={item._id}>
                                                            {item.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="creat_account col-6">
                                            <input checked disabled type="checkbox" id="f-option4" name="selector" />
                                            <label htmlFor="f-option4">Việc đặt hàng của bạn đồng thời chấp nhận </label>
                                            <a href="#"> điều khoản và dịch vụ*</a>của chúng tôi.
                                            <label htmlFor="f-option4">** Đối với đơn hàng nội thành là 25k, ngoại thành là 40k</label>
                                        </div>

                                    </div>
                                    <div className="card_area col-6 align-items-center">
                                        <button type='button'
                                            className="primary-btn w-50 m-2"
                                            onClick={handleOnClick}
                                            disabled={isAddingToCheckout}
                                        >
                                            {isAddingToCheckout ? "Ordering..." : "Order"}
                                        </button>
                                    </div>


                                </div>
                            </div >
                        </div>
                    </form >

                </div >
            </div >
        </section >
        </div >

    )
}
export default CheckOut