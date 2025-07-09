import { useEffect, useState } from "react";

export function MeusDados() {
    const [dados, setDados] = useState(null);
    const idUsuario = 1; // Pegue dinamicamente do login se possível

    useEffect(() => {
        async function fetchDados() {
            const res = await fetch(`http://localhost:8086/meusdados/${idUsuario}`);
            const data = await res.json();
            setDados(data);
        }
        fetchDados();
    }, []);

    if (!dados) return <div className="text-white text-center mt-10">Carregando dados...</div>;

    const { pessoal, livrosEmprestados, historicoDevolucoes } = dados;

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-black px-4">
            <div className="absolute inset-0 bg-cover bg-center brightness-50 z-0" style={{ backgroundImage: "url('/fundo_meusdados.png')" }} />
            <div className="relative z-10 bg-white/10 backdrop-blur-md p-10 rounded-2xl border border-red-500/50 shadow-xl w-full max-w-4xl text-white">
                <h1 className="text-3xl font-bold text-center mb-6">👤 Meus Dados</h1>

                <div className="space-y-2 mb-8">
                    <div><span className="font-semibold">Nome:</span> {pessoal.nome}</div>
                    <div><span className="font-semibold">Tipo:</span> {pessoal.tipo}</div>
                    <div><span className="font-semibold">E-mail:</span> {pessoal.email}</div>
                    <div><span className="font-semibold">Livros emprestados:</span> {livrosEmprestados.length}</div>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">📖 Livros Emprestados</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto" style={{ maxHeight: '300px' }}>
                        {livrosEmprestados.map((livro, index) => (
                            <div key={index} className="bg-white/20 rounded-lg p-4 border border-red-500/30 backdrop-blur-sm shadow">
                                <h3 className="font-bold text-lg">{livro.titulo}</h3>
                                <p>Autor: {livro.autor}</p>
                                <p>Data do Empréstimo: {new Date(livro.data_emprestimo).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-4">📚 Histórico de Devoluções</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {historicoDevolucoes.map((livro, index) => (
                            <div key={index} className="bg-white/20 rounded-lg p-4 border border-red-500/30 backdrop-blur-sm shadow">
                                <h3 className="font-bold text-lg">{livro.titulo}</h3>
                                <p>Autor: {livro.autor}</p>
                                <p>Data de Devolução: {new Date(livro.data_devolucao).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
