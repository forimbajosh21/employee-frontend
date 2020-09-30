import { combineReducers } from '@reduxjs/toolkit'

import EmployeeReducer from './_employee'
import NotificationReducer from './_notification'

const rootReducer = combineReducers({
  employee: EmployeeReducer,
  notification: NotificationReducer,
  devTools: process.env.NODE_ENV !== 'production'
})

export default rootReducer
