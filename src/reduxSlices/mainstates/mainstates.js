import { createSlice } from '@reduxjs/toolkit'

export const memorySlice = createSlice({
  name: 'memory',
  initialState: {
    mainLoading: false,
    loginStatus: 'loading'
  },
  reducers: {
    mainLoadingSwitch: state => {
      state.mainLoading = state.mainLoading ? false : true
    },
    setLoginStatus: (state, action) => {
      state.loginStatus = action.payload
    }
  }
})

export const {mainLoadingSwitch, setLoginStatus} = memorySlice.actions

const memoryReducer = memorySlice.reducer
export default memoryReducer