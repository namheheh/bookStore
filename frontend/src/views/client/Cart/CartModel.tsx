import { Modal, Form } from 'antd';
import { Controller } from 'react-hook-form';

const EditProductModal = ({ open,
    confirmLoading,
    onCancel,
    handleOk,
    control,
    handleSubmit,
    targetProduct,
    watch,
    handleQuantityChange,
    quantity,
    incrementQuantity,
    decrementQuantity,
    editingProduct,
    setValue,
    onSubmit,
}: any) => {
    return (
        <Modal
            title="Chỉnh sửa sản phẩm"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
        >
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                    <img height={'150px'} src={editingProduct?.image} alt="" className='col-xl-4 col-lg-4 col-sm-4 col-8' />
                    <label htmlFor="" style={{ padding: "30px" }} className='col-xl-7 col-lg-7 col-sm-7 col-12'>{editingProduct?.name}</label>
                </div>
                <div className='row'>

                    <Form.Item
                        label=""
                        name="quantity"
                        rules={[{ message: 'Please input your quantity!' }]}
                    >
                        <Controller
                            name="quantity"
                            control={control}
                            defaultValue={editingProduct?.quantity || 1} // Set the default value to 1
                            render={({ field }) => (
                                <div className="product_count1 flex-1">
                                    <label className="quantity p-2">Số Lượng:</label>
                                    <div className="quantity-input">
                                        <span>
                                            <button onClick={decrementQuantity} type="button">-</button>
                                        </span>
                                        <input
                                            min="1"
                                            maxLength={10}
                                            value={field.value}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handleQuantityChange(e);
                                            }}
                                            className="form-control"
                                        />
                                        <span>
                                            <button onClick={incrementQuantity} type="button">+</button>
                                        </span>
                                    </div>
                                </div>
                            )}
                        />
                    </Form.Item>
                </div>
            </form>
        </Modal>
    );
};

export default EditProductModal;
