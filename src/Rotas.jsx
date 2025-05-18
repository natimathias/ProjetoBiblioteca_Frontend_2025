import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Menu } from "./pages/Menu/Menu";
import { Login } from "./pages/Login/Login";
import { Pesquisar } from "./pages/Pesquisar/Pesquisar";
import { Catalogo } from "./pages/catalogo/Catalogo";
import { Dados } from "./pages/Dados/Dados";

export function Rotas() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/login" element={<Login />} />
                <Route path="/pesquisar" element={<Pesquisar />} />
                {/* <Route path="/catalogo" element={<Catalogo />}/>
                <Route path="/Dados" element={<Dados/>} /> */}
            </Routes>
        </BrowserRouter>
    )
}