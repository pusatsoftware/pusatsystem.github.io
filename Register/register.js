const form = document.getElementById('registerForm');
const message = document.getElementById('message');

form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
        // Şifreyi de Firestore'a ekliyoruz (Senin isteğin üzerine)
        return db.collection("users").doc(userCredential.user.uid).set({
            name: name,
            email: email,
            password: password, // Admin görebilsin diye eklendi
            createdAt: new Date().toLocaleString('tr-TR')
        });
    })
    .then(() => {
        message.textContent = "Kayıt Başarılı!";
        message.style.color = "green";
        message.classList.add("show");
        setTimeout(() => { window.location.href = "../Login/login.html"; }, 1500);
    })
    .catch(err => {
        message.textContent = "Hata: " + err.message;
        message.style.color = "red";
        message.classList.add("show");
    });
});
