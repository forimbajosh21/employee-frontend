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

import { motion, AnimatePresence } from 'framer-motion'

// redux
import { useDispatch, useSelector } from 'react-redux'

// components
import EmployeeForm from '../molecules/EmployeeForm'
import { updateAPI, setFormErrorState } from '../../store/reducers/_employee'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const TransitionDefault = React.forwardRef(function Transition (props, ref) {
  return <Fade direction='up' ref={ref} {...props} />
})

const UpdateEmployeeModal = ({ open, closeFunc }) => {
  const theme = useTheme()
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'))
  const dispatch = useDispatch()
  const { lists, form: { loading, _id, firstname, lastname, birthdate, address, status, team } } = useSelector(state => state.employee)
  const [hasChanged, setHasChanged] = React.useState(false)

  React.useEffect(() => {
    const listOfEmployee = lists
    const original = listOfEmployee.filter(li => { return li._id === _id })
    if (original.length > 0) {
      if (
        original[0].first_name !== firstname ||
        original[0].last_name !== lastname ||
        original[0].birthdate !== birthdate ||
        original[0].address !== address ||
        original[0].status !== status ||
        original[0].team !== team
      ) {
        setHasChanged(true)
      } else {
        setHasChanged(false)
      }
    }
  }, [open, lists, _id, firstname, lastname, birthdate, address, status, team])

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
      dispatch(updateAPI())
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
        Employee
      </DialogTitle>
      <DialogContent>
        <EmployeeForm />
      </DialogContent>
      <DialogActions>
        <Box minHeight={36} width='100%'>
          <AnimatePresence>
            {hasChanged && (
              <motion.div initial={{ y: -15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -15, opacity: 0 }} transition={{ ease: 'easeInOut' }} style={{ width: '100%', textAlign: 'right' }}>
                <Button disableElevation fullWidth={xsDown} color='primary' variant={xsDown ? 'contained' : 'text'} onClick={createFunc} disabled={loading}>
                  {loading ? <CircularProgress size={23} /> : 'Update'}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateEmployeeModal
