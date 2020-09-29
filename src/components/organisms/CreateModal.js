import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Slide from '@material-ui/core/Slide'
import Fade from '@material-ui/core/Fade'
import useTheme from '@material-ui/core/styles/useTheme'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import CloseIcon from '@material-ui/icons/Close'

// components
import EmployeeForm from '../molecules/EmployeeForm'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const TransitionDefault = React.forwardRef(function Transition (props, ref) {
  return <Fade direction='up' ref={ref} {...props} />
})

const CreateModal = ({ open, closeFunc }) => {
  const theme = useTheme()
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'))
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
        <Button color='secondary' onClick={closeFunc}>
          Cancel
        </Button>
        <Button color='primary'>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateModal
