import { useEffect, useState } from "react";

export function Catalogo() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8086/listarLivros")
      .then((res) => res.json())
      .then((data) => {
        console.log("Dados recebidos da API:", data);
        setLivros(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar livros:", error);
        alert("Erro ao carregar o catálogo.");
      });
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/fundo_catalogo.png')" }}
      />
      <div className="absolute inset-0 bg-black opacity-50 z-10" />
      <div
        className="relative z-20 bg-white/10 p-10 rounded-2xl border border-red-500/50 shadow-xl w-full max-w-4xl text-white"
        style={{
          boxShadow: '0 0 25px rgba(255, 0, 0, 0.3)',
          border: '1px solid rgba(255, 0, 0, 0.4)',
        }}
      >
        <h1 className="text-3xl font-bold text-center mb-6">📚 Catálogo da Biblioteca</h1>

        {livros.length === 0 ? (
          <p className="text-center text-gray-300">Nenhum livro encontrado.</p>
        ) : (
          <ul className="space-y-4">
            {livros.map((livro, index) => (
              <li
                key={index}
                className="bg-white/20 p-4 rounded-lg shadow border border-white/30"
              >
                <p><strong>Título:</strong> {livro.titulo}</p>
                <p><strong>Autor:</strong> {livro.autor}</p>
                <p><strong>Editora:</strong> {livro.editora}</p>
                <p><strong>ISBN:</strong> {livro.isbn}</p>
                {/* Adicione outros campos se necessário */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
