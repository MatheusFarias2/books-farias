document.getElementById("formCadastro").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("cadastroEmail").value.trim();
  const senha = document.getElementById("cadastroSenha").value;

  auth.createUserWithEmailAndPassword(email, senha)
    .then(userCredential => {
      const user = userCredential.user;

      // Atualiza o displayName do usuário com o nome informado
      return user.updateProfile({
        displayName: nome
      }).then(() => {
        // Depois que o nome for salvo no perfil, grava no Firestore
        return db.collection("users").doc(user.uid).set({
          email: user.email,
          nome: nome, // também salva no Firestore, se quiser
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
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
