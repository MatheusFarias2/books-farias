document.getElementById("formCadastro").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("cadastroEmail").value.trim();
  const senha = document.getElementById("cadastroSenha").value;

  auth.createUserWithEmailAndPassword(email, senha)
    .then(userCredential => {
      const user = userCredential.user;

      // Salva no Firestore
      return db.collection("users").doc(user.uid).set({
        email: user.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    })
    .then(() => {
      alert("Cadastro realizado com sucesso!");
      window.location.href = "login.html";
    })
    .catch(error => {
      console.error("Erro no cadastro:", error);
      alert("Erro ao cadastrar: " + error.message);
    });
});
