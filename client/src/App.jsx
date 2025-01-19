import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import All from './components/All'
import { BrowserRouter as Router, Routes,Route,useLocation } from 'react-router-dom'
import Details from './components/Details'
function App() {
  // const location = useLocation();
  // const formData=location.state || {};
  const [count, setCount] = useState(0)
 
  return (
    <>
      <Router>
        <Routes>

          <Route path="/" element={<All />}></Route>
          <Route path="/details" element={<Details />}></Route>
        </Routes>
      </Router>
   
    </>
  )
}


export default App
