import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Rotas } from './Rotas'
import { Menu } from './pages/Menu/Menu'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Rotas/>
    {/* <Menu /> */}
  </StrictMode>,
)
