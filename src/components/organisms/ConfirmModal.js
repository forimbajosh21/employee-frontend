import React from 'react'
import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

import CloseIcon from '@material-ui/icons/Close'

const ConfirmModal = ({ open, title, text, okFunc, cancelFunc }) => {
  return (
    <Dialog
      fullWidth disableBackdropClick disableEscapeKeyDown open={open} maxWidth='sm' scroll='body'
    >
      <Box position='absolute' right={10} top={10}>
        <IconButton size='small' onClick={cancelFunc}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelFunc}>
          Cancel
        </Button>
        <Button color='secondary' onClick={okFunc}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmModal
