import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto',
          minHeight: '100vh',
          scrollBehavior: 'smooth'
        },
        body: {
          minHeight: '100vh'
        }
      }
    },
    MuiButton: {
      root: {
        textTransform: 'none',
        fontWeight: 'bold'
      }
    }
  },
  palette: {
    primary: {
      main: '#1abc9c',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#e74c3c'
    },
    error: {
      main: '#e74c3c'
    },
    warning: {
      main: '#e67e22'
    }
  }
})

export default theme
