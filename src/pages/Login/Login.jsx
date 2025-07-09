import { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const realizarLogin = async () => {
    try {
      const response = await fetch('http://localhost:8086/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: usuario, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login realizado com sucesso!');
        navigate('/catalogo');
      } else {
        alert(data.message || 'Usuário não encontrado. Faça o cadastro.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao conectar ao servidor.');
    }
  };

  return (
    <div
      className="flex h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/fundo_login.png")' }}
    >
      <div className="w-full flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-gradient-to-br from-red-600/20 via-pink-700/10 to-purple-800/20 backdrop-blur-md rounded-3xl p-10 w-full max-w-md text-white shadow-[0_0_25px_#f87171] border border-red-400 transition-all duration-500 hover:scale-105">
          <div className="text-center mb-8">
            <img
              src="/Fundo_livraria_login.png"
              alt="ImgLogo"
              className="w-20 h-20 rounded-full mx-auto drop-shadow-md mb-2"
            />
            <h1 className="text-3xl font-bold">Login Biblioteca</h1>
            <p className="text-sm mt-1">Bem-vindo ao sistema da biblioteca</p>
          </div>

          <div className="flex items-center bg-white bg-opacity-20 rounded px-3 mb-4 border border-white/30">
            <FaUser className="text-white text-xl mr-3" />
            <input
              type="text"
              placeholder="Locatário"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="bg-transparent w-full py-2 text-white placeholder-white outline-none"
            />
          </div>

          <div className="flex items-center bg-white bg-opacity-20 rounded px-3 mb-6 border border-white/30">
            <FaLock className="text-white text-xl mr-3" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="bg-transparent w-full py-2 text-white placeholder-white outline-none"
            />
            {showPassword ? (
              <HiOutlineEyeOff
                className="text-white text-xl cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <HiOutlineEye
                className="text-white text-xl cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          <button
            onClick={realizarLogin}
            className="w-full bg-black bg-opacity-80 hover:bg-opacity-100 transition duration-300 text-white py-2 rounded-lg font-semibold"
          >
            Entrar
          </button>

          <p
            onClick={() => navigate('/CadastroLocatario')}
            className="mt-4 text-center text-sm text-pink-400 cursor-pointer hover:underline"
          >
            Cadastre-se
          </p>
        </div>
      </div>
    </div>
  );
}
