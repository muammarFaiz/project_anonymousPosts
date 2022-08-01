import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reduxSlices/counter/counterSlice'
import memoryReducer from './reduxSlices/mainstates/mainstates'

export default configureStore({
  reducer: {
    counter: counterReducer,
    memory: memoryReducer
  }
})