# 📚 Projeto Biblioteca UTFPR - Frontend
Este repositório contém a interface **frontend** do sistema de gerenciamento da Biblioteca UTFPR. A aplicação foi desenvolvida em ReactJSX e tem como objetivo permitir o gerenciamento completo de obras, autores, locatários, editoras, categorias, subcategorias e empréstimos de livros.

## 🧱 Estrutura do Projeto
A seguir, está descrita a estrutura das principais pastas e arquivos organizados em `src/pages/`, responsáveis por diferentes funcionalidades da aplicação:

### 📂 Acesso_Bibliotecario
 *Acesso_Bibliotecario.jsx* 
Página de login específica para bibliotecários com autenticação.

### 📂 Cadastro
Contém os formulários para *cadastrar novos dados* no sistema:

- CadastroAutor.jsx
- CadastroCategoria.jsx
- CadastroCursos.jsx
- CadastroEditora.jsx
- CadastroLivro.jsx
- CadastroLocatario.jsx
- CadastroSubCategoria.jsx

### 📂 Catalogo
 *Catalogo.jsx*  
Exibe a listagem geral de livros disponíveis no acervo.

### 📂 Editar
Páginas de *edição* dos registros previamente cadastrados:

- editarAutor.jsx
- editarCursos.jsx
- editarEditora.jsx
- editarLivro.jsx
- editarLocatario.jsx

### 📂 Emprestimo
 *Emprestimo.jsx*  
Interface responsável pela *gestão de empréstimos* de livros pelos locatários.

### 📂 Listagem
Contém todas as páginas que exibem *listas de dados cadastrados*, com opções de edição ou exclusão:

- listagemAutores.jsx
- listagemCategoria.jsx
- listagemCursos.jsx
- listagemEditoras.jsx
- listagemLivros.jsx
- listagemLocatarios.jsx
- listagemSubCategoria.jsx

### 📂 Login
 *Login.jsx*  
Página de *login principal* do sistema para autenticação de usuários.

### 📂 Menu
 *Menu.jsx*  
Página inicial após o login com *navegação para as demais rotas*.

### 📂 MeusDados
 *MeusDados.jsx*  
Página de perfil do usuário, com exibição de dados pessoais e opções de alteração.

### 📂 Pesquisar
 *Pesquisar.jsx*  
Página dedicada à *pesquisa de livros, autores ou outros registros* no sistema, com campos de filtro e exibição dos resultados.

## 📄 Outros Arquivos Importantes
- *index.css*: Estilos globais da aplicação.
- *main.jsx*: Ponto de entrada da aplicação React.
- *Rotas.jsx*: Definição das rotas e navegação entre as páginas.

## 🚀 Funcionalidades
- Cadastro e edição de autores, livros, editoras, cursos, categorias, subcategorias e locatários;
- Login de bibliotecário e usuários;
- Página de catálogo com visualização dos livros;
- Controle de empréstimos e devoluções;
- Listagens completas e atualizáveis com ações CRUD;
- Visualização e edição de dados do perfil logado;
- Pesquisa dinâmica de registros.

## 🛠️ Tecnologias Utilizadas
- React.js
- React Router DOM
- JavaScript (ES6+)
- Tailwind CSS (ou outro framework CSS, dependendo da aplicação)
- Ícones: Lucide React

## 📦 Instalação e Execução
```bash
# Clone o repositório
git clone https://github.com/natimathias/ProjetoBiblioteca_Frontend_2025

# Acesse a pasta
cd PROJETOBIBLIOTECA_FRONTEND_2025

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev