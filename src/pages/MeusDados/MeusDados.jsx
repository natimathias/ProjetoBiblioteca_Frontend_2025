import { useEffect, useState } from "react";

export function MeusDados() {
    const [dados, setDados] = useState(null);
    const [erro, setErro] = useState("");
    const idUsuario = 1; 

    useEffect(() => {
        async function fetchDados() {
            try {
                const res = await fetch(`http://localhost:8086/meusdados/${idUsuario}`);
                if (!res.ok) throw new Error("Erro ao carregar dados");
                const data = await res.json();
                setDados(data);
            } catch (err) {
                console.error("Erro:", err);
                setErro("Não foi possível carregar os dados do usuário.");
            }
        }

        fetchDados();
    }, []);

    if (erro) {
        return <div className="text-white text-center mt-10">{erro}</div>;
    }

    if (!dados) {
        return <div className="text-white text-center mt-10">Carregando dados...</div>;
    }

    const { pessoal, livrosEmprestados = [], historicoDevolucoes = [] } = dados;

    const temAtrasos = livrosEmprestados.some(livro =>
        new Date(livro.dataPrevistaDevolucao) < new Date()
    );

    const limite = pessoal.tipo === 'aluno' ? 3 : 5;
    const limiteAtingido = livrosEmprestados.length >= limite;

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-black px-4">
            <div className="absolute inset-0 bg-cover bg-center brightness-50 z-0" style={{ backgroundImage: "url('/fundo_meusdados.png')" }} />
            <div className="relative z-10 bg-white/10 backdrop-blur-md p-10 rounded-2xl border border-red-500/50 shadow-xl w-full max-w-4xl text-white">
                <h1 className="text-3xl font-bold text-center mb-6">👤 Meus Dados</h1>

                <div className="space-y-2 mb-6">
                    <div><strong>Nome:</strong> {pessoal.nome}</div>
                    <div><strong>Tipo:</strong> {pessoal.tipo}</div>
                    <div><strong>E-mail:</strong> {pessoal.email}</div>
                    <div><strong>Livros emprestados:</strong> {livrosEmprestados.length}</div>
                </div>

                {pessoal.multa > 0 && (
                    <div className="bg-red-700/40 p-3 rounded mb-3 border border-red-500">
                        ⚠ Você possui uma multa de R$ {pessoal.multa.toFixed(2)}.
                    </div>
                )}

                {temAtrasos && (
                    <div className="bg-yellow-600/40 p-3 rounded mb-3 border border-yellow-400">
                        ⚠ Há livros com atraso. Devolva-os antes de fazer novos empréstimos.
                    </div>
                )}

                {limiteAtingido && (
                    <div className="bg-orange-600/40 p-3 rounded mb-3 border border-orange-400">
                        ⚠ Você atingiu o limite de empréstimos ({limite}).
                    </div>
                )}

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">📖 Livros Emprestados</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-72 overflow-y-auto">
                        {livrosEmprestados.map((livro, index) => (
                            <div key={index} className="bg-white/20 rounded-lg p-4 border border-red-500/30">
                                <h3 className="font-bold text-lg">{livro.titulo}</h3>
                                <p>Autor: {livro.autor}</p>
                                <p>Empréstimo: {new Date(livro.data_emprestimo).toLocaleDateString()}</p>
                                <p>Devolver até: {new Date(livro.dataPrevistaDevolucao).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-4">📚 Histórico de Devoluções</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {historicoDevolucoes.map((livro, index) => (
                            <div key={index} className="bg-white/20 rounded-lg p-4 border border-red-500/30">
                                <h3 className="font-bold text-lg">{livro.titulo}</h3>
                                <p>Autor: {livro.autor}</p>
                                <p>Devolvido em: {new Date(livro.data_devolucao).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
