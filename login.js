document.getElementById("formLogin").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const senha = document.getElementById("loginSenha").value;

  auth.signInWithEmailAndPassword(email, senha)
    .then(userCredential => {
      const user = userCredential.user;

      if (!user.emailVerified) {
        alert("Por favor, verifique seu e-mail antes de entrar.");
        auth.signOut();
        return;
      }

      // Se verificado, redireciona
      window.location.href = "index.html";
    })
    .catch(error => {
      console.error("Erro no login:", error);
      alert("Erro ao logar: " + error.message);
    });
});
