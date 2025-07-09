import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function CadastroLocatario() {
  const [nome, setNome] = useState("");
  const [data_nascimento, setData_nascimento] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tipo, setTipo] = useState("");
  const navigate = useNavigate("");

  const realizarCadastro = (e) => {
    e.preventDefault();

    if (!nome || !data_nascimento || !email || !senha || !telefone || !tipo) {
      alert("Por favor, preencha todos os campos antes de continuar.");
      return;
    }

    fetch("http://localhost:8086/cadastrarLocatario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, data_nascimento, email, senha, telefone, tipo })
    })
      .then(async (response) => {
        const resposta = await response.json();
        alert(resposta.message || resposta.mensagem);
        setNome('');
        setData_nascimento('');
        setEmail('');
        setSenha('');
        setTelefone('');
        setTipo('');
        navigate('/listarLocatarios')
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
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-red-300"
            />
            <input
              type="date"
              value={data_nascimento}
              onChange={(e) => setData_nascimento(e.target.value)}
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-red-300"
            />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-red-300"
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-red-300"
            />
            <input
              type="tel"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-red-300"
            />

            <div className="relative">
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full mt-2 px-4 py-2 bg-white/20 text-white rounded-md border border-white/30 backdrop-blur-md focus:outline-none focus:ring focus:ring-red-300 appearance-none"
              >
                <option className="text-white bg-black" disabled value="">Selecione o tipo</option>
                <option className="text-black bg-black bg-opacity-30">Professor</option>
                <option className="text-black bg-black bg-opacity-30">Aluno</option>
                <option className="text-black bg-black bg-opacity-30">Bibliotecário</option>
                <option className="text-black bg-black bg-opacity-30">Visitante</option>
              </select>

              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>


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