import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

// Redux
import { Provider } from 'react-redux'
import store from './store'

// Material Ui Theme
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './utils/theme'

// Datepicker
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

// pages
import Home from './pages/Home'

// components
import Notification from './components/atoms/Notification'

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <CssBaseline />
          <Home />
          <Notification />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
