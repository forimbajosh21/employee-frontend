import React from 'react'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'

// redux
import { useDispatch } from 'react-redux'
import { setFormState, deleteAPI, toggleUpdateModal } from '../../store/reducers/_employee'

// components
import EmployeeCard from '../atoms/EmployeeCard'
import ConfirmModal from '../../components/organisms/ConfirmModal'

const useStyles = makeStyles((theme) => ({
}))

const EmployeeListView = ({ loading, lists }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [openConfirm, setopenConfirm] = React.useState(false)

  const editFunc = (data) => {
    const transformed = {
      _id: data._id,
      firstname: data.first_name,
      lastname: data.last_name,
      birthdate: data.birthdate,
      address: data.address,
      status: data.status,
      team: data.team
    }
    dispatch(setFormState({ current: 'form', data: transformed }))
    dispatch(toggleUpdateModal())
  }

  const deleteFunc = (id) => {
    dispatch(setFormState({ current: '_id', data: id }))
    setopenConfirm(true)
  }

  const okFunc = () => {
    dispatch(deleteAPI())
    setopenConfirm(false)
  }
  const cancelFunc = () => {
    setopenConfirm(false)
  }

  return (
    <>
      <Grid container spacing={2}>
        {lists.map((li, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index} className={classes.cardContainer}>
            <EmployeeCard firstname={li.first_name} lastname={li.last_name} status={li.status} team={li.team} address={li.address} birthdate={li.birthdate} editFunc={() => editFunc(li)} deleteFunc={() => deleteFunc(li._id)} />
          </Grid>
        ))}
      </Grid>
      <ConfirmModal open={openConfirm} title='Delete Employee' text='Are you sure you want to delete this employee?' okFunc={okFunc} cancelFunc={cancelFunc} />
    </>
  )
}

export default EmployeeListView
