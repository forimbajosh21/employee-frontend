import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import ButtonGroup from '@material-ui/core/ButtonGroup'

import ListRoundedIcon from '@material-ui/icons/ListRounded'
import AppsRoundedIcon from '@material-ui/icons/AppsRounded'

const Topbar = ({ addFunc }) => {
  return (
    <Toolbar>
      <Box display='inline-block' flexGrow={1}>
        <Button disableElevation variant='contained' color='primary' onClick={addFunc}>Add New Employee</Button>
      </Box>
      {/* <Box>
        <ButtonGroup disableElevation color='primary' aria-label='outlined primary button group'>
          <Button>
            <AppsRoundedIcon />
          </Button>
          <Button>
            <ListRoundedIcon />
          </Button>
        </ButtonGroup>
      </Box> */}
    </Toolbar>
  )
}

export default Topbar
