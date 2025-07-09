import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function EditarAutor() {
  const [nome, setNome] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Buscar os dados do autor pelo ID
    fetch(`http://localhost:8086/autor/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNome(data.nome);
      })
      .catch((err) => {
        console.error("Erro ao buscar autor:", err);
        alert("Erro ao carregar dados do autor.");
      });
  }, [id]);

  const salvarAlteracoes = (e) => {
    e.preventDefault();
    if (!nome) {
      alert("O nome do autor é obrigatório.");
      return;
    }

    fetch(`http://localhost:8086/editarAutor/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, nome }),
    })
      .then(async (res) => {
        const resposta = await res.json();
        alert(resposta.message || "Autor atualizado com sucesso!");
        navigate("/listarAutores");
      })
      .catch((error) => {
        console.error("Erro ao editar autor:", error);
        alert("Erro ao editar o autor.");
      });
  };

  return (
    <div
      className="flex h-screen items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: 'url("/fundo_Locatario.png")',
      }}
    >
      <div className="bg-gradient-to-br from-red-600/20 via-pink-700/10 to-purple-800/20 backdrop-blur-md p-10 rounded-3xl text-white w-full max-w-md shadow-[0_0_25px_#f87171] border border-red-400">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Edição de Autor</h1>
          <p className="text-sm mt-1">Atualize o nome do autor</p>
        </div>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Nome do Autor"
            className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-red-300"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <button
            onClick={salvarAlteracoes}
            className="w-full bg-black bg-opacity-80 hover:bg-opacity-100 transition duration-300 text-white py-2 rounded-lg font-semibold"
          >
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}