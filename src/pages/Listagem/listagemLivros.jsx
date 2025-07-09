import { useEffect, useState } from "react";
import { Trash2, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ListagemLivros() {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const buscarLivros = () => {
    fetch("http://localhost:8086/listarLivros")
      .then((res) => res.json())
      .then((resp) => {
        setLivros(resp);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar livros:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    buscarLivros();
  }, []);

  const indisponibilizarLivro = (id) => {
    fetch(`http://localhost:8086/indisponibilizarLivro/${id}`, {
      method: "POST",
    })
      .then(async (res) => {
        const resposta = await res.json();
        alert(resposta.message);
        buscarLivros();
      })
      .catch((error) => {
        console.error("Erro ao indisponibilizar livro:", error);
        alert("Erro ao atualizar status do livro.");
      });
  };

  const editarLivro = (id) => {
    navigate(`/editarLivro/${id}`);
  };

  return (
    <div
      className="flex h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/fundo_Locatario.png")' }}
    >
      <div className="w-full flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-gradient-to-br from-yellow-600/20 via-orange-700/10 to-red-800/20 backdrop-blur-md rounded-3xl p-10 w-full max-w-3xl text-white shadow-[0_0_25px_#facc15] border border-yellow-400">
          <h1 className="text-3xl font-bold text-center mb-6">Livros Cadastrados</h1>

          {loading ? (
            <p className="text-center">Carregando...</p>
          ) : livros.length ? (
            <ul className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-yellow-500">
              {livros.map((livro, index) => (
                <li
                  key={index}
                  className="border border-white/30 rounded-lg p-4 flex justify-between items-center bg-white bg-opacity-10"
                >
                  <div className="flex items-start space-x-4">
                    {livro.caminho_imagens && (
                      <img
                        src={`http://localhost:8086/imagens/${livro.caminho_imagens}`}
                        alt="Capa"
                        className="w-20 h-28 object-cover rounded shadow"
                      />
                    )}
                    <div>
                      <h2 className="text-xl font-semibold">{livro.titulo}</h2>
                      <p className="text-sm text-white/80">Autor: {livro.autor || livro.id_autores}</p>
                      <p className="text-sm text-white/80">Categoria: {livro.categoria || livro.id_categoria}</p>
                      <p className="text-sm text-white/80">Editora: {livro.editora || livro.id_editora}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => indisponibilizarLivro(livro.id)}
                      title="Remover"
                      className="hover:text-red-500 transition"
                    >
                      <Trash2 size={22} />
                    </button>
                    <button
                      onClick={() => editarLivro(livro.id)}
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
            <p className="text-center">Não há livros cadastrados.</p>
          )}
        </div>
      </div>
    </div>
  );
}
