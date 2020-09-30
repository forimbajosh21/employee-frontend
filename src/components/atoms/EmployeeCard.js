import React from 'react'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'

import PersonRoundedIcon from '@material-ui/icons/PersonRounded'
import CreateRoundedIcon from '@material-ui/icons/CreateRounded'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'

const useStyles = makeStyles((theme) => ({
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
  const classes = useStyles()
  return (
    <Card>
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
      <CardActions classes={{ root: classes.actions }}>
        <IconButton color='primary' onClick={editFunc}><CreateRoundedIcon fontSize='small' /></IconButton>
        <IconButton color='secondary' onClick={deleteFunc}><DeleteRoundedIcon fontSize='small' /></IconButton>
      </CardActions>
    </Card>
  )
}

export default EmployeeCard
