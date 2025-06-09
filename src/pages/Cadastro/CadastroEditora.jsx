import { useState } from 'react';

export function CadastroEditora() {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');

  const realizarCadastro = async () => {
    fetch("https://projetobiblioteca-backend-2025.onrender.com/editora")
      .then((response) => response.json())
      .then((editora) => {
        res.send(editora.message || "Editora cadastrada com sucesso!")
        setNome('');
        setEndereco('');
        setTelefone('');
      })
      .catch(error => {
        console.log("Erro ao cadastrar editora", error);
        res.send("Ops, houve um erro.")
      })
  }

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
            <h1 className="text-3xl font-bold">Cadastro de Editora</h1>
            <p className="text-sm mt-1">Preencha os dados da editora</p>
          </div>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Nome da Editora"
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-red-300"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <input
              type="text"
              placeholder="Endereço"
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-red-300"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />

            <input
              type="tel"
              placeholder="Telefone"
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-red-300"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-black bg-opacity-80 hover:bg-opacity-100 transition duration-300 text-white py-2 rounded-lg font-semibold"
              onClick={realizarCadastro}
            >
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
