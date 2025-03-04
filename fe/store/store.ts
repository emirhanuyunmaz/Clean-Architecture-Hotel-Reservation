import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './auth/authApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from './user/userApi'


export const store = configureStore({
    reducer:{
        [authApi.reducerPath] : authApi.reducer,
        [userApi.reducerPath] : userApi.reducer,
    },
    middleware:(getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(userApi.middleware)
})

setupListeners(store.dispatch)