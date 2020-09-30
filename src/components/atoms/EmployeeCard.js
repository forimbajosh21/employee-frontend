import React from 'react'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import useTheme from '@material-ui/core/styles/useTheme'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import makeStyles from '@material-ui/core/styles/makeStyles'

import PersonRoundedIcon from '@material-ui/icons/PersonRounded'
import CreateRoundedIcon from '@material-ui/icons/CreateRounded'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'

import { motion } from 'framer-motion'

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down('xs')]: {
      backgroundColor: theme.palette.error.light,
      borderRadius: 5,
      position: 'relative'
    }
  },
  draggableContainer: {
    position: 'relative',
    zIndex: 2
  },
  deleteContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    height: '100%',
    width: '50%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 1,

    '& svg': {
      color: '#ffffff',
      fontSize: 80
    }
  },
  card: {
    cursor: 'pointer'
  },
  image: {
    width: '100%',
    height: 173,
    backgroundColor: theme.palette.grey[200],
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

    '& svg, p': {
      color: theme.palette.grey[400]
    }
  },
  actions: {
    justifyContent: 'flex-end'
  }
}))

const EmployeeCard = ({ firstname, lastname, status, team, address, birthdate, editFunc, deleteFunc }) => {
  const theme = useTheme()
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'))
  const classes = useStyles()
  const [drag, setDrag] = React.useState(false)

  React.useEffect(() => {
    if (xsDown) {
      setDrag('x')
    } else {
      setDrag(false)
    }
  }, [xsDown])

  React.useEffect(() => {
    if (xsDown) {
      if (drag === false) {
        setDrag('x')
      }
    }
  }, [drag])

  const changeDragSetting = (movement) => {
    if (xsDown) {
      if (movement > 0) {
        setDrag(false)
      } else {
        setDrag('x')
      }
    }
  }

  const dragDelete = (point) => {
    if (xsDown) {
      if (point < 0) {
        deleteFunc()
      }
    }
  }

  const mobileEditFunc = () => {
    if (xsDown) {
      editFunc()
    }
  }

  return (
    <Box className={classes.container}>
      <motion.div
        dragDirectionLock drag={drag} dragConstraints={{ left: 0, right: 0 }} dragTransition={{ bounceStiffness: 1200, bounceDamping: 100 }} dragElastic={0.15}
        onDragStart={(event, info) => changeDragSetting(event.movementX)}
        onDrag={(event, info) => dragDelete(info.point.x)}
        className={classes.draggableContainer}
      >
        <Card onClick={mobileEditFunc}>
          <Box className={classes.image}>
            <Box>
              <PersonRoundedIcon fontSize='large' />
            </Box>
          </Box>
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {firstname} {lastname}
            </Typography>
            <Box mb={1}>
              <Typography variant='body2' color='textSecondary' component='span'>
                Status:
              </Typography>
          &nbsp;
              <Typography variant='subtitle2' color='primary' component='span'>
                {status.toUpperCase()}
              </Typography>
            </Box>
            <Box mb={1}>
              <Typography variant='body2' color='textSecondary' component='span'>
                Team:
              </Typography>
          &nbsp;&nbsp;
              <Typography variant='subtitle2' color='primary' component='span'>
                {team.toUpperCase()}
              </Typography>
            </Box>
            <Box mb={1}>
              <Typography variant='body2' color='textSecondary' component='span'>
                Birthdate:
              </Typography>
          &nbsp;&nbsp;
              <Typography variant='subtitle2' color='textSecondary' component='span'>
                {birthdate}
              </Typography>
            </Box>
            <Box>
              <Typography variant='body2' color='textSecondary' component='span'>
                Address:
              </Typography>
          &nbsp;&nbsp;
              <Typography variant='subtitle2' color='textSecondary' component='span'>
                {address}
              </Typography>
            </Box>
          </CardContent>
          {!xsDown && (
            <CardActions classes={{ root: classes.actions }}>
              <IconButton color='primary' onClick={editFunc}><CreateRoundedIcon fontSize='small' /></IconButton>
              <IconButton color='secondary' onClick={deleteFunc}><DeleteRoundedIcon fontSize='small' /></IconButton>
            </CardActions>
          )}
        </Card>
      </motion.div>
      <Box className={classes.deleteContainer}>
        <DeleteRoundedIcon />
      </Box>
    </Box>
  )
}

export default EmployeeCard
