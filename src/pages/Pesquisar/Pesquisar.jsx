import { useState } from "react";

export function Pesquisar() {
  const [usuario, setUsuario] = useState("Aluno");
  const [busca, setBusca] = useState("");
  const [resultados, setResultados] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const buscarResultados = () => {
    if (!busca.trim()) {
      alert("Digite algo para pesquisar.");
      return;
    }

    setCarregando(true);
    fetch(`http://localhost:8086/pesquisarLivros?termo=${encodeURIComponent(busca)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao pesquisar.");
        return res.json();
      })
      .then((resultado) => {
        setResultados(resultado);
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao pesquisar.");
      })
      .finally(() => setCarregando(false));
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-black pb-10">
      <div
        className="absolute inset-0 bg-center bg-cover brightness-50"
        style={{ backgroundImage: "url('/fundo_pesquisar.png')" }}
      />
      <div className="relative z-10 mt-10 bg-white/10 backdrop-blur-md rounded-2xl p-10 shadow-xl w-full max-w-3xl text-white border border-red-500/50"
        style={{
          boxShadow: '0 0 25px rgba(255, 0, 0, 0.3)',
          border: '1px solid rgba(255, 0, 0, 0.4)',
        }}
      >
        <h1 className="text-3xl font-bold text-center mb-6">Pesquisar</h1>

        <select
          className="w-full px-4 py-3 rounded-md text-black shadow-md mb-4"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        >
          <option value="Aluno">Aluno</option>
          <option value="Professor">Professor</option>
          <option value="Bibliotecario">Bibliotecário</option>
          <option value="Visitante">Visitante</option>
        </select>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Procure por ISBN, Título, autor ou editora..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="flex-1 p-3 rounded-md text-black shadow-md w-full"
          />

          <button
            onClick={buscarResultados}
            className="bg-black text-white px-6 py-3 rounded-md shadow-md hover:bg-gray-800 transition"
          >
            Pesquisar
          </button>
        </div>
      </div>

      <div className="relative z-10 mt-8 px-4 w-full max-w-6xl">
        {carregando ? (
          <p className="text-white text-center">Carregando...</p>
        ) : resultados.length === 0 && busca ? (
          <p className="text-white text-center">Nenhum livro encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {resultados.map((livro, index) => (
              <div
                key={index}
                className="bg-white/20 p-4 rounded-lg shadow border border-white/30 max-w-sm mx-auto text-white"
              >
                <img
                  src={`http://localhost:8086/imagens/${livro.caminho_imagens}`}
                  alt="Capa"
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h2 className="text-xl font-bold">{livro.titulo}</h2>
                <p><strong>Autor:</strong> {livro.autor_nome}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
