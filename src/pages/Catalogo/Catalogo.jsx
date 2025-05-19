export function Catalogo() {
    const livros = [
        { titulo: "Dom Casmurro", autor: "Machado de Assis" },
        { titulo: "A Hora da Estrela", autor: "Clarice Lispector" },
        { titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry" },
    ];

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-black">
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: "url('/fundo_catalogo.png')" }}
            />
            <div className="absolute inset-0 bg-black opacity-50 z-10" />
            <div
                className="relative z-20 bg-white/10 p-10 rounded-2xl border border-red-500/50 shadow-xl w-full max-w-4xl text-white"
                style={{
                    boxShadow: '0 0 25px rgba(255, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 0, 0, 0.4)',
                }}
            >
                <h1 className="text-3xl font-bold text-center mb-6">📚 Catálogo da Biblioteca</h1>

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6 overflow-y-auto"
                    style={{ maxHeight: '400px' }}
                >
                    {livros.map((livro, index) => (
                        <div
                            key={index}
                            className="bg-white/20 rounded-xl p-4 shadow-md backdrop-blur-sm border border-red-500/30"
                        >
                            <h2 className="text-xl font-semibold">{livro.titulo}</h2>
                            <p className="text-sm text-pink-100">Autor: {livro.autor}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
