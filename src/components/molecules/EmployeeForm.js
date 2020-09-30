import React from 'react'
import ButtonBase from '@material-ui/core/ButtonBase'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import makeStyles from '@material-ui/core/styles/makeStyles'
import useTheme from '@material-ui/core/styles/useTheme'
import useMediaQuery from '@material-ui/core/useMediaQuery'

// date picker
import { DatePicker } from '@material-ui/pickers'

import CameraAltIcon from '@material-ui/icons/CameraAlt'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { setFormState } from '../../store/reducers/_employee'
import { setNotificationList } from '../../store/reducers/_notification'

// moment
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  upload: {
    width: '100%',
    height: 173,
    backgroundColor: theme.palette.grey[200],
    borderRadius: 4,
    border: `1px dashed ${theme.palette.grey[400]}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

    '& svg, p': {
      color: theme.palette.grey[400]
    }
  },
  birthdate: {
    cursor: 'pointer !important'
  }
}))

const EmployeeForm = () => {
  const theme = useTheme()
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'))
  const classes = useStyles()
  const dispatch = useDispatch()
  const { form: { loading, firstname, lastname, birthdate, address, status, team }, formError } = useSelector(state => state.employee)

  const onClickImage = () => {
    dispatch(setNotificationList({ data: { message: 'Please neglect. This is a dummy feature. Thank you!', key: new Date().getTime() } }))
  }

  const onChange = (ev) => {
    dispatch(setFormState({ current: ev.target.name, data: ev.target.value }))
  }

  const onChangeBirthdate = (value) => {
    dispatch(setFormState({ current: 'birthdate', data: moment(value).format('YYYY-MM-DD') }))
  }

  // change datepicker view depending on screen size
  const datePickerVariant = xsDown ? 'dialog' : 'inline'

  return (
    <>
      <Box className={classes.upload} component={ButtonBase} onClick={onClickImage}>
        <Box>
          <CameraAltIcon color='action' />
        </Box>
        <Box>
          <Typography color='textSecondary'>Upload Image</Typography>
        </Box>
      </Box>
      <Box mt={3} mb={2}>
        <Typography color='textSecondary'>First Name</Typography>
        <FormControl fullWidth error={formError.lastname}>
          <TextField
            fullWidth
            variant='outlined'
            placeholder='First Name'
            margin='dense'
            name='firstname'
            value={firstname}
            onChange={onChange}
            error={formError.lastname}
            disabled={loading}
          />
          {formError.firstname && (
            <FormHelperText>First Name is required</FormHelperText>
          )}
        </FormControl>
      </Box>
      <Box mb={2}>
        <Typography color='textSecondary'>Last Name</Typography>
        <FormControl fullWidth error={formError.lastname}>
          <TextField
            fullWidth
            variant='outlined'
            placeholder='Last Name'
            margin='dense'
            name='lastname'
            value={lastname}
            onChange={onChange}
            error={formError.lastname}
            disabled={loading}
          />
          {formError.lastname && (
            <FormHelperText>Last Name is required</FormHelperText>
          )}
        </FormControl>
      </Box>
      <Box mb={2}>
        <Typography color='textSecondary'>Birthdate</Typography>
        <DatePicker
          fullWidth
          autoOk
          disableFuture
          animateYearScrolling
          minDate='1950-01-01'
          maxDate='2030-01-01'
          margin='dense'
          variant={datePickerVariant}
          inputVariant='outlined'
          format='YYYY-MM-DD'
          name='birthdate'
          value={moment(birthdate).format('YYYY-MM-DD')}
          onChange={onChangeBirthdate}
          error={formError.birthdate}
          helperText={formError.birthdate && 'Birthdate is required'}
          disabled={loading}
        />
      </Box>
      <Box mb={2}>
        <Typography color='textSecondary'>Address</Typography>
        <TextField
          fullWidth
          multiline
          variant='outlined'
          placeholder='Address'
          margin='dense'
          rows={4}
          rowsMax={4}
          name='address'
          value={address}
          onChange={onChange}
          disabled={loading}
        />
      </Box>
      <Box mb={2}>
        <Typography color='textSecondary'>Status</Typography>
        <FormControl fullWidth error={formError.status}>
          <Select
            fullWidth
            variant='outlined'
            margin='dense'
            name='status'
            value={status}
            onChange={onChange}
            disabled={loading}
          >
            <MenuItem value='probationary'>Probationary</MenuItem>
            <MenuItem value='regular'>Regular</MenuItem>
            <MenuItem value='resigned'>Resigned</MenuItem>
          </Select>
          {formError.status && (
            <FormHelperText>Status is required</FormHelperText>
          )}
        </FormControl>
      </Box>
      <Box mb={2}>
        <Typography color='textSecondary'>Team</Typography>
        <FormControl fullWidth error={formError.team}>
          <Select
            fullWidth
            variant='outlined'
            margin='dense'
            name='team'
            value={team}
            onChange={onChange}
            disabled={loading}
          >
            <MenuItem value='it'>IT</MenuItem>
            <MenuItem value='hr'>HR</MenuItem>
            <MenuItem value='finance'>Finance</MenuItem>
          </Select>
          {formError.team && (
            <FormHelperText>Team is required</FormHelperText>
          )}
        </FormControl>
      </Box>
    </>
  )
}

export default EmployeeForm
