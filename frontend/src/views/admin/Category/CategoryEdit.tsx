import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, notification } from 'antd';
import { useGetAuthorByIdQuery, useUpdateAuthorMutation } from '../../../services/author.service';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryEdit: React.FC = () => {
    const [form] = Form.useForm();
    const [updateAuthor] = useUpdateAuthorMutation();
    const [messageApi, contextHolder] = message.useMessage();
    // const navigate = useNavigate();
    const { idAuthor } = useParams<{ idAuthor: string }>();
    const { data: authorData } = useGetAuthorByIdQuery(idAuthor || "");
    const [, setImage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (authorData) {
            form.setFieldsValue({
                _id: authorData._id,
                name: authorData.name,
                image: authorData.image,
                description: authorData.description,
            });
        }
    }, [authorData, form]);
    const onFinish = (values: any) => {
        updateAuthor({ ...values, _id: idAuthor })
            .unwrap()
            .then(() => {
                notification.success({
                    message: "Success",
                    description: "Sửa Thương Hiệu Thành Công!",
                });
                navigate("/admin/category");
                window.location.reload()
            })
            .catch((error) => {
                console.error("Error adding author:", error);
            });

    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed', errorInfo);
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="card-body">
                    <h5 className="card-title fw-semibold mb-4">Cập nhật Danh Mục</h5>
                    {contextHolder}
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}

                        autoComplete="off"
                    >
                        <Form.Item
                            label="Tên thương hiệu"
                            name="name"

                            rules={[{ required: true, message: 'Vui lòng nhập tên Thương Hiệu!' }, { min: 3, message: "ít nhất 3 ký tự" },]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Ảnh" name="image" valuePropName="file">
                            <div>
                                <div className="image-upload">
                                    <label htmlFor="file-input">
                                        <i className="bx bx-image-add"></i>
                                    </label>
                                    <input
                                        id="file-input"
                                        type="file"
                                        onChange={(e: any) => setImage(e.target.files[0])}
                                    />
                                </div>
                                <img src={authorData?.image} alt="" id="preview-image"></img>
                            </div>
                        </Form.Item>
                        <Form.Item
                            label="Mô tả sản phẩm"
                            name="description"
                            rules={[
                                { required: true, message: 'Vui lòng nhập mô tả!' },
                                { min: 3, message: "ít nhất 3 ký tự" },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                            <Button
                                type='primary'
                                danger
                                onClick={() => navigate("/admin/category")}
                                className='ml-2'
                            >Quay lại</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default CategoryEdit
