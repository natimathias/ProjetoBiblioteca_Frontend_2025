import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Menu } from "./pages/Menu/Menu";
import { Login } from "./pages/Login/Login";
import { Pesquisar } from "./pages/Pesquisar/Pesquisar";
import { Catalogo } from "./pages/Catalogo/Catalogo";
import { MeusDados } from "./pages/MeusDados/MeusDados";
import { Emprestimo } from "./pages/Emprestimo/Emprestimo";


export function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/login" element={<Login />} />
                <Route path="/pesquisar" element={<Pesquisar />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/dados" element={<MeusDados />} />
                <Route path="/emprestimo" element={<Emprestimo/>}/>
            </Routes>
        </BrowserRouter>
    )
}