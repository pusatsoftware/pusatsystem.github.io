const form = document.getElementById('registerForm');
const message = document.getElementById('message');

form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
        db.collection("users").doc(userCredential.user.uid).set({
            name: name,
            email: email,
            createdAt: new Date().toISOString()
        });

        message.textContent = "Kayıt Başarılı! Yönlendiriliyorsunuz...";
        message.style.color = "green";
        message.classList.add("show");

        setTimeout(() => {
            window.location.href = "../login/login.html";
        }, 2000);
    })
    .catch(err => {
        message.textContent = err.message;
        message.style.color = "red";
        message.classList.add("show");
    });
});
