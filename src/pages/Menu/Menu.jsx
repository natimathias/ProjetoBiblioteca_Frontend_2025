import { FaHome, FaBook, FaSearch, FaArchive, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

export function Menu() {
  return (
    <div
      className="flex h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/fundo_menu.jpg")' }}
    >
      <aside className="w-64 h-full bg-black/60 backdrop-blur-md p-6 text-white flex flex-col justify-between shadow-[0_0_25px_#f87171] border-r border-white/10">
        <div>
          <div className="flex items-center justify-center mb-10">
            <img
              src="/Fundo_livraria_login.png"
              alt="Logo"
              className="w-16 h-16 rounded-full shadow-md"
            />
          </div>

          <nav className="space-y-4">
            <MenuItem icon={<FaHome />} label="Início" />
            <MenuItem icon={<FiLogIn />} label="Login" to="/login" />
            <MenuItem icon={<FaSearch />} label="Pesquisar" to='/pesquisar' />
            <MenuItem icon={<FaArchive />} label="Catálogo" />
            <MenuItem icon={<FaBook />} label="Empréstimos" />
            <MenuItem icon={<FaUser />} label="Meus Dados" />
          </nav>
        </div>

        <div className="pt-4 border-t border-white/20">
          <MenuItem icon={<FaSignOutAlt />} label="Sair" />
        </div>
      </aside>

      <main className="flex-1 flex items-center justify-center p-10">
        <div className="bg-gradient-to-br from-red-600/20 via-pink-700/10 to-purple-800/20 backdrop-blur-md rounded-3xl p-10 text-white shadow-[0_0_25px_#f87171] border border-red-400 w-full max-w-3xl text-center">
          <h1 className="text-4xl font-bold mb-4">Bem-vindo à Biblioteca</h1>
          <p className="text-lg">Escolha uma opção no menu ao lado para começar.</p>
        </div>
      </main>
    </div>
  );
}


function MenuItem({ icon, label, to }) {
  return (
    <NavLink
      to={to}
      className="flex items-center gap-3 p-3 w-full hover:bg-white/10 rounded-lg transition text-left text-base"
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}