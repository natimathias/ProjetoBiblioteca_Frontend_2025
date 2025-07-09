import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function EditarEditora() {
  const { id } = useParams();
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8086/editora/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNome(data.nome);
        setEndereco(data.endereco);
        setTelefone(data.telefone);
      })
      .catch((err) => {
        console.error("Erro ao buscar editora:", err);
        alert("Erro ao carregar os dados da editora.");
      });
  }, [id]);

  const salvarAlteracoes = (e) => {
    e.preventDefault();
    if (!nome || !endereco || !telefone) {
      alert("Todos os campos são obrigatórios.");
      return;
    }

    fetch(`http://localhost:8086/editarEditora/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, nome, endereco, telefone }),
    })
      .then(async (res) => {
        const resposta = await res.json();
        alert(resposta.message);
        navigate("/listarEditoras");
      })
      .catch((err) => {
        console.error("Erro ao editar editora:", err);
        alert("Erro ao editar a editora.");
      });
  };

  return (
    <div
      className="flex h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/fundo_Locatario.png")' }}
    >
      <div className="w-full flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-gradient-to-br from-indigo-600/20 via-blue-700/10 to-cyan-800/20 backdrop-blur-md p-10 rounded-3xl w-full max-w-md text-white shadow-[0_0_25px_#60a5fa] border border-blue-400 transition-all duration-500 hover:scale-105">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">Edição de Editora</h1>
            <p className="text-sm mt-1">Atualize os dados da editora</p>
          </div>

          <form className="space-y-4" onSubmit={salvarAlteracoes}>
            <input
              type="text"
              placeholder="Nome da Editora"
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-blue-300"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <input
              type="text"
              placeholder="Endereço"
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-blue-300"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />

            <input
              type="text"
              placeholder="Telefone"
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-blue-300"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-black bg-opacity-80 hover:bg-opacity-100 transition duration-300 text-white py-2 rounded-lg font-semibold"
            >
              Salvar Alterações
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
