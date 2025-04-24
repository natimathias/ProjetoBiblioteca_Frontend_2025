import Menu from "./pages/Menu/Menu";
import Login from "./pages/Login/Login";
import Pesquisar from "./pages/Pesquisar/Pesquisar";


function Rotas() {

    return (
        <BrowserRouter>
            <Router>
                <Route path="/" element={<Menu />} />
                <Route path="/login" element={<Login />} />
                <Route path="/pesquisar" element={<Pesquisar />} />
            </Router>
        </BrowserRouter>
    )
}

export default Rotas