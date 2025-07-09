import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function EditarCurso() {
  const { id } = useParams();
  const [nome, setNome] = useState('');
  const [codigo, setCodigo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8086/curso/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNome(data.nome);
        setCodigo(data.codigo);
      })
      .catch((error) => {
        console.error("Erro ao buscar curso:", error);
        alert("Erro ao carregar dados do curso.");
      });
  }, [id]);

  const realizarEdicao = (e) => {
    e.preventDefault();
    if (!nome || !codigo) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    fetch(`http://localhost:8086/editarCurso/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id, nome, codigo })
    })
      .then(async (response) => {
        const resposta = await response.json();
        alert(resposta.message);
        navigate('/listarCursos');
      })
      .catch((error) => {
        console.error("Erro ao editar curso:", error);
        alert("Erro ao editar o curso.");
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
        <div className="bg-gradient-to-br from-green-600/20 via-emerald-700/10 to-lime-800/20 backdrop-blur-md p-10 rounded-3xl w-full max-w-md text-white shadow-[0_0_25px_#34d399] border border-green-400">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">Edição de Curso</h1>
            <p className="text-sm mt-1">Atualize os dados do curso</p>
          </div>

          <form className="space-y-4" onSubmit={realizarEdicao}>
            <input
              type="text"
              placeholder="Nome do Curso"
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-green-300"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <input
              type="text"
              placeholder="Código do Curso"
              className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-green-300"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
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
