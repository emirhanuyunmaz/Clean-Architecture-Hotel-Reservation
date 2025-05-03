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
        
        getBookList : build.query<BookModel[],string>({
            query:(searchText) => `/bookList?${searchText && "searchText="+searchText}`,
            providesTags:["book"]
        }),

        getBook : build.query<BookModel|undefined,String|null>({
            query:(id) => `/book/${id}`,
            providesTags:["book"]
        }),
        
        getFindLocationBook : build.query<BookModel[]|undefined,String|null>({
            query:(location) => `/searchLocationBook?${location &&"location="+location}`,
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

        addBookSingleImage:build.mutation<BookModel,any>({
            query:(body) => ({
                url:`/addBookSingleImage`,
                method:"POST",
                body:body,
                prepareHeaders: (headers:any) => {
                    headers.set("Content-Type", "multipart/form-data")
                      return headers
                },
            }),
            invalidatesTags:["book"]
        }),

        deleteBookSingleImage:build.mutation<BookModel,any>({
            query:(body) => ({
                url:`/deleteBookSingleImage`,
                method:"POST",
                body:body,
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

        updateBookSingleImage:build.mutation<BookModel,any>({
            query:(body) => ({
                url:`/updateBookImage`,
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
                method:"DELETE",
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

        bookPaymentPrice:build.mutation<any,BookPaymentModel>({
            query:(body) => ({
                url:`/paymentPrice`,
                method:"POST",
                body:body
            }),
            invalidatesTags:["book"]
        }),
        
        userBookList : build.query<userBookModel[],any>({
            query:() => `/userBookList`,
            providesTags:["book"]
        }),
        

    })
})

export const { useGetBookListQuery , useDeleteSingleBookMutation , useDeleteMultiBookMutation ,useCreateBookMutation , useGetBookQuery , useUpdateBookMutation , useUpdateBookSingleImageMutation , useAddBookSingleImageMutation , useDeleteBookSingleImageMutation , useGetFindLocationBookQuery , useBookPaymentPriceMutation , useUserBookListQuery} = bookApi