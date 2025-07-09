import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Edit } from "lucide-react";

export function ListagemEditoras() {
  const [editoras, setEditoras] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const buscarEditoras = () => {
    fetch("http://localhost:8086/listarEditoras")
      .then((res) => res.json())
      .then((resp) => {
        setEditoras(resp);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar editoras:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    buscarEditoras();
  }, []);

  const removerEditora = (id) => {
    fetch(`http://localhost:8086/deixarIndisponivelEditora/${id}`, {
      method: "GET",
    })
      .then(async (res) => {
        const resposta = await res.json();
        alert(resposta.message);
        buscarEditoras();
        navigate("/cadastroEditora");
      })
      .catch((error) => {
        console.error("Erro ao remover editora:", error);
        alert("Erro ao remover editora.");
      });
  };

  const editarEditora = (id) => {
    navigate(`/editarEditora/${id}`);
  };

  return (
    <div
      className="flex h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/fundo_Locatario.png")' }}
    >
      <div className="w-full flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-gradient-to-br from-indigo-600/20 via-blue-700/10 to-cyan-800/20 backdrop-blur-md rounded-3xl p-10 w-full max-w-2xl text-white shadow-[0_0_25px_#60a5fa] border border-blue-400">
          <h1 className="text-3xl font-bold text-center mb-6">Editoras Cadastradas</h1>

          {loading ? (
            <p className="text-center">Carregando...</p>
          ) : editoras.length ? (
            <ul className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500">
              {editoras.map((editora) => (
                <li
                  key={editora.id}
                  className="border border-white/30 rounded-lg p-4 flex justify-between items-center bg-white bg-opacity-10"
                >
                  <div>
                    <h2 className="text-xl font-semibold">{editora.nome || "Nome não informado"}</h2>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => removerEditora(editora.id)}
                      title="Remover"
                      className="hover:text-red-500 transition"
                    >
                      <Trash2 size={22} />
                    </button>
                    <button
                      onClick={() => editarEditora(editora.id)}
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
            <p className="text-center">Não há editoras cadastradas.</p>
          )}
        </div>
      </div>
    </div>
  );
}
