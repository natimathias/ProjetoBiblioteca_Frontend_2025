import { useState, useEffect } from "react";

export function Emprestimo() {
  const [livrosDisponiveis, setLivrosDisponiveis] = useState([]);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    async function carregarLivros() {
      try {
        const resposta = await fetch("http://localhost:8086/listarLivros");
        const dados = await resposta.json();
        setLivrosDisponiveis(dados);
      } catch (erro) {
        console.error("Erro ao carregar livros:", erro);
        setMensagem("Erro ao carregar livros disponíveis.");
      }
    }

    carregarLivros();
  }, []);

  async function confirmarEmprestimo(livro) {
    try {
      const emprestimo = {
        id_locatario: 1, // substitua pelo id real do usuário
        id_livro: livro.id,
      };

      const resposta = await fetch("http://localhost:8086/realizarEmprestimo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emprestimo),
      });

      const texto = await resposta.text();
      console.log("🔁 Resposta da API:", texto);

      if (!resposta.ok) {
        throw new Error("Erro ao emprestar: " + texto);
      }

      setMensagem(`✅ Empréstimo realizado: "${livro.titulo}"`);

      // Atualiza a lista de livros
      const novaResposta = await fetch("http://localhost:8086/listarLivros");
      const novosDados = await novaResposta.json();
      setLivrosDisponiveis(novosDados);
    } catch (erro) {
      console.error("❌ Erro ao confirmar empréstimo:", erro.message);
      setMensagem("❌ Não foi possível realizar o empréstimo.\n" + erro.message);
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

        <ul className="space-y-3 max-h-80 overflow-y-auto">
          {livrosDisponiveis.map((livro) => (
            <li
              key={livro.id}
              className="p-3 rounded border border-red-300/40 bg-white/10 flex justify-between items-center"
            >
              <div>
                <strong>{livro.titulo}</strong> — {livro.autor || livro.nome_autor}
                <br />
                <span className="text-sm">Disponíveis: {livro.qt_disponivel}</span>
              </div>
              <button
                onClick={() => confirmarEmprestimo(livro)}
                className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-semibold"
              >
                Empréstimo
              </button>
            </li>
          ))}
        </ul>

        {mensagem && (
          <p className="mt-4 text-center text-green-400 whitespace-pre-line">{mensagem}</p>
        )}
      </div>
    </div>
  );
}
