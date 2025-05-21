
const firebaseConfig = {
  apiKey: "AIzaSyAgU7RF6kqolGN7ms7srBYRxmQgc6yjKbY",
  authDomain: "lojalivros-da8e5.firebaseapp.com",
  projectId: "lojalivros-da8e5",
  storageBucket: "lojalivros-da8e5.firebasestorage.app",
  messagingSenderId: "78922820578",
  appId: "1:78922820578:web:555a98691e224b077be7bb",
  measurementId: "G-QDBLRF2GZQ"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore()