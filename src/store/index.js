import {configureStore} from '@reduxjs/toolkit'
import myGridApi from './myGridApi'

const store = configureStore({
    reducer: {
        [myGridApi.reducerPath]: myGridApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(myGridApi.middleware)
})

export default store