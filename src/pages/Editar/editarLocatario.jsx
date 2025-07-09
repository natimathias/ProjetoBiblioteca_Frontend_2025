import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function EditarLocatario() {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tipo, setTipo] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8086/locatario/${id}`)
      .then(res => res.json())
      .then(data => {
        setNome(data.nome);
        setDataNascimento(data.data_nascimento?.substring(0, 10)); // yyyy-mm-dd
        setEmail(data.email);
        setSenha(data.senha);
        setTelefone(data.telefone);
        setTipo(data.tipo);
      })
      .catch(err => {
        console.error("Erro ao buscar locatário:", err);
        alert("Erro ao carregar os dados do locatário.");
      });
  }, [id]);

  const handleSalvar = (e) => {
    e.preventDefault();

    if (!nome || !dataNascimento || !email || !senha || !telefone || !tipo) {
      alert("Todos os campos são obrigatórios.");
      return;
    }

    fetch(`http://localhost:8086/editarLocatario/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, nome, data_nascimento: dataNascimento, email, senha, telefone, tipo }),
    })
      .then(async (res) => {
        const resposta = await res.json();
        alert(resposta.message || "Locatário atualizado com sucesso!");
        navigate("/listarLocatarios");
      })
      .catch(err => {
        console.error("Erro ao editar locatário:", err);
        alert("Erro ao editar locatário.");
      });
  };

  return (
    <div
      className="flex h-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url("/fundo_Locatario.png")' }}
    >
      <div className="bg-gradient-to-br from-red-600/20 via-pink-700/10 to-purple-800/20 backdrop-blur-md p-10 rounded-3xl text-white w-full max-w-md shadow-[0_0_25px_#f87171] border border-red-400">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Edição de Locatário</h1>
          <p className="text-sm mt-1">Atualize os dados abaixo</p>
        </div>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Nome completo"
            className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type="date"
            className="w-full px-4 py-2 bg-white bg-opacity-20 text-white rounded border border-white/30"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          />

          <input
            type="email"
            placeholder="E-mail"
            className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Senha"
            className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <input
            type="text"
            placeholder="Telefone"
            className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <select
            className="w-full px-4 py-2 bg-white bg-opacity-20 text-white rounded border border-white/30"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="">Selecione o tipo</option>
            <option value="Aluno">Aluno</option>
            <option value="Servidor">Servidor</option>
          </select>

          <button
            onClick={handleSalvar}
            className="w-full bg-black bg-opacity-80 hover:bg-opacity-100 transition duration-300 text-white py-2 rounded-lg font-semibold"
          >
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}