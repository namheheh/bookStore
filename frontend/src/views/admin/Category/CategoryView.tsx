import React, { useState, useEffect } from 'react';
import { Button, Table, Input, notification, Popconfirm } from 'antd';
import { IAuthors } from "../../../types/author.service";
import { useGetAuthorsQuery, useRemoveAuthorMutation } from '../../../services/author.service';
import { Link } from 'react-router-dom';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';

interface DataType {
    key: string | number;
    name: string,
    image: string,
    description: string,

}
const CategoryView: React.FC = () => {
    const { data: authorData } = useGetAuthorsQuery();
    const [removeAuthor] = useRemoveAuthorMutation();
    const [searchTerm, setSearchTerm] = useState('');
    const [dataSource, setDataSource] = useState<Array<any>>([]);

    const confirm = async (id: number | string) => {
        try {
            // Gọi API xóa sản phẩm bất đồng bộ
            await removeAuthor(id);

            // Cập nhật dữ liệu sau khi xóa sản phẩm thành công
            const updatedDataSource = dataSource.filter((item) => item.key !== id);
            setDataSource(updatedDataSource);
            // Hiển thị thông báo thành công
            notification.success({
                message: "Success",
                description: "Xóa sản phẩm thành công!",
            });
        } catch (error) {
            // Xử lý lỗi nếu cần
            console.error("Error deleting product", error);
        }
    };
    useEffect(() => {
        if (authorData) {
            const filteredData = authorData.filter((author: IAuthors) =>
            author.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            const updatedDataSource = filteredData.map((author: IAuthors) => ({
                key: author._id,
                name: author.name,
                image: author.image,
                description: author.description
            }));
            setDataSource(updatedDataSource);
        }
    }, [authorData, searchTerm]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Thương Hiệu',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: "Ảnh",
            dataIndex: "image",
            key: "image",
            render: (image: string) => (
                <img className="image" src={image} alt="image of product" width={100} />
            ),
        },
        {
            title: 'Mô tả ',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: "Hành động",
            key: "action",
            render: ({ key: id }: any) => {
                return (
                    <>
                        <div>
                            <Popconfirm
                                title="Delete the task"
                                description="Bạn có chắc chắn muốn xóa thương Hiệu này ?"
                                onConfirm={() => confirm(id)}
                                okText="Xóa"
                                cancelText="Hủy"
                            >
                                <Button
                                    type="primary"
                                    style={{
                                        backgroundColor: "red",
                                        margin: "4px",
                                        minWidth: "4em",
                                    }}
                                >
                                    <CloseOutlined />
                                </Button>
                            </Popconfirm>

                            <Button
                                type="primary"
                                style={{
                                    backgroundColor: "blue",
                                    margin: "4px",
                                    minWidth: "4em",
                                }}
                            >
                                <Link to={`${id}/edit`} >
                                    <EditOutlined />
                                </Link>
                            </Button>
                        </div>
                    </>
                );
            },
        },

    ];
    const data = authorData?.map((author: any) => {
        return {
            key: author._id,
            ...author,
        };
    });
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 d-flex align-items-stretch">
                    <div className="card w-100">
                        <div className="card-body mt-5" >
                            <h5 className="card-title fw-semibold mb-4">Thương Hiệu</h5>
                            <a className="text-white" href="/admin/category/add">
                                <button type="button" className="btn btn-success m-1">Thêm</button>
                            </a>
                            <div className="col-lg-12 d-flex align-items-stretch">
                                <form onSubmit={handleSearch} className="d-flex w-100" method='POST'>
                                    <div className="m-2 w-75">
                                        <Input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nhập tên thương hiệu cần tìm"
                                            name="searchTerm"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="p-2 btn btn-secondary m-2">Tìm kiếm</button>
                                </form>
                            </div>
                            <div className="table-responsive">
                                <Table dataSource={dataSource} columns={columns} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryView;