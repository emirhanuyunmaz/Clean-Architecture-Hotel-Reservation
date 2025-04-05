import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "cookies-next";


export const bookApi = createApi({
    reducerPath:"bookApi",
    tagTypes:["book"],
    baseQuery : fetchBaseQuery({baseUrl : process.env.NEXT_PUBLIC_BASE_URL+"/book" ,
        headers:{
            token:getCookie("token") as string
        } 
    }),
    endpoints:(build)=> ({
        
        getBookList : build.query<BookModel[],any>({
            query:() => `/bookList`,
            providesTags:["book"]
        }),

        getBook : build.query<BookModel|undefined,String|null>({
            query:(id) => `/book/${id}`,
            providesTags:["book"]
        }),

        createBook:build.mutation<BookModel,any>({
            query:(body) => ({
                url:`/createBook`,
                method:"POST",
                body:body,
                prepareHeaders: (headers:any) => {
                    headers.set("Content-Type", "multipart/form-data")
                      return headers
                },
            }),
            invalidatesTags:["book"]
        }),

        updateBook:build.mutation<BookModel,any>({
            query:(body) => ({
                url:`/updateBook`,
                method:"POST",
                body:body,
                prepareHeaders: (headers:any) => {
                    headers.set("Content-Type", "multipart/form-data")
                      return headers
                },
            }),
            invalidatesTags:["book"]
        }),

        deleteSingleBook:build.mutation<deleteBookType,deleteBookType>({
            
            query: (body) => ({
                url:`/deleteSingleBook`,
                method:"Delete",
                body:body
            }),
            
            invalidatesTags:["book"],

        }),

        deleteMultiBook:build.mutation<BookModel,multiDeleteBookModel>({
            query:(body) => ({
                url:`/deleteMultiBook`,
                method:"DELETE",
                body:body
            }),
            invalidatesTags:["book"]
        }),

    })
})

export const { useGetBookListQuery , useDeleteSingleBookMutation , useDeleteMultiBookMutation ,useCreateBookMutation , useGetBookQuery , useUpdateBookMutation} = bookApi