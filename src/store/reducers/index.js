import { combineReducers } from '@reduxjs/toolkit'

import EmployeeReducer from './_employee'

const rootReducer = combineReducers({
  employee: EmployeeReducer,
  devTools: process.env.NODE_ENV !== 'production'
})

export default rootReducer
