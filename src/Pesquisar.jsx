import { useState } from "react";

export default function Pesquisar(){
    const[usuario,setUsuario] = useState('Aluno');
    const [busca,setBusca] = useState("");

    const handleSearch =() =>{
        console.log(`Pesquisando por:${busca}, como: ${usuario}`);
    }

    return(
        <div className="min-h-screen bg-gray-200">
            <div className="bg-teal-400 p-6 text-center text-white text-xl font-bold">
                Pesquisar
            </div>

            <div className="flex flex-col items-center mt-6 space-y-4">
                <select 
                    className="px-4 py-2 rounded-md shadow-md"
                    value={usuario}
                    onChange={(e)=> setUsuario(e.target.value)}
                >
                    <option value="Aluno">Aluno</option>
                    <option value="Professor">Professor</option>
                    <option value="Bibliotecario">Bibliotecario</option>
                </select>

                    <div className="flex items-center space-x-2">
                        <input type="text" placeholder="Procure por ISBN,Título,autor ou editora..."
                        value={busca}
                        onChange={(e)=> setBusca(e.target.value)}
                        className="w-[500px] p-3 rounded-md shadow-md" />

                        <button onClick={handleSearch} className="bg-black text-white px-4 py-2 rounded-shadow">Pesquisar</button>
                    </div>

                    <div className="mt-2 flex justify-center items-center gap-6 text-white text-5xl">
                    📘 📗 🔍 📕 📙

                    </div>
                    

            </div>

        </div>
    )
}