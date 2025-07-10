import { useLocation } from "react-router-dom";

export function Emprestimo() {
  const location = useLocation();
  const livro = location.state?.livro;

  fetch("http://localhost:8086/emprestarLivro?id_locatario=76&id_livro=14", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(async (response) => {
        const resposta = await response.json();
        console.log(resposta)
        alert(resposta.message);
        // navigate();
      })
      .catch((error) => {
        console.error("Erro ao realizar o empréstimo:", error);
        alert("Ops, houve um erro ao realizar o empréstimo.");
      });

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
        <h1 className="text-3xl font-bold text-center mb-6">📖 Confirmação de Empréstimo</h1>

        {livro ? (
          <div className="text-center space-y-4">
            <p className="text-green-400 text-xl font-semibold">
              ✅ Empréstimo confirmado para:
            </p>
            <h2 className="text-2xl font-bold">{livro.titulo}</h2>
            <p><strong>Autor:</strong> {livro.autor_nome}</p>
            <p><strong>Categoria:</strong> {livro.categoria_nome}</p>
            <img
              src={`http://localhost:8086/imagens/${livro.caminho_imagens}`}
              alt="Capa do livro"
              className="mx-auto mt-4 w-64 h-80 object-cover rounded shadow-lg"
            />
          </div>
        ) : (
          <p className="text-red-400 text-center text-lg">
            ❌ Nenhum livro selecionado para empréstimo.
          </p>
        )}
      </div>
    </div>
  );
}