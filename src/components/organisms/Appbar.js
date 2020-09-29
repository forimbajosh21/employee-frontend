import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import useTheme from '@material-ui/core/styles/useTheme'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import withStyles from '@material-ui/core/styles/withStyles'

const LightAppBar = withStyles({
  root: {
    background: '#ffffff',
    color: 'inherit'
  }
})(AppBar)

const Appbar = () => {
  const theme = useTheme()
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <>
      <LightAppBar elevation={0}>
        <Container disableGutters={xsDown}>
          <Toolbar>
            <Box flexGrow={1}>
              <Typography variant='h6'>Employees</Typography>
            </Box>
          </Toolbar>
        </Container>
      </LightAppBar>
      <Toolbar />
    </>
  )
}

export default Appbar
