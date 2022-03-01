import './App.css'
import RegisterUser from './components/registerUser/registerUser'
import React from 'react'
import UserList from './views/userList/userList'
import Search from './components/searchComponent/search'
import SaveInformation from './components/saveInformation/saveInformation'
import { Route } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

function App() {
  return (
    <SnackbarProvider
      maxSnack={1}
      autoHideDuration={3000}
    >
    <div className="App">
      <Search />
      <UserList />
      <SaveInformation />
    </div>
    </SnackbarProvider>
  )
}

export default App
