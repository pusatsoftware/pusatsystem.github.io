const loginForm = document.getElementById('loginForm');
const message = document.getElementById('message');

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
        message.textContent = "Giriş Başarılı! Yönlendiriliyorsunuz...";
        message.style.color = "green";
        message.classList.add("show");
        setTimeout(() => {
            window.location.href = "../admin/admin.html";
        }, 1500);
    })
    .catch(err => {
        message.textContent = err.message;
        message.style.color = "red";
        message.classList.add("show");
    });
});