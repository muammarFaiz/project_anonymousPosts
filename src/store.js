import { configureStore } from '@reduxjs/toolkit'
import memoryReducer from './reduxSlices/mainstates/mainstates'

export default configureStore({
  reducer: {
    memory: memoryReducer
  }
})