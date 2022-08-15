import { createSlice } from '@reduxjs/toolkit'

export const memorySlice = createSlice({
  name: 'memory',
  initialState: {
    mainLoading: false,
    loginStatus: 'loading',
    messageContent: '',
    deleteSecretN: '',
    poststatus: '',
    capslock: '',
    userImgSrc: '',
    userinfo: '',
    showChangeImg: '',
    showEditProfile: '',
    showTopnavDropdown: '',
    refreshCommSect: '',
    showauserinfo: '',
    profileBookmark: ''
  },
  reducers: {
    mainLoadingSwitch: state => {
      state.mainLoading = state.mainLoading ? false : true
    },
    setLoginStatus: (state, action) => {
      state.loginStatus = action.payload
    },
    setMessageContent: (state, action) => {
      // {title: 'something', description: 'some'}
      state.messageContent = action.payload
    },
    setDeleteSecretN: (state, action) => {
      state.deleteSecretN = action.payload
    },
    setPoststatus: (state, action) => {
      state.poststatus = action.payload
    },
    setCapslock: (state, action) => {
      state.capslock = action.payload
    },
    setUserImgSrc: (state, action) => {
      state.userImgSrc = action.payload
    },
    setUserinfo: (state, action) => {
      state.userinfo = action.payload
    },
    setShowChangeImg: (state, action) => {
      state.showChangeImg = action.payload
    },
    setShowEditProfile: (state, action) => {
      state.showEditProfile = action.payload
    },
    showTopnavDropdownSwitch: state => {
      state.showTopnavDropdown = state.showTopnavDropdown ? false : true
    },
    setRefreshCommSect: (state, action) => {
      state.refreshCommSect = action.payload
    },
    setShowauserinfo: (state, action) => {
      state.showauserinfo = action.payload
    },
    setProfileBookmark: (state, action) => {
      state.profileBookmark = action.payload
    }
  }
})

export const {
  mainLoadingSwitch, setLoginStatus, setMessageContent, setDeleteSecretN, setPoststatus, setCapslock,
  setUserImgSrc, setUserinfo, setShowChangeImg, setShowEditProfile, showTopnavDropdownSwitch, setRefreshCommSect,
  setShowauserinfo, setProfileBookmark
} = memorySlice.actions

const memoryReducer = memorySlice.reducer
export default memoryReducer