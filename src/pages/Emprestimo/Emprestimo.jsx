import { useState, useEffect } from "react";
// import axios from "axios"; 

export function Emprestimo() {
  const [livrosDisponiveis, setLivrosDisponiveis] = useState([]);
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    async function carregarLivros() {
      try {
        const resposta = await axios.get("http://localhost:8086/listarLivros");
        setLivrosDisponiveis(resposta.data);
      } catch (erro) {
        console.error("Erro ao carregar livros:", erro);
        setMensagem("Erro ao carregar livros disponíveis.");
      }
    }

    carregarLivros();
  }, []);

  async function confirmarEmprestimo() {
    if (!livroSelecionado) {
      setMensagem("Por favor, selecione um livro para emprestar.");
      return;
    }

    try {
      const emprestimo = {
        id_locatario: 1, 
        id_livro: livroSelecionado.id,
      };

      await axios.post("http://localhost:8086/realizarEmprestimo", emprestimo);
      setMensagem(`Empréstimo realizado com sucesso: "${livroSelecionado.titulo}"`);
      setLivroSelecionado(null);

      const atualizados = await axios.get("http://localhost:8086/listarLivros");
      setLivrosDisponiveis(atualizados.data);
    } catch (erro) {
      console.error("Erro ao confirmar empréstimo:", erro);
      setMensagem("Não foi possível realizar o empréstimo.");
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black px-4">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/fundo_emprestimo.png')" }}
      />
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div
        className="relative z-20 bg-white/10 p-10 rounded-2xl border border-red-500/50 shadow-xl w-full max-w-4xl text-white backdrop-blur-md"
        style={{
          boxShadow: "0 0 25px rgba(255, 0, 0, 0.3)",
          border: "1px solid rgba(255, 0, 0, 0.4)",
        }}
      >
        <h1 className="text-3xl font-bold text-center mb-6">📚 Empréstimo de Livros</h1>

        <h2 className="text-xl font-semibold mb-4">Selecione um livro para empréstimo</h2>

        <ul className="space-y-3 max-h-60 overflow-y-auto">
          {livrosDisponiveis.map((livro) => (
            <li
              key={livro.id}
              className={`p-3 rounded cursor-pointer border ${
                livroSelecionado?.id === livro.id
                  ? "border-red-500 bg-red-600/40"
                  : "border-red-300/40"
              }`}
              onClick={() => setLivroSelecionado(livro)}
            >
              <strong>{livro.titulo}</strong> — {livro.autor || livro.nome_autor}
              <br />
              <span className="text-sm">Disponíveis: {livro.qt_disponivel}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={confirmarEmprestimo}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold py-3 rounded"
        >
          Confirmar Empréstimo
        </button>

        {mensagem && (
          <p className="mt-4 text-center text-green-400">{mensagem}</p>
        )}
      </div>
    </div>
  );
}
