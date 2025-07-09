import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Edit } from "lucide-react";

export function ListagemCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const buscarCategorias = () => {
    fetch("http://localhost:8086/listarCategorias")
      .then((res) => res.json())
      .then((resp) => {
        setCategorias(resp);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar categorias:", error);
        setLoading(false);
        setCategorias([]);
      });
  };

  useEffect(() => {
    buscarCategorias();
  }, []);

  const removerCategoria = (id) => {
    fetch(`http://localhost:8086/deixarIndisponivelCategoria/${id}`, {
      method: "GET",
    })
      .then(async (res) => {
        const resposta = await res.json();
        alert(resposta.message);
        buscarCategorias();
        navigate("/cadastroCategoria");
      })
      .catch((error) => {
        console.error("Erro ao remover categoria:", error);
        alert("Erro ao remover categoria.");
      });
  };

  const editarCategoria = (id) => {
    navigate(`/editarCategoria/${id}`);
  };

  return (
    <div
      className="flex h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/fundo_Locatario.png")' }}
    >
      <div className="w-full flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-gradient-to-br from-red-600/20 via-pink-700/10 to-purple-800/20 backdrop-blur-md rounded-3xl p-10 w-full max-w-2xl text-white shadow-[0_0_25px_#f87171] border border-red-400">
          <h1 className="text-3xl font-bold text-center mb-6">Categorias Cadastradas</h1>

          {loading ? (
            <p className="text-center">Carregando...</p>
          ) : categorias.length ? (
            <ul className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-red-500">
              {categorias.map((categoria) => (
                <li
                  key={categoria.id}
                  className="border border-white/30 rounded-lg p-4 flex justify-between items-center bg-white bg-opacity-10"
                >
                  <div>
                    <h2 className="text-xl font-semibold">{categoria.nome || "Nome não informado"}</h2>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => removerCategoria(categoria.id)}
                      title="Remover"
                      className="hover:text-red-500 transition"
                    >
                      <Trash2 size={22} />
                    </button>
                    <button
                      onClick={() => editarCategoria(categoria.id)}
                      title="Editar"
                      className="hover:text-yellow-400 transition"
                    >
                      <Edit size={22} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">Não há categorias cadastradas.</p>
          )}
        </div>
      </div>
    </div>
  );
}
