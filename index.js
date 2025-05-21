const livros = [
  { id: 1, titulo: "1984 - George Orwell", preco: 39.90, imagem: "https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg", categoria: "Ficção" },
  { id: 2, titulo: "Dom Casmurro - Machado de Assis", preco: 29.90, imagem: "https://images-na.ssl-images-amazon.com/images/I/81dgJ9AKa8L.jpg", categoria: "Clássico" },
  { id: 3, titulo: "O Hobbit - J.R.R. Tolkien", preco: 49.90, imagem: "https://images-na.ssl-images-amazon.com/images/I/81t2CVWEsUL.jpg", categoria: "Fantasia" },
  { id: 4, titulo: "A Arte da Guerra - Sun Tzu", preco: 19.90, imagem: "https://images-na.ssl-images-amazon.com/images/I/71kpw1sYzjL.jpg", categoria: "Estratégia" },
  { id: 5, titulo: "O Pequeno Príncipe - Antoine de Saint-Exupéry", preco: 24.90, imagem: "https://images-na.ssl-images-amazon.com/images/I/81af+MCATTL.jpg", categoria: "Infantil" }
];

let carrinho = [];

auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById("bemvindo").innerText = `Bem-vindo, ${user.email}`;
    mostrarLivros(livros);
    mostrarCarrinho();
  } else {
    window.location.href = "login.html";
  }
});

function mostrarLivros(lista) {
  const listaLivros = document.getElementById("lista-livros");
  listaLivros.innerHTML = "";
  lista.forEach(livro => {
    const div = document.createElement("div");
    div.className = "livro";
    div.innerHTML = `
      <img src="${livro.imagem}" alt="${livro.titulo}" class="capa-livro" />
      <h3>${livro.titulo}</h3>
      <p>R$ ${livro.preco.toFixed(2)}</p>
      <button onclick="adicionarAoCarrinho(${livro.id})">Adicionar ao carrinho</button>
    `;
    listaLivros.appendChild(div);
  });
}

function adicionarAoCarrinho(id) {
  const livro = livros.find(l => l.id === id);
  if (!livro) return;

  const item = carrinho.find(i => i.id === id);
  if (item) {
    item.quantidade++;
  } else {
    carrinho.push({...livro, quantidade: 1 });
}
mostrarCarrinho();
}

function mostrarCarrinho() {
const carrinhoDiv = document.getElementById("carrinho");
carrinhoDiv.innerHTML = "";
if (carrinho.length === 0) {
carrinhoDiv.innerHTML = "<p>Carrinho vazio.</p>";
return;
}
carrinho.forEach(item => {
const div = document.createElement("div");
div.className = "item-carrinho";
div.innerHTML = `
  <p>${item.titulo} (x${item.quantidade}) - R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
  <button onclick="removerDoCarrinho(${item.id})">X</button>
`;

carrinhoDiv.appendChild(div);
});
}

function removerDoCarrinho(id) {
const index = carrinho.findIndex(i => i.id === id);
if (index !== -1) {
if (carrinho[index].quantidade > 1) {
carrinho[index].quantidade--;
} else {
carrinho.splice(index, 1);
}
}
mostrarCarrinho();
}

function finalizarCompra() {
if (carrinho.length === 0) {
alert("Seu carrinho está vazio.");
return;
}
const user = auth.currentUser;
if (!user) {
alert("Você precisa estar logado para finalizar a compra.");
return;
}

// Salvar pedido no Firestore
db.collection("pedidos").add({
usuario: user.email,
itens: carrinho,
data: new Date()
})
.then(() => {
alert("Compra finalizada com sucesso!");
carrinho = [];
mostrarCarrinho();
})
.catch(err => {
alert("Erro ao finalizar compra: " + err.message);
});
}

function logout() {
auth.signOut().then(() => {
window.location.href = "login.html";
});
}

function filtrarPorCategoria() {
const categoria = document.getElementById("filtro-categoria").value;
if (categoria === "todas") {
mostrarLivros(livros);
} else {
const filtrados = livros.filter(l => l.categoria === categoria);
mostrarLivros(filtrados);
}
}
