import { useState } from "react";

export function Pesquisar() {
    const [usuario, setUsuario] = useState('Aluno');
    const [busca, setBusca] = useState("");

    const handleSearch = () => {
        console.log(`Pesquisando por: ${busca}, como: ${usuario}`);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-black">
            <div
                className="absolute inset-0 bg-center bg-cover brightness-50"
                style={{ backgroundImage: "url('/fundo_pesquisar.png')" }}
            />
            <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-10 shadow-xl w-full max-w-3xl text-white border border-red-500/50"
                style={{
                    boxShadow: '0 0 25px rgba(255, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 0, 0, 0.4)',
                }}
            >
                <h1 className="text-3xl font-bold text-center mb-6">Pesquisar</h1>

                <select
                    className="w-full px-4 py-3 rounded-md text-black shadow-md mb-4"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                >
                    <option value="Aluno">Aluno</option>
                    <option value="Professor">Professor</option>
                    <option value="Bibliotecario">Bibliotecário</option>
                </select>

                <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Procure por ISBN, Título, autor ou editora..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        className="flex-1 p-3 rounded-md text-black shadow-md w-full"
                    />

                    <button
                        onClick={handleSearch}
                        className="bg-black text-white px-6 py-3 rounded-md shadow-md hover:bg-gray-800 transition"
                    >
                        Pesquisar
                    </button>
                </div>
            </div>
        </div>
    );
}
