import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Slide from '@material-ui/core/Slide'
import Fade from '@material-ui/core/Fade'
import useTheme from '@material-ui/core/styles/useTheme'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import CloseIcon from '@material-ui/icons/Close'

// redux
import { useDispatch, useSelector } from 'react-redux'

// components
import EmployeeForm from '../molecules/EmployeeForm'
import { createAPI, setFormErrorState } from '../../store/reducers/_employee'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const TransitionDefault = React.forwardRef(function Transition (props, ref) {
  return <Fade direction='up' ref={ref} {...props} />
})

const CreateEmployeeModal = ({ open, closeFunc }) => {
  const theme = useTheme()
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'))
  const dispatch = useDispatch()
  const { form: { loading, firstname, lastname, birthdate, status, team } } = useSelector(state => state.employee)

  const validFormData = () => {
    if (!firstname || !lastname || !birthdate || !status || !team) {
      dispatch(setFormErrorState({
        data: {
          firstname: !firstname,
          lastname: !lastname,
          birthdate: !birthdate,
          status: !status,
          team: !team
        }
      }))
      return false
    }

    return true
  }

  const createFunc = () => {
    if (validFormData()) {
      dispatch(createAPI())
    }
  }

  return (
    <Dialog
      fullWidth disableBackdropClick disableEscapeKeyDown open={open} maxWidth='sm' scroll='body'
      fullScreen={xsDown} TransitionComponent={xsDown ? Transition : TransitionDefault}
    >
      <Box position='absolute' right={10} top={10}>
        <IconButton size='small' onClick={closeFunc}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogTitle>
        Create Employee
      </DialogTitle>
      <DialogContent>
        <EmployeeForm />
      </DialogContent>
      <DialogActions>
        <Button disableElevation fullWidth={xsDown} color='secondary' variant={xsDown ? 'contained' : 'text'} onClick={closeFunc} disabled={loading}>
          Cancel
        </Button>
        <Button disableElevation fullWidth={xsDown} color='primary' variant={xsDown ? 'contained' : 'text'} onClick={createFunc} disabled={loading}>
          {loading ? <CircularProgress size={23} /> : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateEmployeeModal
