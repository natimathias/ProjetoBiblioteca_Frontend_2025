import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function CadastroSubcategoria() {
  const [nome, setNome] = useState('');
  const navigate = useNavigate();

  const realizarCadastro = (e) => {
    e.preventDefault();

    fetch("http://localhost:8086/cadastrarSubcategoria", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome }),
    })
      .then(async (response) => {
        const resposta = await response.json();
        alert(resposta.message);
        setNome('');
        navigate('/listarSubcategorias'); 
      })
      .catch((error) => {
        console.error("Erro ao cadastrar subcategoria:", error);
        alert("Erro ao cadastrar subcategoria.");
      });
  };

  return (
    <div
      className="flex h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/fundo_Locatario.png")' }}
    >
      <div className="w-full flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-gradient-to-br from-red-600/20 via-pink-700/10 to-purple-800/20 backdrop-blur-md rounded-3xl p-10 w-full max-w-md text-white shadow-[0_0_25px_#f87171] border border-red-400 transition-all duration-500 hover:scale-105">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">Cadastro de Subcategoria</h1>
            <p className="text-sm mt-1">Preencha o nome da subcategoria</p>
          </div>

          <form className="space-y-4" onSubmit={realizarCadastro}>
            <input
              type="text"
              placeholder="Nome da Subcategoria"
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-red-300"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />

            <button
              type="submit"
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
