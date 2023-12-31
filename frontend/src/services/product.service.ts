import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProducts } from "../types/product.service";
const data = JSON.parse(localStorage.getItem('user')!);
const token = data?.accessToKen;

const productAPI = createApi({
    reducerPath: "product",
    tagTypes: ["Product"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api"
    }),
    endpoints: builder => ({
        getProducts: builder.query<IProducts[], void>({
            query: () => `/product`,
        }),
        getProductById: builder.query<IProducts, any>({
            query: (id) => `/product/${id}`

        }),
        removeProduct: builder.mutation<IProducts, number | string>({
            query: (id) => ({
                url: `product/${id}`,
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    'authorization': `Bearer ${token}`
                }
            }),
            invalidatesTags: ["Product"]
        }),
        addProduct: builder.mutation<void, Partial<IProducts>>({
            query: product => ({
                url: `product/add`,
                method: "POST",
                body: product,
                headers: {
                    "content-type": "application/json",
                    'authorization': `Bearer ${token}`
                }
            }),

        }),

        updateProduct: builder.mutation<IProducts, IProducts>({
            query: (product) => ({
                url: `/product/${product._id}/update`,
                method: "PUT",
                body: product,
                headers: {
                    "content-type": "application/json",
                    'authorization': `Bearer ${token}`
                }
            }),
            invalidatesTags: ["Product"]
        }),
    })
});


export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useRemoveProductMutation,
    useAddProductMutation,
    useUpdateProductMutation,
} = productAPI;


export default productAPI;
