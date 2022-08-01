import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reduxSlices/counter/counterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer
  }
})