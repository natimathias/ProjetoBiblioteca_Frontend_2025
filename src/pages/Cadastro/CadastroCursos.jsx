import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function CadastroCursos() {
  const [nome, setNome] = useState('');
  const [codigo, setCodigo] = useState('');
  const navigate = useNavigate();

    const realizarCadastro = (e) => {
    e.preventDefault();

    fetch("http://localhost:8086/cadastrarCurso", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: null, nome, codigo })
    })
      .then(async (response) => {
        const resposta = await response.json();
        alert(resposta.message);
        setNome('');
        setCodigo('');
        navigate('/listarCursos');
      })
      .catch((error) => {
        console.error("Erro ao cadastrar curso:", error);
        alert("Ops, houve um erro ao cadastrar o curso.");
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
            <h1 className="text-3xl font-bold">Cadastro de Cursos</h1>
            <p className="text-sm mt-1">Informe os dados do curso</p>
          </div>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Nome do Curso"
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-red-300"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <input
              type="text"
              placeholder="Código do Curso"
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-red-300"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />

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
