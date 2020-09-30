import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import useTheme from '@material-ui/core/styles/useTheme'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import makeStyles from '@material-ui/core/styles/makeStyles'

import AddRoundedIcon from '@material-ui/icons/AddRounded'

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 100
  }
}))

const Topbar = ({ addFunc }) => {
  const theme = useTheme()
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'))
  const classes = useStyles()
  return (
    <>
      {!xsDown && (
        <Toolbar>
          <Box display='inline-block' flexGrow={1}>
            <Button disableElevation variant='contained' color='primary' onClick={addFunc}>Add New Employee</Button>
          </Box>
        </Toolbar>
      )}
      {xsDown && (
        <Fab color='primary' variant='round' className={classes.fab} onClick={addFunc}>
          <AddRoundedIcon />
        </Fab>
      )}
    </>
  )
}

export default Topbar
