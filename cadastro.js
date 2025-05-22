document.getElementById("formCadastro").addEventListener("submit", function (e) {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("cadastroEmail").value.trim();
  const senha = document.getElementById("cadastroSenha").value;

  auth.createUserWithEmailAndPassword(email, senha)
    .then(userCredential => {
      const user = userCredential.user;

      // Atualiza o nome no perfil
      return user.updateProfile({
        displayName: nome
      }).then(() => {
        // Salva no Firestore
        return db.collection("users").doc(user.uid).set({
          nome: nome,
          email: user.email,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }).then(() => {
        // Envia e-mail de verificação
        return user.sendEmailVerification();
      }).then(() => {
        alert("Cadastro realizado! Verifique seu e-mail antes de fazer login.");
        auth.signOut(); // Faz logout forçado até o usuário confirmar
        window.location.href = "login.html";
      });
    })
    .catch(error => {
      console.error("Erro no cadastro:", error);
      alert("Erro ao cadastrar: " + error.message);
    });
});
