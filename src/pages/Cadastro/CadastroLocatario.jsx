import { useState } from 'react';

export function CadastroLocatario() {
  const [nome, setNome] = useState("");
  const [dataNascimento, setData_nascimento] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tipo, setTipo] = useState("");

  const realizarCadastro = (e) => {
    e.preventDefault();

    fetch("http://localhost:8086/cadastrarLocatario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: null, nome, dataNascimento, email, senha, telefone, tipo })
    })
      .then(async (response) => {
        const resposta = await response.json();
        alert(resposta.message);
        setNome('');
        setData_nascimento('');
        setEmail('');
        setSenha('');
        setTelefone('');
        setTipo('');
      })
      .catch((error) => {
        console.error("Erro ao cadastrar locatário:", error);
        alert("Ops, houve um erro ao cadastrar o locatário.");
      });

  };

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
            <h1 className="text-3xl font-bold">Cadastro de Locatário</h1>
            <p className="text-sm mt-1">Preencha os dados abaixo</p>
          </div>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Nome completo"
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-red-300"
            />
            <input
              type="date"
              onChange={(e) => setData_nascimento(e.target.value)}
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-red-300"
            />
            <input
              type="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-red-300"
            />
            <input
              type="password"
              placeholder="Senha"
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-red-300"
            />
            <input
              type="tel"
              placeholder="Telefone"
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-red-300"
            />

            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-red-300"
            >
              <option value="">Selecione o tipo</option>
              <option value="professor">Professor</option>
              <option value="aluno">Aluno</option>
              <option value="bibliotecario">Bibliotecário</option>
              <option value="visitante">Visitante</option>
            </select>

            <button
              onClick={realizarCadastro}
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