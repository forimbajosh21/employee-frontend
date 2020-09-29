import React from 'react'
import Container from '@material-ui/core/Container'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { toggleModal } from '../../store/reducers/_employee'

// components
import Appbar from '../../components/organisms/Appbar'
import Topbar from '../../components/organisms/Topbar'
import CreateModal from '../../components/organisms/CreateModal'

const Home = () => {
  const dispatch = useDispatch()
  const { modal: { open } } = useSelector(state => state.employee)

  const toggleCreateModal = () => {
    dispatch(toggleModal())
  }
  return (
    <>
      <Appbar />
      <Container>
        <Topbar addFunc={toggleCreateModal} />
      </Container>
      <CreateModal open={open} closeFunc={toggleCreateModal} />
    </>
  )
}

export default Home
