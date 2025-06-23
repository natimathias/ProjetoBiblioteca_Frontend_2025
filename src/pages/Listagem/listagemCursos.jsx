import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, RefreshCcw, Trash2 } from "lucide-react";

export function ListagemCursos() {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const buscarCursos = () => {
    fetch("http://localhost:8086/listarCursos")
      .then((res) => res.json())
      .then((resp) => {
        setCursos(resp);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar cursos:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    buscarCursos();
  }, []);

  const removerCurso = (id) => {
    fetch(`http://localhost:8086/removerCurso/${id}`, {
      method: "GET",
    })
      .then(async (res) => {
        const resposta = await res.json();
        alert(resposta.message);
        buscarCursos();
        navigate("/cadastroCurso");
      })
      .catch((error) => {
        console.error("Erro ao remover curso:", error);
        alert("Erro ao remover curso.");
      });
  };

  const editarCurso = (id) => {
    navigate(`/editarCurso/${id}`);
  };

  const atualizarCurso = (id) => {
    alert(`Atualizar curso com ID ${id}`);
  };

  return (
    <div
      className="flex h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/fundo_Locatario.png")' }}
    >
      <div className="w-full flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-gradient-to-br from-green-600/20 via-emerald-700/10 to-lime-800/20 backdrop-blur-md rounded-3xl p-10 w-full max-w-2xl text-white shadow-[0_0_25px_#34d399] border border-green-400">
          <h1 className="text-3xl font-bold text-center mb-6">Cursos Cadastrados</h1>

          {loading ? (
            <p className="text-center">Carregando...</p>
          ) : cursos.length ? (
            <ul className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-green-500">
              {cursos.map((curso, index) => (
                <li
                  key={index}
                  className="border border-white/30 rounded-lg p-4 flex justify-between items-center bg-white bg-opacity-10"
                >
                  <div>
                    <h2 className="text-xl font-semibold">{curso.nome}</h2>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => removerCurso(curso.id)}
                      title="Remover"
                      className="hover:text-red-500 transition"
                    >
                      <Trash2 size={22} />
                    </button>
                    <button
                      onClick={() => editarCurso(curso.id)}
                      title="Editar"
                      className="hover:text-yellow-400 transition"
                    >
                      <Edit size={22} />
                    </button>
                    <button
                      onClick={() => atualizarCurso(curso.id)}
                      title="Atualizar"
                      className="hover:text-blue-400 transition"
                    >
                      <RefreshCcw size={22} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">Não há cursos cadastrados.</p>
          )}
        </div>
      </div>
    </div>
  );
}
