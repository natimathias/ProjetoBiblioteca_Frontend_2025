import { useEffect, useState } from "react";

export function ListagemLocatarios() {
  const [locatarios, setLocatarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const buscarLocatarios = () => {
    fetch("http://localhost:8086/listarLocatarios")
      .then((res) => res.json())
      .then((resp) => {
        setLocatarios(resp);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar locatários:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    buscarLocatarios();
  }, []);

  const removerLocatario = (id) => {
    fetch(`http://localhost:8086/removerLocatario/${id}`, {
      method: "DELETE",
    })
      .then(async (res) => {
        const resposta = await res.json();
        alert(resposta.message);
        buscarLocatarios();
      })
      .catch((error) => {
        console.error("Erro ao remover locatário:", error);
        alert("Erro ao remover locatário.");
      });
  };

  return (
    <div
      className="flex h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/fundo_Locatario.png")' }}
    >
      <div className="w-full flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-gradient-to-br from-green-600/20 via-emerald-700/10 to-teal-800/20 backdrop-blur-md rounded-3xl p-10 w-full max-w-3xl text-white shadow-[0_0_25px_#34d399] border border-green-400">
          <h1 className="text-3xl font-bold text-center mb-6">Locatários Cadastrados</h1>

          {loading ? (
            <p className="text-center">Carregando...</p>
          ) : locatarios.length ? (
            <ul className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-green-500">
              {locatarios.map((locatario, index) => (
                <li
                  key={index}
                  className="border border-white/30 rounded-lg p-4 flex justify-between items-center bg-white bg-opacity-10"
                >
                  <div>
                    <h2 className="text-xl font-semibold">{locatario.nome}</h2>
                    <p className="text-sm text-white/80">CPF: {locatario.cpf}</p>
                    <p className="text-sm text-white/80">Curso: {locatario.curso}</p>
                  </div>
                  <button
                    onClick={() => removerLocatario(locatario.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">Não há locatários cadastrados.</p>
          )}
        </div>
      </div>
    </div>
  );
}
