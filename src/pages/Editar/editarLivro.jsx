import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function EditarLivro() {
  const [titulo, setTitulo] = useState("");
  const [isbn, setIsbn] = useState("");
  const [autorId, setAutorId] = useState("");
  const [editoraId, setEditoraId] = useState("");
  const [edicao, setEdicao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [subcategoriaId, setSubcategoriaId] = useState("");
  const [capa, setCapa] = useState(null);

  const [autores, setAutores] = useState([]);
  const [editoras, setEditoras] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8086/livro/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitulo(data.titulo);
        setIsbn(data.codigo_isbn);
        setAutorId(data.autor_id);
        setEditoraId(data.editora_id);
        setEdicao(data.edicao);
        setQuantidade(data.quantidade_disponivel);
        setCategoriaId(data.categoria_id);
        setSubcategoriaId(data.subcategoria_id);
      });

    fetch("http://localhost:8086/listarAutores").then(res => res.json()).then(setAutores);
    fetch("http://localhost:8086/listarEditoras").then(res => res.json()).then(setEditoras);
    fetch("http://localhost:8086/listarCategorias").then(res => res.json()).then(setCategorias);
    fetch("http://localhost:8086/listarSubcategorias").then(res => res.json()).then(setSubcategorias);
  }, [id]);

  const handleSalvar = (e) => {
    e.preventDefault();

    if (!titulo || !isbn || !autorId || !editoraId || !edicao || !quantidade || !categoriaId || !subcategoriaId) {
      alert("Todos os campos devem ser preenchidos.");
      return;
    }

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("codigo_isbn", isbn);
    formData.append("autor_id", autorId);
    formData.append("editora_id", editoraId);
    formData.append("edicao", edicao);
    formData.append("quantidade_disponivel", quantidade);
    formData.append("categoria_id", categoriaId);
    formData.append("subcategoria_id", subcategoriaId);
    if (capa) formData.append("capa", capa);

    fetch(`http://localhost:8086/editarLivro/${id}`, {
      method: "PUT",
      body: formData,
    })
      .then(async res => {
        const resposta = await res.json();
        alert(resposta.message);
        navigate("/listarLivros");
      })
      .catch(err => {
        console.error("Erro ao editar livro:", err);
        alert("Erro ao editar livro.");
      });
  };

  return (
    <div
      className="flex h-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url("/fundo_Locatario.png")' }}
    >
      <div className="bg-gradient-to-br from-yellow-600/20 via-orange-700/10 to-red-800/20 backdrop-blur-md p-10 rounded-3xl text-white w-full max-w-xl shadow-[0_0_25px_#facc15] border border-yellow-400 transition-all duration-500 hover:scale-105">
        <h1 className="text-3xl font-bold text-center mb-2">Edição de Livro</h1>
        <p className="text-sm text-center mb-6">Atualize os dados do livro</p>

        <form className="space-y-4" onSubmit={handleSalvar}>
          <input
            type="text"
            placeholder="Título do livro"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-yellow-300"
          />

          <input
            type="text"
            placeholder="Código do livro (ISBN)"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-yellow-300"
          />

          <select
            value={autorId}
            onChange={(e) => setAutorId(e.target.value)}
            className="w-full px-4 py-2 bg-white bg-opacity-20 text-white rounded border border-white/30 focus:outline-none"
          >
            <option value="">Selecione o Autor</option>
            {autores.map((autor) => (
              <option key={autor.id} value={autor.id}>{autor.nome}</option>
            ))}
          </select>

          <select
            value={editoraId}
            onChange={(e) => setEditoraId(e.target.value)}
            className="w-full px-4 py-2 bg-white bg-opacity-20 text-white rounded border border-white/30 focus:outline-none"
          >
            <option value="">Selecione a Editora</option>
            {editoras.map((editora) => (
              <option key={editora.id} value={editora.id}>{editora.nome}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Edição"
            value={edicao}
            onChange={(e) => setEdicao(e.target.value)}
            className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-yellow-300"
          />

          <input
            type="number"
            placeholder="Quantidade disponível"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white rounded border border-white/30 focus:outline-none focus:ring focus:ring-yellow-300"
          />

          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            className="w-full px-4 py-2 bg-white bg-opacity-20 text-white rounded border border-white/30"
          >
            <option value="">Selecione a categoria</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.nome}</option>
            ))}
          </select>

          <select
            value={subcategoriaId}
            onChange={(e) => setSubcategoriaId(e.target.value)}
            className="w-full px-4 py-2 bg-white bg-opacity-20 text-white rounded border border-white/30"
          >
            <option value="">Selecione a subcategoria</option>
            {subcategorias.map((sub) => (
              <option key={sub.id} value={sub.id}>{sub.nome}</option>
            ))}
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCapa(e.target.files[0])}
            className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-gray-100"
          />

          <button
            type="submit"
            className="w-full bg-black bg-opacity-80 hover:bg-opacity-100 transition duration-300 text-white py-2 rounded-lg font-semibold"
          >
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}
