import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './auth/authApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from './user/userApi'
import { bookApi } from './book/bookApi'


export const store = configureStore({
    reducer:{
        [authApi.reducerPath] : authApi.reducer,
        [userApi.reducerPath] : userApi.reducer,
        [bookApi.reducerPath]:bookApi.reducer
    },
    middleware:(getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(userApi.middleware)
            .concat(bookApi.middleware)
})

setupListeners(store.dispatch)