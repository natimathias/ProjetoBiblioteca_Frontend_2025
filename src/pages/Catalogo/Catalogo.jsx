import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Catalogo() {
  const [livros, setLivros] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8086/listarLivros")
      .then(res => res.json())
      .then(data => setLivros(data))
      .catch(() => alert("Erro ao carregar livros"));
  }, []);

  function irParaEmprestimo(livro) {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuarioLogado) {
      alert("Você precisa estar logado para fazer empréstimos.");
      navigate("/login");
      return;
    }
    navigate("/emprestimo", { state: { livro, usuario: usuarioLogado } });
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/fundo_catalogo.png')" }}
      />
      <div className="absolute inset-0 bg-black opacity-50 z-10" />
      <div className="relative z-20 bg-white/10 p-10 rounded-2xl border border-red-500/50 shadow-xl w-full max-w-6xl text-white">
        <h1 className="text-3xl font-bold text-center mb-6">📚 Catálogo da Biblioteca</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {livros.map((livro, index) => (
            <div
              key={index}
              className="bg-white/20 p-4 rounded-lg shadow border border-white/30 max-w-md mx-auto"
            >
              <img
                src={`http://localhost:8086/imagens/${livro.caminho_imagens}`}
                alt="Capa"
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-bold">{livro.titulo}</h2>
              <p><strong>Autor:</strong> {livro.autor_nome}</p>
              <p><strong>Categoria:</strong> {livro.categoria_nome}</p>
              <button
                className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded"
                onClick={() => irParaEmprestimo(livro)}
              >
                Emprestar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
