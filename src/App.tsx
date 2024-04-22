import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Inicio} from './Pages/inicio'
import {Home} from './Pages/home'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Inicio/>} />
          <Route path='/home' element={<Home/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
