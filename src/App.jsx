import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import List from './pages/List'
import ProtectedRoute from './components/ProtectedRoute'
import Details from './pages/Details'

function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/list' element={
        <ProtectedRoute>
          <List /> 
        </ProtectedRoute>
      } />
      <Route path='/details/:id' element={<Details />} />
    </Routes>
  )
}

export default App
