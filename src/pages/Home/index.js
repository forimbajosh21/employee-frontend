import React from 'react'
import Container from '@material-ui/core/Container'
import Toolbar from '@material-ui/core/Toolbar'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { toggleCreateModal } from '../../store/reducers/_employee'

// components
import Appbar from '../../components/organisms/Appbar'
import Topbar from '../../components/organisms/Topbar'
import CreateEmployeeModal from '../../components/organisms/CreateEmployeeModal'
import EmployeeList from '../../components/organisms/EmployeeList'

const Home = () => {
  const dispatch = useDispatch()
  const { modal: { createOpen } } = useSelector(state => state.employee)

  const toggleCreate = () => {
    dispatch(toggleCreateModal())
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
    </>
  )
}

export default Home
