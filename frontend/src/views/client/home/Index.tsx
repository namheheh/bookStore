import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useGetAuthorsQuery } from '../../../services/author.service';
import { useGetProductsQuery } from '../../../services/product.service';
import { IProducts } from '../../../types/product.service';
import { useEffect, useState } from 'react';
import Slider from "react-slick";
const Index = () => {
    const { data: productData } = useGetProductsQuery();
    const { data: authorData } = useGetAuthorsQuery();
    const [searchResult, setSearchResult] = useState<IProducts[]>([]);
    const [dataSourceToRender, setDataSourceToRender] = useState<IProducts[]>([]);
    const authorName = (item: any) => authorData?.find((author: any) => author._id == item.author_id)?.name
    const discount = (item: any) => Math.round(100 - (item.price_sale / item.price * 100))

    useEffect(() => {
        if (productData) {
            const updatedDataSource = productData.map(({ ...IProducts }) => ({ ...IProducts }));
            setDataSourceToRender(updatedDataSource);
            setSearchResult(updatedDataSource)
        }
    }, [productData]);

    let setPublisher = [productData?.map((item: IProducts) => item.publisher)]
    let Publisher = [...new Set(setPublisher[0])];
    const onHandleClick = ({ target: { value } }: any) => {
        let filteredData = dataSourceToRender;
        filteredData = filteredData.filter((itemm) => itemm.author_id == value || itemm.publisher == value)
        if (filteredData.length > 1) {
            setDataSourceToRender(filteredData);
        } else {
            filteredData = searchResult;
            filteredData = filteredData.filter((itemm) => itemm.author_id == value || itemm.publisher == value)
            setDataSourceToRender(filteredData);
        }
    };
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
        <div>
            <section className="hero-banner position-relative">
            </section>
            <div className="w-[90%] container">
                <div>
                    <section className="our-team position-relative pt-2">
                        <div>
                            <select onChange={onHandleClick} className="form-select-product">
                                <option selected disabled >
                                    Tác giả
                                </option>
                                {authorData?.map((item) => {
                                    return (
                                        <option value={item._id} >
                                            {item.name}
                                        </option>
                                    )
                                })}
                            </select>
                            <select onChange={onHandleClick} className="form-select-product">
                                <option selected disabled>
                                    Nhà xuất bản
                                </option>
                                {Publisher?.map((item) => {
                                    return (
                                        <option value={item}>
                                            {item}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>


                    </section>

                    <section className="our-team position-relative mt-5">
                        <div className="container_home">
                            <div className="d-flex pb-5">
                                <div className="fs-5 text-uppercase fw-bold">
                                    - Sách MỚI
                                </div>
                            </div>
                            <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4 g-2 g-lg-3">
                                {dataSourceToRender.slice(0, 15).map((item) => {
                                    return (
                                        <div className="product border-2 ">
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
                                                    <div className="product-price d-flex justify-content-between">
                                                        <div></div>
                                                        <div>
                                                            <strong>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</strong>
                                                        </div>
                                                    </div>
                                                )}
                                            </a>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                    </section>
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
                </div>

            </div >
        </div>
    )
}

export default Index
