import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useState } from 'react';
import { useGetProductsQuery } from "../../../../services/product.service";
import { IProducts } from "../../../../types/product.service";
import { useGetAuthorsQuery } from "../../../../services/author.service";

const ProductSale = () => {
    const { data: productData } = useGetProductsQuery();
    const { data: authorData } = useGetAuthorsQuery();
    const [dataSourceToRender, setDataSourceToRender] = useState<IProducts[]>([]);
    const discount = (item: any) => Math.round(100 - (item.price_sale / item.price * 100))
    const authorName = (item: any) => authorData?.find((author: any) => author._id == item.author_id)?.name
    useEffect(() => {
        if (productData) {
            const updatedDataSource = productData.map(({ ...IProducts }) => ({ ...IProducts }));
            setDataSourceToRender(updatedDataSource);
        }
    }, [productData]);

    const settings = {
        infinite: true,
        adaptiveHeight: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        responsive:
            [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]
    };
    return (
        <div className="container_home">
            <div className="d-flex justify-content-between py-5">
                <div className="fs-5  text-uppercase fw-bold text-center">
                    - Sách KHUYẾN MÃI
                </div>
            </div>
            <Slider  {...settings}>
                {dataSourceToRender?.slice(0, 6).map((item) => {
                    if (item.price_sale > 0) {
                        return (
                            <div>
                                <a href={"/product/" + item._id + "/detail"} className="card product-main bg-white p-2">
                                    <div className="d-flex flex-row overflow-hidden no-underline ">
                                        <img src={item.images[0]} width="100px" height="200px" />
                                        <div className="w-300 p-2">
                                            <h4>{item.name}</h4>
                                            <div>{authorName(item)}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    {item.price_sale > 0 ? (
                                        <div className="product-price d-flex justify-content-between">
                                            <div className="product-discount">-{discount(item)}%</div>
                                            <div className="d-flex">
                                                <del className="price-del">{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</del>
                                                <strong>{item.price_sale.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</strong>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="product-price row">
                                            <strong className="col-12">{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</strong>
                                        </div>
                                    )}
                                </a>
                            </div>
                        )
                    }
                })}
            </Slider>

        </div>
    )
}

export default ProductSale