import React from 'react'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import Grow from '@material-ui/core/Grow'
import Slide from '@material-ui/core/Slide'
import makeStyles from '@material-ui/core/styles/makeStyles'
import useTheme from '@material-ui/core/styles/useTheme'
import useMediaQuery from '@material-ui/core/useMediaQuery'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationList } from '../../store/reducers/_notification'

function GrowTransition (props) {
  return <Grow {...props} />
}

function SlideTransition (props) {
  return <Slide {...props} direction='up' />
}

const useStyles = makeStyles((theme) => ({
  snackbar: {
    maxWidth: 500,
    [theme.breakpoints.down('xs')]: {
      maxWidth: 'auto'
    }
  }
}))

const Notification = () => {
  const theme = useTheme()
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'))
  const classes = useStyles()
  const dispatch = useDispatch()
  const { modal: { createOpen, updateOpen } } = useSelector(state => state.employee)
  const { lists } = useSelector(state => state.notification)
  const [open, setOpen] = React.useState(false)
  const [messageInfo, setMessageInfo] = React.useState(undefined)

  React.useEffect(() => {
    if (lists.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...lists[0] })
      dispatch(setNotificationList({ data: null }))
      setOpen(true)
    } else if (lists.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false)
    }
  }, [lists, messageInfo, open, dispatch])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleExited = () => {
    setMessageInfo(undefined)
  }

  // change anchor and transition depending on the screen size
  const anchor = xsDown ? { vertical: 'bottom', horizontal: 'center' } : { vertical: 'top', horizontal: 'right' }
  const transition = xsDown ? SlideTransition : GrowTransition
  const bottom = xsDown ? (createOpen || updateOpen) ? 8 : 90 : 'auto'

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      onExited={handleExited}
      message={messageInfo ? messageInfo.message : undefined}
      action={
        <Button color='primary' size='small' onClick={handleClose}>
          Ok
        </Button>
      }
      className={classes.snackbar}
      anchorOrigin={anchor}
      TransitionComponent={transition}
      style={{ bottom: bottom }}
    />
  )
}

export default Notification
