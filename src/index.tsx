import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {store} from './state/store/configureStore'
const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(210, 90, 93)"
    },
    secondary: {
      main: "#ffcc80"
    }
  }
})
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
