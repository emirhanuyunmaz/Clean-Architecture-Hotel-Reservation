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

        onUpdateUser:build.mutation<userProfileTypes,userProfileTypes>({
            
            query:(body) => ({
                url:`/updateUser`,
                method:"POST",
                body:body
            })

        }),

        getAllUserList:build.query<userProfileTypes[],any>({
            query : () => "/allUser",
            providesTags:["user"]
        })


    }),
});

export const {useGetUserProfileDataQuery , useOnUpdateUserMutation , useGetAllUserListQuery } = userApi