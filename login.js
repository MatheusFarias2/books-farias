<<<<<<< HEAD
document.getElementById("formLogin").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const senha = document.getElementById("loginSenha").value;

  auth.signInWithEmailAndPassword(email, senha)
    .then(() => {
      alert("Login realizado com sucesso!");
      window.location.href = "index.html";
    })
    .catch(error => {
      alert("Erro no login: " + error.message);
    });
});

document.getElementById("formCadastro").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("cadastro-email").value;
  const senha = document.getElementById("cadastro-senha").value;
});
=======
document.getElementById("formLogin").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const senha = document.getElementById("loginSenha").value;

  auth.signInWithEmailAndPassword(email, senha)
    .then(() => {
      alert("Login realizado com sucesso!");
      window.location.href = "index.html";
    })
    .catch(error => {
      alert("Erro no login: " + error.message);
    });
});

document.getElementById("formCadastro").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("cadastro-email").value;
  const senha = document.getElementById("cadastro-senha").value;
});
>>>>>>> 4acbf6c18f38670d9e33cca48b31a797f2730640
