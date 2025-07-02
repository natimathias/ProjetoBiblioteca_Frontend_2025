import { useState, useEffect } from "react";

export function CadastroLivro() {
  const [titulo, setTitulo] = useState('');
  const [isbn, setIsbn] = useState('');
  const [autor, setAutor] = useState('');
  const [editora, setEditora] = useState('');
  const [edicao, setEdicao] = useState('');
  const [qt_disponivel, setQt_disponivel] = useState('');
  const [capa, setCapa] = useState('');

  const [autores, setAutores] = useState([]);
  const [editoras, setEditoras] = useState([]);

  useEffect(() => {
    async function fetchDados() {
      try {
        const autoresResponse = await fetch("http://localhost:8086/listarAutores");
        const autoresData = await autoresResponse.json();
        setAutores(autoresData);

        const editorasResponse = await fetch("http://localhost:8086/listarEditoras");
        const editorasData = await editorasResponse.json();
        setEditoras(editorasData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }

    fetchDados();
  }, []);

  return (
    <div
      className="flex h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url("/fundo_Locatario.png")',
      }}
    >
      <div className="w-full flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-gradient-to-br from-red-600/20 via-pink-700/10 to-purple-800/20 backdrop-blur-md rounded-3xl p-10 w-full max-w-md text-white shadow-[0_0_25px_#f87171] border border-red-400 transition-all duration-500 hover:scale-105">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">Cadastro de Livro</h1>
            <p className="text-sm mt-1">Preencha os dados do livro</p>
          </div>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Título do Livro"
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-red-300"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />

            <input
              type="text"
              placeholder="Código do livro"
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-red-300"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
            />

            <select
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-red-300"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
            >
              <option value="">Selecione o Autor</option>
              {autores.map((a) => (
                <option key={a.id} value={a.id}>{a.nome}</option>
              ))}
            </select>

            <select
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-red-300"
              value={editora}
              onChange={(e) => setEditora(e.target.value)}
            >
              <option value="">Selecione a Editora</option>
              {editoras.map((e) => (
                <option key={e.id} value={e.id}>{e.nome}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Edição"
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-red-300"
              value={edicao}
              onChange={(e) => setEdicao(e.target.value)}
            />

            <input
              type="number"
              placeholder="Quantidade disponível"
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-red-300"
              value={qt_disponivel}
              onChange={(e) => setQt_disponivel(e.target.value)}
            />

            <div>
              <label
                htmlFor="capa"
                className="block w-full px-4 py-2 text-center cursor-pointer bg-white bg-opacity-20 text-white rounded border border-white/30 hover:bg-opacity-30 focus:outline-none focus:ring focus:ring-red-300"
              >
                Selecionar Capa do Livro
              </label>
              <input
                id="capa"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setCapa(e.target.files[0])}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black bg-opacity-80 hover:bg-opacity-100 transition duration-300 text-white py-2 rounded-lg font-semibold"
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
