import { Link } from 'react-router-dom';
import { FaBook, FaUserPlus, FaClipboardList } from 'react-icons/fa';

export function AcessoBibliotecario() {
  return (
    <div
      className="flex h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url(\"/fundo_menu.jpg\")' }}
    >
      <div className="w-full flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="bg-gradient-to-br from-red-600/20 via-pink-700/10 to-purple-800/20 shadow-[0_0_25px_#f87171] border border-red-400 rounded-3xl p-10 max-w-3xl w-full text-white text-center space-y-6">
          <h1 className="text-3xl font-bold mb-6">Painel do Bibliotecário</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <Link to="/cadastroLocatario" className="flex items-center gap-4 bg-black/40 border border-white/20 rounded-xl p-4 hover:bg-black/60 transition cursor-pointer shadow-lg">
              <FaUserPlus className="text-3xl" />
              <span className="text-lg font-medium">Cadastrar Locatário</span>
            </Link>

            <Link to="/cadastroLivro" className="flex items-center gap-4 bg-black/40 border border-white/20 rounded-xl p-4 hover:bg-black/60 transition cursor-pointer shadow-lg">
              <FaBook className="text-3xl" />
              <span className="text-lg font-medium">Cadastrar Livro</span>
            </Link>

            <Link to="/emprestimo" className="flex items-center gap-4 bg-black/40 border border-white/20 rounded-xl p-4 hover:bg-black/60 transition cursor-pointer shadow-lg">
              <FaClipboardList className="text-3xl" />
              <span className="text-lg font-medium">Gerenciar Empréstimos</span>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
