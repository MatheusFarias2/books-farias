// Redireciona para login se não estiver logado
const user = localStorage.getItem('livrariaUsuario');
if (!user) {
  window.location.href = 'login.html';
}

// Elementos principais
const welcomeMsg = document.getElementById('welcome-msg');
const logoutBtn = document.getElementById('logout-btn');
const listaLivros = document.getElementById('lista-livros');
const itensCarrinho = document.getElementById('itens-carrinho');
const totalDiv = document.getElementById('total');
const topoBtn = document.getElementById('topo-btn');

// Lista de livros de exemplo
const livros = [
  {
    id: 1,
    titulo: "1984 - George Orwell",
    preco: 39.90,
    imagem: "https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg",
    categoria: "Ficção"
  },
  {
    id: 2,
    titulo: "Dom Casmurro - Machado de Assis",
    preco: 29.90,
    imagem: "https://images-na.ssl-images-amazon.com/images/I/81dgJ9AKa8L.jpg",
    categoria: "Clássico"
  },
  {
    id: 3,
    titulo: "O Hobbit - J.R.R. Tolkien",
    preco: 49.90,
    imagem: "https://images-na.ssl-images-amazon.com/images/I/81t2CVWEsUL.jpg",
    categoria: "Fantasia"
  },
  {
    id: 4,
    titulo: "A Arte da Guerra - Sun Tzu",
    preco: 19.90,
    imagem: "https://images-na.ssl-images-amazon.com/images/I/71kpw1sYzjL.jpg",
    categoria: "Estratégia"
  },
  {
    id: 5,
    titulo: "O Pequeno Príncipe - Antoine de Saint-Exupéry",
    preco: 24.90,
    imagem: "https://images-na.ssl-images-amazon.com/images/I/81af+MCATTL.jpg",
    categoria: "Infantil"
  }
];


// Carrinho
let carrinho = JSON.parse(localStorage.getItem('carrinhoLivros')) || [];

// Mostrar usuário
if (welcomeMsg) {
  welcomeMsg.textContent = `Olá, ${user}!`;
}
function logout() {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  }).catch((error) => {
    alert("Erro ao sair: " + error.message);
  });
}

// Logout
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('livrariaUsuario');
  localStorage.removeItem('carrinhoLivros');
  window.location.href = 'login.html';
});


// Mostrar livros
function mostrarLivros() {
  listaLivros.innerHTML = "";
  livros.forEach(livro => {
    const div = document.createElement('div');
    div.className = 'livro';
    div.innerHTML = `
  <img src="${livro.imagem}" alt="${livro.titulo}" class="capa-livro" />
  <h3>${livro.titulo}</h3>
  <p>R$ ${livro.preco.toFixed(2)}</p>
  <button onclick="adicionarAoCarrinho(${livro.id})">Adicionar ao carrinho</button>
`;

    listaLivros.appendChild(div);
  });
}
function filtrarPorCategoria() {
  const categoriaSelecionada = document.getElementById("filtro-categoria").value;

  const livrosFiltrados = categoriaSelecionada === "todas"
    ? livros
    : livros.filter(livro => livro.categoria === categoriaSelecionada);

  mostrarLivrosFiltrados(livrosFiltrados);
}

function mostrarLivrosFiltrados(listaFiltrada) {
  const lista = document.getElementById("lista-livros");
  lista.innerHTML = "";

  listaFiltrada.forEach(livro => {
    const div = document.createElement("div");
    div.className = "livro";

    div.innerHTML = `
      <img src="${livro.imagem}" alt="${livro.titulo}" class="capa-livro" />
      <h3>${livro.titulo}</h3>
      <p>R$ ${livro.preco.toFixed(2)}</p>
      <button onclick="adicionarAoCarrinho(${livro.id})">Adicionar ao carrinho</button>
    `;

    lista.appendChild(div);
  });
}


// Adicionar ao carrinho
function adicionarAoCarrinho(id) {
  const livro = livros.find(l => l.id === id);
  carrinho.push(livro);
  salvarCarrinho();
  carregarCarrinho();
}
auth.onAuthStateChanged(user => {
  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) {
    btnLogout.style.display = user ? "inline-block" : "none";
  }
});


// Remover item do carrinho
function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  salvarCarrinho();
  carregarCarrinho();
}

// Mostrar carrinho
function carregarCarrinho() {
  itensCarrinho.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    total += item.preco;
    const div = document.createElement('div');
    div.className = 'item-carrinho';
    div.innerHTML = `
      <span>${item.titulo} - R$ ${item.preco.toFixed(2)}</span>
      <button onclick="removerDoCarrinho(${index})">Remover</button>
    `;
    itensCarrinho.appendChild(div);
  });

  totalDiv.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Salvar no localStorage
function salvarCarrinho() {
  localStorage.setItem('carrinhoLivros', JSON.stringify(carrinho));
}

// Enviar formulário de contato
document.getElementById('form-contato').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Mensagem enviada com sucesso!');
  this.reset();
});

// Botão "voltar ao topo"
window.addEventListener('scroll', () => {
  topoBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
});

topoBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Inicialização
mostrarLivros();
carregarCarrinho();
