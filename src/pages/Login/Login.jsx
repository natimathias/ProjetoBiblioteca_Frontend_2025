import { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { HiOutlineEye } from 'react-icons/hi';

export function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-gray-400 flex items-center justify-center">
      <div className="flex items-center gap-4">
          <img
            src="/pagLogin.png"
            alt="Escola"
            className="w-20 mx-auto drop-shadow-md"
            />
          <a href="#" className="bg-black text-white font-bold px-4 py-2 mt-2 text-sm underline">
            Cadastro Alunos
          </a>
      </div>
    </div>

      <div className="w-2/3 bg-gray-800 flex items-center justify-center">
        <div className="bg-white rounded-2xl w-96 p-8 shadow-lg relative">
          <div className="bg-black text-white text-center py-2 rounded-t-md absolute -top-10 left-0 w-full">
            Login
          </div>
          <h2 className="text-xl font-semibold mb-6 mt-4">Código do Crachá</h2>

          <div className="flex items-center border border-gray-300 rounded mb-4 px-2">
            <FaUser className="text-black text-xl mr-2" />
            <input
              type="text"
              placeholder="Usuário"
              className="w-full py-2 outline-none"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded px-2">
            <FaLock className="text-black text-xl mr-2" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              className="w-full py-2 outline-none"
            />
            <HiOutlineEye
              className="text-black text-xl cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
