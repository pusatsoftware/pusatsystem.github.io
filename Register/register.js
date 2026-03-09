const form = document.getElementById('registerForm');
const message = document.getElementById('message');

form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
        // Kullanıcı verisini Firestore'a kaydet
        return db.collection("users").doc(userCredential.user.uid).set({
            name: name,
            email: email,
            createdAt: new Date().toLocaleString('tr-TR') // Daha okunabilir tarih
        });
    })
    .then(() => {
        message.textContent = "Kayıt Başarılı! Giriş sayfasına gidiliyor...";
        message.style.color = "green";
        message.classList.add("show");

        setTimeout(() => {
            window.location.href = "../Login/login.html";
        }, 2000);
    })
    .catch(err => {
        message.textContent = "Hata: " + err.message;
        message.style.color = "red";
        message.classList.add("show");
    });
});
