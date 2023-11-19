import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuthors } from "../types/author.service";

const data = JSON.parse(localStorage.getItem('user')!);
const token = data?.accessToKen;

const authorAPI = createApi({
    reducerPath: "author",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/"
    }),
    tagTypes: ["Author"],
    endpoints: builder => ({
        getAuthors: builder.query<IAuthors[], void>({
            query: () => `/author`,
        }),
        getAuthorById: builder.query<IAuthors, number | string>({
            query: (id) => `/author/${id}`,
        }),
        removeAuthor: builder.mutation<IAuthors, number | string>({
            query: (id) => ({
                url: `/author/${id}`,
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    'authorization': `Bearer ${token}`
                }
            }),
        }),
        addAuthor: builder.mutation<IAuthors, IAuthors>({
            query: (author) => ({
                url: `/author/add`,
                method: "POST",
                body: author,
                headers: {
                    "content-type": "application/json",
                    'authorization': `Bearer ${token}`
                }
            }),
            invalidatesTags: ["Author"],
        }),
        updateAuthor: builder.mutation<IAuthors, IAuthors>({
            query: (author) => ({
                url: `/author/${author._id}/update`,
                method: "PUT",
                body: author,
                headers: {
                    "content-type": "application/json",
                    'authorization': `Bearer ${token}`
                }
            }),
            invalidatesTags: ["Author"],
        }),

    }),
});

export const {
    useGetAuthorsQuery,
    useGetAuthorByIdQuery,
    useRemoveAuthorMutation,
    useAddAuthorMutation,
    useUpdateAuthorMutation,
} = authorAPI;

export default authorAPI;
