import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Edit } from "lucide-react";

export function ListagemAutores() {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const buscarAutores = () => {
    fetch("http://localhost:8086/listarAutores")
      .then((res) => res.json())
      .then((resp) => {
        setAutores(resp);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar autores:", error);
        setLoading(false);
        setAutores([]);
      });
  };

  useEffect(() => {
    buscarAutores();
  }, []);

  const removerAutor = (id) => {
    console.log(id);
    fetch(`http://localhost:8086/deixarIndisponivelAutor/${id}`, {
      method: "GET",
    })
      .then(async (res) => {
        const resposta = await res.json();
        alert(resposta.message);
        buscarAutores();
        navigate("/cadastroAutor");
      })
      .catch((error) => {
        console.error("Erro ao remover autor:", error);
        alert("Erro ao remover autor.");
      });
  };

    const editarAutor = (id) => {
    navigate(`/editarAutor/${id}`);
  };


  return (
    <div
      className="flex h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/fundo_Locatario.png")' }}
    >
      <div className="w-full flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-gradient-to-br from-red-600/20 via-pink-700/10 to-purple-800/20 backdrop-blur-md rounded-3xl p-10 w-full max-w-2xl text-white shadow-[0_0_25px_#f87171] border border-red-400">
          <h1 className="text-3xl font-bold text-center mb-6">Autores Cadastrados</h1>

          {loading ? (
            <p className="text-center">Carregando...</p>
          ) : autores.length ? (
            <ul className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-red-500">
              {autores.map((autor) => (
                <li
                  key={autor.id}
                  className="border border-white/30 rounded-lg p-4 flex justify-between items-center bg-white bg-opacity-10"
                >
                  <div>
                    <h2 className="text-xl font-semibold">{autor.nome || "Nome não informado"}</h2>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => removerAutor(autor.id)}
                      title="Remover"
                      className="hover:text-red-500 transition"
                    >
                      <Trash2 size={22} />
                    </button>
                    <button
                      onClick={() => editarAutor(autor.id)}
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
            <p className="text-center">Não há autores cadastrados.</p>
          )}
        </div>
      </div>
    </div>
  );
}
