import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'notification',
  initialState: {
    lists: [] // List of Notification { message: string, key: mixed }
  },
  reducers: {
    setNotificationList: (state, { payload }) => {
      const { data } = payload
      if (data !== null) {
        state.lists = [...state.lists, data]
      } else {
        state.lists = state.lists.slice(1)
      }
    }
  },
  extraReducers: {
    'employee/createAPI/rejected': (state, { payload }) => {
      const { error } = payload
      const data = {
        message: error.message,
        key: new Date().getTime()
      }
      state.lists = [...state.lists, data]
    },
    'employee/createAPI/fulfilled': (state) => {
      const data = {
        message: 'Employee created successfully',
        key: new Date().getTime()
      }
      state.lists = [...state.lists, data]
    },
    'employee/deleteAPI/fulfilled': (state) => {
      const data = {
        message: 'Employee deleted successfully',
        key: new Date().getTime()
      }
      state.lists = [...state.lists, data]
    },
    'employee/updateAPI/fulfilled': (state) => {
      const data = {
        message: 'Employee updated successfully',
        key: new Date().getTime()
      }
      state.lists = [...state.lists, data]
    }
  }
})

const { actions, reducer } = slice
const { setNotificationList } = actions

export { setNotificationList }
export default reducer
