import React from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { listsAPI } from '../../store/reducers/_employee'

// components
import EmployeeListView from '../molecules/EmployeeListView'

const EmployeeList = () => {
  const dispatch = useDispatch()
  const { lists } = useSelector(state => state.employee)

  React.useEffect(() => {
    dispatch(listsAPI())
  }, [dispatch])

  return (
    <EmployeeListView lists={lists} />
  )
}

export default EmployeeList
