import React from 'react'
import Container from '@material-ui/core/Container'
import Toolbar from '@material-ui/core/Toolbar'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { toggleCreateModal, toggleUpdateModal } from '../../store/reducers/_employee'

// components
import Appbar from '../../components/organisms/Appbar'
import Topbar from '../../components/organisms/Topbar'
import CreateEmployeeModal from '../../components/organisms/CreateEmployeeModal'
import EmployeeList from '../../components/organisms/EmployeeList'
import UpdateEmployeeModal from '../../components/organisms/UpdateEmployeeModal'

const Home = () => {
  const dispatch = useDispatch()
  const { modal: { createOpen, updateOpen } } = useSelector(state => state.employee)

  const toggleCreate = () => {
    dispatch(toggleCreateModal())
  }

  const toggleUpdate = () => {
    dispatch(toggleUpdateModal())
  }
  return (
    <>
      <Appbar />
      <Container>
        <Topbar addFunc={toggleCreate} />
        <Toolbar />
        <EmployeeList />
      </Container>
      <CreateEmployeeModal open={createOpen} closeFunc={toggleCreate} />
      <UpdateEmployeeModal open={updateOpen} closeFunc={toggleUpdate} />
    </>
  )
}

export default Home
