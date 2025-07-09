import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Menu } from "./pages/Menu/Menu";
import { Login } from "./pages/Login/Login";
import { Pesquisar } from "./pages/Pesquisar/Pesquisar";
import { Catalogo } from "./pages/Catalogo/Catalogo";
import { MeusDados } from "./pages/MeusDados/MeusDados";
import { Emprestimo } from "./pages/Emprestimo/Emprestimo";
import { CadastroLocatario } from "./pages/Cadastro/CadastroLocatario";
import { CadastroLivro } from "./pages/Cadastro/CadastroLivro";
import { AcessoBibliotecario } from "./pages/Acesso_Bibliotecario/Acesso_Bibliotecario";
import { CadastroEditora } from "./pages/Cadastro/CadastroEditora";
import { CadastroAutor } from "./pages/Cadastro/CadastroAutor";
import { CadastroCursos } from "./pages/Cadastro/CadastroCursos";
import { ListagemEditoras } from "./pages/Listagem/ListagemEditoras";
import { ListagemAutores } from "./pages/Listagem/listagemAutores";
import { ListagemCursos } from "./pages/Listagem/ListagemCursos";
import { ListagemLocatarios } from "./pages/Listagem/listagemLocatarios";
import { ListagemLivros } from "./pages/Listagem/ListagemLivros";
import { CadastroCategoria } from "./pages/Cadastro/CadastroCategoria";
import { ListagemCategorias } from "./pages/Listagem/ListagemCategoria";
import { CadastroSubcategoria } from "./pages/Cadastro/CadastroSubCategoria";
import { ListagemSubcategorias } from "./pages/Listagem/ListagemSubCategoria";
import { EditarCurso } from "./pages/Editar/editarCursos";
import { EditarAutor } from "./pages/Editar/editarAutor";
import { EditarEditora } from "./pages/Editar/editarEditora";
import { EditarLocatario } from "./pages/Editar/editarLocatario";
import { EditarLivro } from "./pages/Editar/editarLivro";

export function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/login" element={<Login />} />
                <Route path="/pesquisar" element={<Pesquisar />} />
                <Route path="/catalogo" element={<Catalogo />}/>
                <Route path="/dados" element={<MeusDados />} />
                <Route path="/emprestimo" element={<Emprestimo/>}/>
                <Route path="/acessoBibliotecario" element={<AcessoBibliotecario/>}/>
                <Route path="/cadastroLocatario" element={<CadastroLocatario />} />
                <Route path="/cadastroLivro" element={<CadastroLivro />} />
                <Route path="/cadastroEditora" element= {<CadastroEditora/>}/>
                <Route path="/cadastroAutor" element={<CadastroAutor/>}/>
                <Route path="/cadastroCurso" element={<CadastroCursos/>}/>
                <Route path="/cadastroCategoria" element={<CadastroCategoria/>}/>
                <Route path="/cadastroSubCategoria" element={<CadastroSubcategoria/>}/>
                <Route path="/listarAutores" element={<ListagemAutores/>}/>
                <Route path="/listarEditoras" element={<ListagemEditoras/>}/>
                <Route path="/listarCursos" element={<ListagemCursos/>}/>
                <Route path="/listarLocatarios" element={<ListagemLocatarios/>}/>
                <Route path="/listarLivros" element={<ListagemLivros/>}/>
                <Route path="/listarCategorias" element={<ListagemCategorias/>}/>
                <Route path="/listarSubCategorias" element={<ListagemSubcategorias/>}/>
                <Route path="/editarCursos/:id" element={<EditarCurso/>}/>
                <Route path="/editarAutor/:id" element={<EditarAutor/>}/>
                <Route path="/editarEditora/:id" element={<EditarEditora/>}/>
                <Route path="/editarLocatario/:id" element={<EditarLocatario/>}/>
                <Route path="/editarLivro/:id" element={<EditarLivro/>}/>
            </Routes>
        </BrowserRouter>
    )
}