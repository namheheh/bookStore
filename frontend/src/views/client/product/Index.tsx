import { useEffect, useState } from "react";
import { useGetAuthorsQuery } from "../../../services/author.service";
import { useGetProductsQuery } from "../../../services/product.service";
import { IProducts } from "../../../types/product.service";

const Index = () => {
  const { data: productData } = useGetProductsQuery();
  const { data: authorData } = useGetAuthorsQuery();
  const [dataSourceToRender, setDataSourceToRender] = useState<IProducts[]>([]);
  const [searchResult, setSearchResult] = useState<IProducts[]>([]);

  useEffect(() => {
    if (productData) {
      const updatedDataSource = productData.map(({ ...IProducts }) => ({
        ...IProducts,
      }));
      setDataSourceToRender(updatedDataSource);
      setSearchResult(updatedDataSource)
    }
  }, [productData]);
  let filteredData = dataSourceToRender;
  const onHandleClick = ({ target: { value } }: any) => {
    filteredData = filteredData.filter((itemm) => itemm.author_id == value)
    if (filteredData.length > 1) {
      setDataSourceToRender(filteredData);
    } else {
      filteredData = searchResult;
      filteredData = filteredData.filter((itemm) => itemm.author_id == value)
      setDataSourceToRender(filteredData);

    }

  };

  return (
    <div>
      <section className="our-team position-relative">
        <div className="container">
          <div>
            <div className="d-flex justify-content-between">
              <div>
                hehe
              </div>
              <div className="mb-3 d-flex">
                <select onChange={onHandleClick} className="form-select-product">
                  <option selected disabled >
                    thương hiệu
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
                    mau sac
                  </option>
                  {/* {color?.map((item) => {
                    return (
                      <option value={item}>
                        {item}
                      </option>
                    )
                  })} */}
                </select>
                <select onChange={onHandleClick} className="form-select-product">
                  <option selected disabled>
                    Size
                  </option>
                  {/* {Size?.map((item) => {
                    return (
                      <option value={item}>
                        {item}
                      </option>
                    )
                  })} */}
                </select>
              </div>
            </div>

            <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2 g-lg-3">
              {dataSourceToRender?.map((item) => {
                const authorName = authorData?.find(
                  (author: any) => author._id == item.author_id
                )?.name;
                const discount = Math.round(
                  100 - (item.price_sale / item.price) * 100
                );
                return (

                  <div className="product border-2 p-2">
                    <div className="card product-main">
                      <a
                        href={"/product/" + item._id + "/detail"}
                        className="d-block overflow-hidden no-underline"
                      >
                        <div className="position-relative product-image overflow-hidden">
                          <img
                            src={item.images[0]}
                            alt=""
                            width="100%"
                            height="auto"
                            className=" inset-0 object-cover"
                          />
                        </div>
                        <div className="bg-white content-product w-100 p-2">
                          <div className="product-detail px-3 row ">
                            <div className="col-12 row px-2">
                              <div className="col-1 m-1 product-color color-1" />
                            </div>
                          </div>
                          <div className="product-vendor">{authorName}</div>
                          <h4 className="product-name ellipsis">{item.name}</h4>
                          {item.price_sale > 0 ? (
                            <div className="product-price row">
                              <strong className="col-12">
                                {item.price_sale.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                              </strong>
                              <div className="d-flex">
                                <del className="price-del">{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</del>
                                <span className="product-discount">
                                  -{discount}%
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="product-price row">
                              <strong className="col-12">{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</strong>
                            </div>
                          )}
                        </div>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Index;
