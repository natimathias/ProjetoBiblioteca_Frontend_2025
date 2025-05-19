import { useState } from "react";

export function MeusDados() {
    const usuario = {
        nome: "Maria da Silva",
        matricula: "2023123456",
        email: "maria.silva@email.com",
        curso: "Engenharia de Software",
        livrosEmprestados: [
            { titulo: "1984", autor: "George Orwell", dataEmprestimo: "10/05/2025" },
            { titulo: "Capitães da Areia", autor: "Jorge Amado", dataEmprestimo: "15/05/2025" },
        ],
        historicoDevolucoes: [
            { titulo: "O Cortiço", autor: "Aluísio Azevedo", dataDevolucao: "02/05/2025" },
            { titulo: "Vidas Secas", autor: "Graciliano Ramos", dataDevolucao: "28/04/2025" },
        ],
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-black px-4">
            <div
                className="absolute inset-0 bg-cover bg-center brightness-50 z-0"
                style={{ backgroundImage: "url('/fundo_meusdados.png')" }}
            />

            <div
                className="relative z-10 bg-white/10 backdrop-blur-md p-10 rounded-2xl border border-red-500/50 shadow-xl w-full max-w-4xl text-white"
                style={{
                    boxShadow: '0 0 25px rgba(255, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 0, 0, 0.4)',
                }}
            >
                <h1 className="text-3xl font-bold text-center mb-6">👤 Meus Dados</h1>

                <div className="space-y-2 mb-8">
                    <div><span className="font-semibold">Nome:</span> {usuario.nome}</div>
                    <div><span className="font-semibold">Matrícula:</span> {usuario.matricula}</div>
                    <div><span className="font-semibold">E-mail:</span> {usuario.email}</div>
                    <div><span className="font-semibold">Curso:</span> {usuario.curso}</div>
                    <div><span className="font-semibold">Livros emprestados:</span> {usuario.livrosEmprestados.length}</div>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">📖 Livros Emprestados</h2>
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto"
                        style={{ maxHeight: '300px' }}
                    >
                        {usuario.livrosEmprestados.map((livro, index) => (
                            <div
                                key={index}
                                className="bg-white/20 rounded-lg p-4 border border-red-500/30 backdrop-blur-sm shadow"
                            >
                                <h3 className="font-bold text-lg">{livro.titulo}</h3>
                                <p>Autor: {livro.autor}</p>
                                <p>Data do Empréstimo: {livro.dataEmprestimo}</p>
                            </div>
                        ))}
                        {usuario.livrosEmprestados.length === 0 && (
                            <p className="text-red-100">Nenhum livro emprestado no momento.</p>
                        )}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-4">📚 Histórico de Devoluções</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {usuario.historicoDevolucoes.map((livro, index) => (
                            <div
                                key={index}
                                className="bg-white/20 rounded-lg p-4 border border-red-500/30 backdrop-blur-sm shadow"
                            >
                                <h3 className="font-bold text-lg">{livro.titulo}</h3>
                                <p>Autor: {livro.autor}</p>
                                <p>Data de Devolução: {livro.dataDevolucao}</p>
                            </div>
                        ))}
                        {usuario.historicoDevolucoes.length === 0 && (
                            <p className="text-red-100">Nenhuma devolução registrada.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
