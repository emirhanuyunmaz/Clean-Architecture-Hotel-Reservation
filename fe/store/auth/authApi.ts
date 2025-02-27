import { loginGetDataTypes, loginPostDataTypes } from '@/types/auth/loginTypes'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath:'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
    endpoints:(build) => ({
        
        deneme:build.query<any,any>({
            query : () => ``
        }),

        login:build.mutation<loginGetDataTypes,loginPostDataTypes>({
            
            query:(body) => ({
                url:`/user/login`,
                method:"POST",
                body:body
            })

        }),

        signup:build.mutation<createUserGetPost,createUserGetPost>({

            query:(body) => ({
                url : `/user/createUser`,
                method:"POST",
                body:body
            })

        }),



    })
})

export const { useDenemeQuery,useLoginMutation,useSignupMutation } = authApi

