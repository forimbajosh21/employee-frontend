import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import moment from 'moment'
import axios from '../../utils/axios.config'

/**
 * Get Employees
 */
export const listsAPI = createAsyncThunk('employee/listsAPI', async (payloadObj, { rejectWithValue }) => {
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
export const createAPI = createAsyncThunk('employee/createAPI', async (payloadObj, { rejectWithValue, getState }) => {
  try {
    const { employee: { form } } = getState()
    const payload = {
      first_name: form.firstname,
      last_name: form.lastname,
      birthdate: form.birthdate,
      address: form.address,
      status: form.status,
      team: form.team
    }

    const response = await axios.post('/employees', payload)
    const { result, data } = response.data
    return { result, data }
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

/**
 * Delete employee
 */
export const deleteAPI = createAsyncThunk('employee/deleteAPI', async (payloadObj, { rejectWithValue, getState }) => {
  try {
    const { employee: { form } } = getState()

    await axios.post(`/employees/${form._id}/delete`)
    return { data: form._id }
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

const slice = createSlice({
  name: 'employee',
  initialState: {
    lists: [], // List of Employees
    viewMode: 'list', // display type: list, tile
    modal: {
      createOpen: false,
      updateOpen: false
    },
    form: {
      loading: false,
      _id: '',
      firstname: '',
      lastname: '',
      birthdate: moment().format('YYYY-MM-DD'),
      address: '',
      status: '',
      team: ''
    },
    formError: {
      firstname: false,
      lastname: false,
      birthdate: false,
      status: false,
      team: false
    }
  },
  reducers: {
    changeViewMode: (state, { payload }) => {
      const { data } = payload
      state.viewMode = data
    },
    toggleCreateModal: (state) => {
      state.modal.createOpen = !state.modal.createOpen

      // reset form and form error data
      // only do it when opening the modal to prevent Content jumping
      if (state.modal.createOpen) {
        state.form = {
          firstname: '',
          lastname: '',
          birthdate: moment().format('YYYY-MM-DD'),
          address: '',
          status: '',
          team: ''
        }
        state.formError = {
          firstname: false,
          lastname: false,
          birthdate: false,
          status: false,
          team: false
        }
      }
    },
    setFormState: (state, { payload }) => {
      const { current, data } = payload
      state.form[current] = data
    },
    setFormErrorState: (state, { payload }) => {
      const { data } = payload
      state.formError = data
    }
  },
  extraReducers: {
    [listsAPI.fulfilled]: (state, { payload }) => {
      const { data } = payload
      if (Array.isArray(data)) {
        state.lists = data
      }
    },
    [createAPI.pending]: (state) => {
      state.form.loading = true
    },
    [createAPI.fulfilled]: (state, { payload }) => {
      const { data } = payload
      if (typeof data === 'object') {
        state.lists.push(data)
      }
      state.form.loading = false
      state.modal.open = false
    },
    [createAPI.rejected]: (state, { payload }) => {
      state.form.loading = false
    },
    [deleteAPI.fulfilled]: (state, { payload }) => {
      const { data } = payload
      state.lists = state.lists.filter(li => li._id !== data)
    }
  }
})

const { actions, reducer } = slice
const { removeItemInList, changeViewMode, toggleCreateModal, setFormState, setFormErrorState } = actions

export { removeItemInList, changeViewMode, toggleCreateModal, setFormState, setFormErrorState }
export default reducer
