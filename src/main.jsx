import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Principal from './Principal.jsx'
import PaginaPesquisar from './Pesquisar.jsx'
import Pesquisar from './Pesquisar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Principal/> */}
    <Pesquisar/>
  </StrictMode>,
)
