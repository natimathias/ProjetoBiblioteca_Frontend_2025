import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import Principal from './Principal.jsx'
// import Pesquisar from './Pesquisar.jsx'
import Login from './Login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Principal/> */}
    {/* <Pesquisar/> */}
    <Login/>
  </StrictMode>,
)
