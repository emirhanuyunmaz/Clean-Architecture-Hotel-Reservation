import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "cookies-next";


export const userApi = createApi({
    reducerPath:"userApi",
    tagTypes:["user"],
    baseQuery : fetchBaseQuery({baseUrl : process.env.NEXT_PUBLIC_BASE_URL+"/user" ,
        headers:{
            token:getCookie("token") as string
        } 
    }),
    endpoints:(build) => ({

        getUserProfileData:build.query<userProfileTypes,any>({
            query:() => "/findUser",
            providesTags:["user"]
        }),

        getSingleUser:build.query<userProfileTypes,string>({
            query:(id) => `/getSingleUser/${id}`,
            providesTags:["user"]
        }),

        onUpdateUser:build.mutation<userProfileTypes,userProfileTypes>({
            
            query:(body) => ({
                url:`/updateUser`,
                method:"POST",
                body:body
            }),
            invalidatesTags:["user"]

        }),

        onSingleDeleteUser:build.mutation<any,singleDeleteUserModel>({
            
            query:(body) => ({
                url:`/singleDeleteUser`,
                method:"DELETE",
                body:body
            }),
            invalidatesTags:["user"]

        }),

        onMultiDeleteUser:build.mutation<any,multiDeleteUserModel>({
            
            query:(body) => ({
                url:`/multiDeleteUser`,
                method:"DELETE",
                body:body
            }),
            invalidatesTags:["user"]

        }),

        getAllUserList:build.query<userProfileTypes[],any>({
            query : () => "/allUser",
            providesTags:["user"]
        }),

        searchUserList:build.query<userProfileTypes[],any>({
            query : (searchText) => `/searchUser/${searchText}`,
            providesTags:["user"]
        }),


    }),
});

export const {useGetUserProfileDataQuery , useOnUpdateUserMutation , useGetAllUserListQuery , useOnSingleDeleteUserMutation,useOnMultiDeleteUserMutation , useSearchUserListQuery , useGetSingleUserQuery} = userApi