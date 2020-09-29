import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import moment from 'moment'
import axios from '../../utils/axios.config'

/**
 * Get Employees
 */
export const lists = createAsyncThunk('employee/lists', async (payloadObj, { rejectWithValue }) => {
  try {
    const response = await axios.get('/employees', payloadObj)
    const { result, data } = response.data
    return { result, data }
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

/**
 * Create employee
 */
export const create = createAsyncThunk('employee/create', async (payloadObj, { rejectWithValue }) => {
  try {
    const response = await axios.post('/employees', payloadObj)
    const { result, data } = response.data
    return { result, data }
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

const slice = createSlice({
  name: 'employee',
  initialState: {
    lists: [], // List of Employees
    modal: {
      open: false
    },
    form: {
      firstname: '',
      lastname: '',
      birthdate: moment().format('YYYY-MM-DD'),
      address: '',
      status: '',
      team: ''
    }
  },
  reducers: {
    toggleModal: (state) => {
      state.modal.open = !state.modal.open
    },
    setFormState: (state, { payload }) => {
      const { current, data } = payload
      state.form[current] = data
    }
  },
  extraReducers: {
    [lists.fulfilled]: (state, { payload }) => {
      const { data } = payload
      if (Array.isArray(data)) {
        state.lists = data
      }
    },
    [create.fulfilled]: (state, { payload }) => {
      const { data } = payload
      if (Object.isObject(data)) {
        state.lists.push(data)
      }
    }
  }
})

const { actions, reducer } = slice
const { toggleModal, setFormState } = actions

export { toggleModal, setFormState }
export default reducer
