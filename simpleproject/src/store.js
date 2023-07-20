import {configureStore} from "@reduxjs/toolkit"
import tasksReducer from './slice/tasksSlice'

export let store=configureStore({
    reducer:{
        tasks:tasksReducer
    }
})