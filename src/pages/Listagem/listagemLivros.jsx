import { useEffect, useState } from "react";

export function ListagemLivros() {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="flex h-screen bg-cover bg-center" style={{ backgroundImage: 'url("/fundo_Locatario.png")' }}>
      <div className="w-full flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-gradient-to-br from-yellow-600/20 via-orange-700/10 to-red-800/20 backdrop-blur-md rounded-3xl p-10 w-full max-w-3xl text-white shadow-[0_0_25px_#facc15] border border-yellow-400">
          <h1 className="text-3xl font-bold text-center mb-6">Livros Cadastrados</h1>

          {loading ? (
            <p className="text-center">Carregando...</p>
          ) : livros.length ? (
            <ul className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-yellow-500">
              {livros.map((livro, index) => (
                <li key={index} className="border border-white/30 rounded-lg p-4 flex justify-between items-center bg-white bg-opacity-10">
                  <div>
                    <h2 className="text-xl font-semibold">{livro.titulo}</h2>
                    <p className="text-sm text-white/80">Autor: {livro.autor || livro.id_autores}</p>
                    <p className="text-sm text-white/80">Editora: {livro.editora || livro.id_editora}</p>
                    <p className="text-sm text-white/80">Categoria: {livro.categoria}</p>
                    {livro.caminho_imagens && (
                      <img
                        src={`http://localhost:8086/imagens/${livro.caminho_imagens}`}
                        alt="Capa"
                        className="mt-2 w-20 h-28 object-cover rounded shadow"
                      />
                    )}
                  </div>
                  <button
                    onClick={() => indisponibilizarLivro(livro.id)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
                  >
                    Indisponibilizar
                  </button>
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
