import { useEffect, useState } from "react";

export function Catalogo() {
  const [livros, setLivros] = useState([]);

useEffect(() => {
  const buscarLivros = async () => {
    try {
      const response = await fetch("http://localhost:8086/listarLivros");

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log("Resposta da API:", data);

      if (Array.isArray(data)) {
        setLivros(data); // caso a API retorne um array direto
      } else if (Array.isArray(data.livros)) {
        setLivros(data.livros); // caso a API retorne um objeto com .livros
      } else {
        throw new Error("Formato de resposta inválido.");
      }

    } catch (erro) {
      console.error("Erro ao carregar livros:", erro);
      alert("Erro ao carregar catálogo: " + erro.message);
    }
  };

  buscarLivros();
}, []);



  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/fundo_catalogo.png')" }}
      />
      <div className="absolute inset-0 bg-black opacity-50 z-10" />
      <div
        className="relative z-20 bg-white/10 p-10 rounded-2xl border border-red-500/50 shadow-xl w-full max-w-6xl text-white"
        style={{
          boxShadow: '0 0 25px rgba(255, 0, 0, 0.3)',
          border: '1px solid rgba(255, 0, 0, 0.4)',
        }}
      >
        <h1 className="text-3xl font-bold text-center mb-6">📚 Catálogo da Biblioteca</h1>

        {livros.length === 0 ? (
          <p className="text-center text-gray-300">Nenhum livro encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {livros.map((livro, index) => (
              <div
                key={index}
                className="bg-white/20 p-4 rounded-lg shadow border border-white/30"
              >
                <img
                  src={`http://localhost:8086/imagem/${livro.imagem}`}
                  alt={`Capa de ${livro.titulo}`}
                  className="w-full h-64 object-cover mb-4 rounded"
                />
                <h2 className="text-xl font-bold">{livro.titulo}</h2>
                <p><strong>Autor:</strong> {livro.autor}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
