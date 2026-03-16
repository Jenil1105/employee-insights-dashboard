import './App.css'
import "leaflet/dist/leaflet.css"
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import List from './pages/List'
import ProtectedRoute from './components/ProtectedRoute'
import Details from './pages/Details'
import Analytics from './pages/Analytics'
import { DataProvider } from './context/dataContext'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<DataProvider />}>
          <Route path='/list' element={<List />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/details/:id' element={<Details />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
